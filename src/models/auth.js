const connection = require('../utils/connection');

const addUser = async (name, user, pass) => {
    const [result] = await connection.query('CALL create_user(?, ?, ?)', [name, user, pass]);
    return result[0][0]
};

const getUserAccount = async (accountID) => {
    const [result] = await connection.query('SELECT * FROM usuarios WHERE login = ?',[accountID]);
    return result[0];
}

module.exports = {
    addUser,
    getUserAccount
}