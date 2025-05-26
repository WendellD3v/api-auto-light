const connection = require('../utils/connection');

const getLogs = async () => {
    const [ result ] = await connection.query('SELECT * FROM logs');
    return result
}

const addLogs = async(id, tipo, descricao) => {
    const [ result ] = await connection.query('CALL add_log(?, ?, ?)',[
        id,
        descricao,
        tipo
    ])
    return result
}

module.exports = {
    getLogs,
    addLogs
}