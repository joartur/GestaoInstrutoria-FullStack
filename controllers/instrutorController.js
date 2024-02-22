const Registro = require("../models/Registro");

const instrutorController = {
    cadRegistro: async (req, res) => {
        const { dataServico, horaInicio, horaFinal, total, titulo, descricao, dataCriacao, FKservico} = req.body
        const FKinstrutor = req.params
    }
}

module.exports= instrutorController;