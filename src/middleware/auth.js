const jwt = require('jsonwebtoken');
const myKey = process.env.JWT_SECRET_KEY;

const register = async (req, res, next) => {
    if (req.body && req.body.name && req.body.login && req.body.password && req.body.name.length > 0 && req.body.login.length > 8 && req.body.password.length >= 8){
        return next()
    } else{
        return res.status(400).json({message: 'Bad request'})
    }
}

const login = async (req, res, next) => {

    if (req.body && req.body.login && req.body.password){
        return next()
    } else{
        return res.status(400).json({message: 'Bad Request'})
    }
}

module.exports = {
    register,
    login
}