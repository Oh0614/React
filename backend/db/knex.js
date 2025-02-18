
// PostgreSQL 연결 설정
const knex = require('knex')({
    client: 'pg',
    connection: {
        user: 'postgres', // PostgreSQL 사용자
        host: '192.168.0.204', // 호스트
        database: 'clims', // 데이터베이스 이름
        password: 'postgres', // PostgreSQL 비밀번호
        port: 5433, // 기본 포트
    }
});

module.exports = knex;