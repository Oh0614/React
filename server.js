

const express = require('express');
const cors = require('cors');
// 라우터 파일 가져오기
const calAuthRoutes = require('./backend/routes/calAuthRoutes');
const historyRoutes = require('./backend/routes/historyRoutes');
const userRoutes = require('./backend/routes/userRoutes');
const ddlCalAuthRoutes = require('./backend/routes/ddlCalAuthRoutes');
const menuRoutes = require('./backend/routes/menuRoutes');
const authJWT = require("./backend/routes/middlewares/authJWT");


const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true,
}));

app.use(express.json());

// data grid 관련 라우터 연결
app.use('/api/CalAuth', calAuthRoutes);
app.use('/api/History', historyRoutes);

//user 계정 정보 라우터 연결
app.use('/api/user', userRoutes);

//menu 관련 라우터 연결
app.use('/api/menu', menuRoutes);

//ddl관련 라우터 연결
app.use('/api/ddlCalAuth', ddlCalAuthRoutes);

// 서버 시작
const PORT = 5001;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});