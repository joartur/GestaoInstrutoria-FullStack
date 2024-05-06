const Servico = require("../models/Servico.js");

const servicoController = {
    adicionar: async (req, res) => {
        try {
            const novoServico = await Servico.create({
                nome: req.body.nome,
            });
            res.status(201).json(novoServico); // Retorna o novo serviço criado
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    listar: async (req, res) => {
        try {
            const servicos = await Servico.findAll();
            res.json(servicos);
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    buscar: async (req, res) => {
        try {
            const servico = await Servico.findOne({ where: { id: req.params.id } });
            if (servico) {
                res.json(servico)
            } else {
                res.status(404).json({ error: 'Serviço não encontrado' });
            }
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    },
    deletar: async (req, res) => {
        try {
            await Servico.destroy({ where: { id: req.params.id } });
        } catch (error) {
            res.status(500).json({ error: error.message });
        }
    }
}

module.exports = servicoController;