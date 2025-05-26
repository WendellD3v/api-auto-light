const movementsModels = require('../models/movements');

const getMovements = async (req, res) => {
    const movements = await movementsModels.getMovements(req.userID)
    if (movements) {
        return res.status(200).json(movements)
    }

    return res.status(500).json({message: 'Problema de conexão interna'})
};

const addMovements = async (req, res) => {
    const newMovement = await movementsModels.addMovements(req.userID, req.body.tipo, req.body.descricao);
    if (newMovement) {
        return res.status(200).json({message: 'Registro Adicionado Com Sucesso'})
    }
    
    return res.status(500).json({message: 'Problema de conexão interna'})
};

module.exports = {
    getMovements,
    addMovements
}