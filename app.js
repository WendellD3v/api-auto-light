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
const auth = require('./src/routes/auth')
app.use('/auth', auth)

// Banco De Dados
require('./src/utils/connection')

const port = process.env.SERVER_PORT
app.listen(port, () => {
    console.log(`Servidor Ativo Em http://localhost:${port}`)
})
