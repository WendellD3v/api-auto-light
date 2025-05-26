const express = require('express');
const app = express();
const cors = require('cors');

// dotenv
require('dotenv').config()

// Cors
app.use(cors())

// Uso do body parse
app.use(express.json())

// rotas
const accounts = require('./src/routes/accounts')
app.use('/account', accounts)

const logs = require('./src/routes/logs')
app.use('/logs', logs)

const movements = require('./src/routes/movements');
app.use('/movements', movements)

// Banco De Dados
require('./src/utils/connection')

const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`Servidor Ativo Em http://localhost:${port}`)
})