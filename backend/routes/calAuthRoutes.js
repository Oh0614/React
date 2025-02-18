const express = require('express');
const { getCalAuth, getCalAuthDemo, insertCalAuth, updateCalAuth, deleteCalAuth} = require('../controllers/calAuthController');
const authJWT = require("./middlewares/authJWT");

const router = express.Router();

router.get('/', getCalAuth);
router.get('/demo', getCalAuthDemo);                        //테스트용 demo 테이블
router.post('/demo/create', authJWT, insertCalAuth);
router.post('/demo/update', authJWT, updateCalAuth);
router.post('/demo/delete', authJWT, deleteCalAuth);

module.exports = router;