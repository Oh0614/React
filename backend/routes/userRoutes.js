const express = require('express');
const { getUser, postAccessToken } = require('../controllers/userController');

const router = express.Router();

router.get('/', getUser);
router.post('/reissuance', postAccessToken)

module.exports = router;