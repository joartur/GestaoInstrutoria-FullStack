const express = require('express');
const override = require('method-override');
const servicoController = require('../controllers/servicoController');
const router = express.Router();

router.use(override('_method'));

// Rota POST para adicionar um novo serviço
router.post('/adicionar', (req, res) => {
    servicoController.adicionar(req, res);
});

// Rota GET para listar serviços
router.get('/listar', (req, res) => {
    servicoController.listar(req, res);
});

// Rota GET para buscar um serviço
router.get('/buscar/:id', (req, res) => {
    servicoController.buscar(req, res);
});

// Rota DELETE para deletar serviços
router.delete('/deletar/:id', (req, res) => {
    servicoController.deletar(req, res);
});

module.exports = router;