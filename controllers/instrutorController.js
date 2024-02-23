const Registro = require("../models/Registro");

const instrutorController = {
    cadRegistro: async (req, res) => {
        const { dataServico, horaInicio, horaFinal, titulo, descricao, FKservico} = req.body
        const FKinstrutor = req.params.matricula
        const total = horaFinal-horaInicio

        Registro.create({dataServico,
            horaInicio,
            horaFinal,
            total,
            titulo,
            descricao,
            FKservico,
            FKinstrutor
        }).then((data) =>{
            res.status(201).json({msg:"Registro cadastrado", data})
        }).catch((error) => {
            res.status(500).json({ error: error.message });
        });
    }
}

module.exports= instrutorController;