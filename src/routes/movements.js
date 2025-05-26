const express = require('express');
const router = express.Router();
const movementsMiddleware = require('../middleware/movements');
const movementsControllers = require('../controllers/movements');

router.get('/get', movementsMiddleware.getMovements, movementsControllers.getMovements);
router.post('/new', movementsMiddleware.addMovements, movementsControllers.addMovements);

module.exports = router