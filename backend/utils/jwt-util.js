const { promisify } = require("util");
const jwt = require("jsonwebtoken");
const userKnex = require("../db/userKnex");
require("dotenv").config();
const secret = process.env.JWT_SECRET;

module.exports = {
    /**
     * Access Token : Refresh Token 이 유지되는 동안 계속 재발급 받을 수 있는 토큰
     * Refresh Token 이 만료 되거나 쿠키에서 사라지는 경우, 재발급 받을 수 없다
     * 너무 짧게 가져가면 서버 부하가 올 수 있으나, 보안성은 높아진다
     * */
    sign: (user) => {
        const payload = {
            id: user.id,
            name: user.name,
            email: user.email
        };

        return jwt.sign(payload, secret, {
            algorithm: "HS256",
            expiresIn: "10s",
        });
    },
    /**
     * token 만료 여부를 확인하고 디코딩
     * */
    verify: (token) => {
      let decoded = null;
      try {
          decoded = jwt.verify(token, secret);

          return {
              ok: true,
              id: decoded.id,
              name: decoded.name,
              email: decoded.email
          };
      } catch (err) {
          return {
              ok: false,
              message: err.message,
          };
      }
    },
    /**
     * Refresh Token 의 만료 기간을 expiresIn 으로 설정 (로그인 유지 기간과 같다)
     * */
    refresh: () => {
        return jwt.sign({}, secret, {
            algorithm: "HS256",
            expiresIn: "60m",
        });
    },
    /**
     * refresh Token 과 DB에 저장된 Token 비교
     * DB에 저장되어 있는 토큰을 꺼내 맞는지 확인 후, 토큰의 만료 여부를 검증한다
     * */
    refreshVerify: async (token, userId) => {

        try {
            const data = await userKnex('user')
                .select('refresh_token')
                .where('id', userId);

            if (token === data[0].refresh_token) {
                try {
                    jwt.verify(token, secret); //만료 여부 검증
                    return true;
                } catch (err) {
                    return false;
                }
            } else {
                return false;
            }
        } catch (err) {
            return false;
        }
    },
};