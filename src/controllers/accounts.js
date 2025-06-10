const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
// const connection = require('../utils/connection');

const myKey = process.env.JWT_SECRET_KEY;

const accountsModels = require('../models/accounts');

const login = async (req, res) => {
    const userAccount = await accountsModels.getUserAccount(req.body.login)
    if (userAccount){
        let isPassword = await bcrypt.compare(req.body.password, userAccount.senha);
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
        const user = await accountsModels.addUser(req.body.name, req.body.email, req.body.login, hashPass)
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

const account = async (req, res) => {
    const user = await accountsModels.getUserByID(req.userID)

    if (user) {
        return res.status(200).json({
            "id": user.id,
            "nome": user.nome,
            "login": user.login
        })
    }
    return res.status(500).json({message:'Problema de conexão interna'})
}

const changeName = async (req, res) => {
    const newName = await accountsModels.changeName(req.userID, req.body.name);
    if (newName) {
        return res.status(200).json({message: 'Nome Alterado Com Sucesso'})
    }

    return res.status(500).json({message:'Problema de conexão interna'})
}

const changePass = async (req, res) => {

    const account = await accountsModels.getUserByID(req.userID);
    if (account) {
        try {
            const isPasswordValid = await bcrypt.compare(req.body.password, account.senha);
            if (isPasswordValid) {
                try {
                    const hashPass = await bcrypt.hash(req.body.newPassword, 8)
                    const passChanged = await accountsModels.changePass(req.userID, hashPass);

                    return res.status(200).json({message: 'Senha Alterada Com Sucesso'})
                } catch (error) {
                    console.log(error)
                    return res.status(500).json({message:'Problema de conexão interna'})
                }
            } else {
                return res.status(401).json({message: 'Senha Incorreta'});
            }
        } catch (error) {
            console.log(error)
            return res.status(500).json({message:'Problema de conexão interna'})

        }
    } else{
        return res.status(401).json({message: 'Usuário não encontrado'})
    }
}

const deleteUser = async (req, res) => {
    const registros = await accountsModels.deleteRegs(req.userID)
    if (registros) {
        const account = await accountsModels.deleteUser(req.userID)
        if (account) {
            return res.status(200).json({message: 'Conta e registros deletados com sucesso'})
        }
    }
    return res.status(500).json({message:'Problema de conexão interna 1'})
}

module.exports = {
    login,
    register,
    account,
    changeName,
    changePass,
    deleteUser
}