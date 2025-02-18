const express = require('express');
const { getHistory } = require('../controllers/historyController');

const router = express.Router();

router.get('/', getHistory); // GET /api/History

module.exports = router;