const express = require('express');
const router = express.Router();
const authMiddlewares = require('../middleware/auth');
const authControllers = require('../controllers/auth');

router.use('/login', authMiddlewares.login, authControllers.login);
router.use('/register', authMiddlewares.register, authControllers.register);

module.exports = router