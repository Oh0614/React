const express = require('express');
const { getDdlCalAuth } = require('../controllers/ddlCalAuthController');

const router = express.Router();

router.get('/', getDdlCalAuth);

module.exports = router;