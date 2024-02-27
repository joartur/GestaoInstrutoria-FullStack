const Instrutor = require("../models/Instrutor.js")
const Registro = require("../models/Registro.js")

const coordAreaController = {
    listarInstrutores: async (req, res) => {
        try {
            const instrutores = await Instrutor.findAll();
            res.json(instrutores);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    listarRegistros: async (req, res) => {
        try {
            const Registros = await Registro.findAll({ where: { FKinstrutor: req.params.matricula } });
            res.json(Registros)
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = coordAreaController;