const express = require('express');
const { getMenuList } = require('../controllers/menuController');

const router = express.Router();

router.get('/', getMenuList);

module.exports = router;