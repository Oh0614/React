const userKnex = require('../db/userKnex');
const jwt = require('../utils/jwt-util');
const jsonwebtoken = require('jsonwebtoken')
/**
 * 1. id/pw로 로그인 요청
 * 2. 서버에서 Access Token + Refresh Token 발급
 * - 토큰 발급 알고리즘 추가 필요 ( Access Token : id, 권한 등, Refresh Token : uuid 등 난수 생성 )
 * 3. Access Token + Refresh Token : HTTP only Cookie 저장
 * 4. Refresh Token : db에 추가 저장 ( refresh_token 필드 추가 )
 */

exports.getUser = async (req, res) => {
    const { email, password } = req.query;

    if (!email || !password) {
        return res.status(400).json({ message: 'Email and password are required' });
    }

    try {

        const result = await userKnex('user')
            .select('id', 'email', 'name')
            .where('email', email)
            .andWhere('password', password)

        if (result.length > 0) {

            /**
             * 토큰 생성 및 저장 Access Token 으로 관리될 데이터
             * payload 에 user 데이터가 일부 들어감
             * 중요 정보는 절대 삽입 x
             * */
            const tokenData = {
                id: result[0].id,
                name: result[0].name,
                email: result[0].email,
            };

            const accessToken = jwt.sign(tokenData);
            const refreshToken = jwt.refresh();

            // console.log('access: ' + accessToken);
            // console.log('refresh: ' + refreshToken);

            const req = {
                id: tokenData.id,
                refresh_token : refreshToken,
            }
            await insertToken(req);     //db에 refresh token 저장
            /**
             * refresh Token 을 cookie 에 저장,
             * httpOnly 설정하는 이유:
             * javascript 에서 직접 접근할 수 없기 때문에 보안성이 높아짐
             * */
            res.cookie("refreshToken", refreshToken, {
                maxAge: 60 * 60 * 24 * 14,
                httpOnly: true,
                sameSite: "none",
                secure: true,
            });

            /**
             * access Token 은 반환하여 header 와 localstorage 에 저장
             * */
            res.status(200).send({
                exists: true,
                data: accessToken,
            });

        } else {
            res.status(401).send({ exists: false, message: 'User not found' });
        }
    } catch (err) {
        console.error(err);
        res.status(500).send({ message: 'Database query failed', details: err.message });
    }
};

/**
 * Refresh Token 이 생성된 후 DB에 저장하는 작업
 * */
const insertToken = async (req, res) => {
    try{
        await userKnex('user').update({'refresh_token': req.refresh_token}).where('id', req.id);

    } catch (e) {
        console.log(e);
        res.status(500).json({message: 'Create Token Error'});
    }
}

/**
 * access Token 의 재발급을 담당하는 api
 * 헤더와 쿠키에 담아둔 토큰들의 존재 여부를 확인한다 (쿠키 삭제나 등등의 이유로 삭제된 경우에는 로그인화면으로 돌아감)
 * access Token 의 검증 (만료 여부) 환인 한 후, 디코딩하여 사용자인지 (조작된 토큰이 아닌지 확인)
 * 재발급 여부를 확인한 후, 재발급 하여 재등록 (access Token 만)
 * refresh Token 은 만료나 사라지는 즉시 로그아웃한다
 **/
exports.postAccessToken = async (req, res) => {
    // console.log(req.headers.cookie);
    // console.log(req.headers.authorization);

    if (req.headers.authorization && req.headers.cookie) {
        const accessToken = req.headers.authorization.split("Bearer ")[1];
        const refreshToken = req.headers.cookie.split("=")[1];

        const authResult = jwt.verify(accessToken);
        const decoded = jsonwebtoken.decode(accessToken);

        if (decoded === null) {
            res.status(401).send({
                ok: false,
                message: "No authorized!",
            });
        }

        /**토큰 재발급 여부를 판단한다 + DB에 저장된 토큰 값과 쿠키에 저장된 토큰 값이 같은지 확인함*/
        const refreshResult = await jwt.refreshVerify(refreshToken, decoded.id);

        if (authResult.ok === false && authResult.message === "jwt expired") {
            if (refreshResult === false) {
                res.status(401).send({
                    ok: false,
                    message: "No authorized",
                });
            } else {
                const new_accessToken = jwt.sign({
                    id: decoded.id,
                    email: decoded.email,
                    name: decoded.name,
                });

                res.status(200).send({
                    ok: true,
                    data: {
                        accessToken: new_accessToken,
                        id: decoded.id,
                        email: decoded.email,
                        name: decoded.name,
                    },
                });
            }
        }
    } else {
        res.status(403).send({
            ok: false,
            message: "Login expired.",
        });
    }
};
