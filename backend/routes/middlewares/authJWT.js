const { verify } = require("../../utils/jwt-util");

/**권한 처리 할 경우 사용할 middleware
 * user  정보를 가져와야할 때 사용한다 (토큰을 복호화 하여 사용한다)
 * 이 때 토큰이 만료되었다면, 재로그인 화면으로 넘어가도록 할 수 있음 (401)
 *
 * 권한이 필요한 작업을 수행할 때 미들웨어로 사용한다
 *
 * 권한에 따라 다른 미들웨어를 생성하여, 권한처리를 해도 된다
 * */
const authJWT = (req, res, next) => {
    try {

        if (req.headers.authorization) {
            const token = req.headers.authorization.split("Bearer ")[1];

            const result = verify(token);

            if (result.ok) {
                req.id = result.id;
                req.email = result.email;
                req.name = result.name;
                next();
            } else {
                /**
                 * access 토큰 재발급 가능 여부 확인하러
                 * */
                res.status(401).send({
                    ok: false,
                    message: result.message,
                });
            }
        } else {
            res.status(401).send({
                ok: false,
                message: "Not Logged In",
            });
        }
    } catch (error) {
        res.status(403).send({
            ok: false,
            message: "Not Logged In",
        })
        console.error(error);
    }
};

module.exports = authJWT;