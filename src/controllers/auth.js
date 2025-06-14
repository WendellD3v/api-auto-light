const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const connection = require('../utils/connection');

const myKey = process.env.JWT_SECRET_KEY;

const authModels = require('../models/auth');

const login = async (req, res) => {
    const userAccount = await authModels.getUserAccount(req.body.login)
    if (userAccount){
        let isPassword = await bcrypt.compare(req.body.password, userAccount.senha);
        console.log(isPassword)
        if (isPassword){
            const token = jwt.sign({userID: userAccount.id}, myKey, {
                "expiresIn": "1h"
            })

            return res.status(200).json({message: 'Login realizado com sucesso', token: token}) 
        } else{
            return res.status(401).json({message: 'Senha Incorreta'})
        }
    } else{
        return res.status(401).json({message: 'Usuário não encontrado'})
    }
};

const register = async (req, res) => {
    
    try {
        const hashPass = await bcrypt.hash(req.body.password, 8)
        const user = await authModels.addUser(req.body.name, req.body.login, hashPass)
        if (user.status == 'SUCCESS') {

            const token = jwt.sign({userID: user.insertID}, myKey, {
                "expiresIn": "1h"
            })
            return res.status(201).json({message: 'Usuário Adicionado Com Sucesso Ao Banco De Dados', token: token}) 

        } else if(user.status == 'ERROR'){
            return res.status(401).json({message: user.message})
        }

        return res.status(500).json({message: 'Problema de conexão interna'})

    } catch (error) {
        console.log('Problemas ao adicionar usuário:', error)
        return res.status(500).json({message: 'Problema de conexão interna'})
    }
};

module.exports = {
    login,
    register
}