const express = require('express');
const router = express.Router();
const accountsMiddlewares = require('../middleware/accounts');
const accountsControllers = require('../controllers/accounts');

router.post('/login', accountsMiddlewares.login, accountsControllers.login);
router.post('/register', accountsMiddlewares.register, accountsControllers.register);
router.get('/me', accountsMiddlewares.account, accountsControllers.account)

router.put('/name', accountsMiddlewares.changeName, accountsControllers.changeName)
router.put('/password', accountsMiddlewares.changePass, accountsControllers.changePass)

router.delete('/user', accountsMiddlewares.deleteUser, accountsControllers.deleteUser)

module.exports = router