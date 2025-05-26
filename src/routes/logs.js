const express = require('express');
const router = express.Router();
const logsMiddleware = require('../middleware/logs');;
const logsControllers = require('../controllers/logs');

router.get('/get', logsMiddleware.getLogs, logsControllers.getLogs)
router.post('/new', logsMiddleware.addLogs, logsControllers.addLogs)

module.exports = router