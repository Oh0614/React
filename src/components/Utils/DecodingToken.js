export default function DecodingToken (token) {

    /**
     * base-64: 8비트, 한글: 16비트
     * 한글이 깨지는걸 방지하기 위해 atob를 사용
     * */

    let payload = token.substring(token.indexOf('.') + 1, token.lastIndexOf('.'));
    let decodingInfo = decodeURIComponent(escape(window.atob(payload)));

    return JSON.parse(decodingInfo);
};