const mysql2 = require('mysql2/promise');

const connection = mysql2.createPool({
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASS,
    database: process.env.MYSQL_DATABASE,
});

(async () => {
    try {
        await connection.getConnection();
        console.log('[DB] Banco De Dados Conectado Com Sucesso')
    } catch (error) {
        console.log('[DB] Problemas Ao Conectar Ao Banco De Dados')
    }
})();

module.exports = connection