const { account } = require('../middleware/accounts');
const connection = require('../utils/connection');

const addUser = async (name, email, user, pass) => {
    const [result] = await connection.query('CALL create_user(?, ?, ?, ?)', [name, email, user, pass]);
    return result[0][0]
};

const getUserAccount = async (accountLogin) => {
    const [result] = await connection.query('SELECT * FROM usuarios WHERE login = ?',[accountLogin]);
    return result[0];
};

const getUserByID = async (accountID) => {
    const [ result ] = await connection.query('SELECT * FROM usuarios WHERE id = ?', [accountID])
    return result[0]
};

const changeName = async(id, nome) => {
    const [ result ] = await connection.query('CALL changeName(?, ?)',[
        id,
        nome
    ])
    return result[0][0]
}

const changePass = async(id, newPass) => {
    const [ result ] = await connection.query('CALL changePass(?, ?)',[
        id,
        newPass
    ])
    return result[0][0]
};

const deleteRegs = async(id) => {
    const [ result ] = await connection.query('CALL del_userReg(?)', [id])
    return result[0][0]
}

const deleteUser = async(id) => {
    const [ result ] = await connection.query('CALL del_user(?)', [id])
    console.log(result)
    return result[0][0]
}

module.exports = {
    addUser,
    getUserAccount,
    getUserByID,
    changeName,
    changePass,
    deleteRegs,
    deleteUser
}