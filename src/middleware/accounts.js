const jwt = require('jsonwebtoken');
const myKey = process.env.JWT_SECRET_KEY;

const register = async (req, res, next) => {
    if (req.body && req.body.name && req.body.email && req.body.login && req.body.password && req.body.name.length > 0 && req.body.login.length > 8 && req.body.password.length >= 8){
        return next()
    } else{
        return res.status(400).json({message: 'Bad Request'})
    }
}

const login = async (req, res, next) => {

    if (req.body && req.body.login && req.body.password){
        return next()
    } else{
        return res.status(400).json({message: 'Bad Request'})
    }
}

const account = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({message:'Bad Request'})
    }

    try {
        const decode = await jwt.verify(token.split(' ')[1], myKey);
        req.userID = decode.userID
        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid Token'})
    }
}

const changeName = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({message:'Bad Request'})
    }

    if (!req.body || !req.body.name){
        return res.status(400).json({message:'Bad Request Dada'})
    }

    try {
        const decode = await jwt.verify(token.split(' ')[1], myKey);
        req.userID = decode.userID

        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid Token'})
    }
}

const changePass = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({message:'Bad Request'})
    }

    if (!req.body || !req.body.password || !req.body.newPassword){
        return res.status(400).json({message:'Bad Request Dada'})
    }

    try {
        const decode = await jwt.verify(token.split(' ')[1], myKey);
        req.userID = decode.userID

        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid Token'})
    }
}

const deleteUser = async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
        return res.status(400).json({message:'Bad Request'})
    }

    try {
        const decode = await jwt.verify(token.split(' ')[1], myKey);
        req.userID = decode.userID

        next()
    } catch (error) {
        return res.status(401).json({message: 'Invalid Token'})
    }
}

module.exports = {
    register,
    login,
    account,
    changeName,
    changePass,
    deleteUser
}