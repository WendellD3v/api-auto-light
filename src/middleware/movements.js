const jwt = require('jsonwebtoken');
const myKey = process.env.JWT_SECRET_KEY;

const getMovements = async (req, res, next) => {
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
};

const addMovements = async (req, res, next) => {
    const token = req.headers.authorization;
    
    if (!token) {
        return res.status(400).json({message:'Bad Request'})
    }

    if (!req.body || !req.body.tipo || !req.body.descricao) {
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
    getMovements,
    addMovements
}