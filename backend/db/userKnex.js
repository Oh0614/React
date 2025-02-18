
// PostgreSQL 연결 설정
const userKnex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres', // PostgreSQL 사용자
        host: 'localhost', // 호스트
        database: 'postgres', // 데이터베이스 이름
        password: 'pgadmin', // PostgreSQL 비밀번호
        port: 5432, // 기본 포트
    }
});

module.exports = userKnex;