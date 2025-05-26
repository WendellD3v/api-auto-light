const logsModels = require('../models/logs');

const getLogs = async (req, res) => {
    const logs = await logsModels.getLogs()
    if (logs) {
        return res.status(200).json(logs)
    }

    return res.status(500).json({message: 'Problema de conexão interna'})
};

const addLogs = async (req, res) => {
    const newLog = await logsModels.addLogs(req.body.id || 0, req.body.tipo, req.body.descricao);
    if (newLog) {
        return res.status(200).json({message: 'Log Adicionado Com Sucesso'})
    }
    
    return res.status(500).json({message: 'Problema de conexão interna'})
}

module.exports = {
    getLogs,
    addLogs
}