const connection = require('../utils/connection');

const getMovements = async (userID) => {
    const [ result ] = await connection.query('SELECT * FROM registros WHERE id_usuario = ?', [userID]);
    return result
}

const addMovements = async(id, tipo, descricao) => {
    const [ result ] = await connection.query('CALL add_reg(?, ?, ?)',[
        id,
        descricao,
        tipo
    ])
    return result
}

module.exports = {
    getMovements,
    addMovements
}