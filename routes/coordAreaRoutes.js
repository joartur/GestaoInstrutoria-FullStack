const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// Rota GET para buscar um serviço
router.get('/listarRegistros/:matricula', (req, res) => {
    coordArea.listarRegistros(req, res);
});

router.get('/listarInstrutores', (req, res) => {
    coordArea.listarInstrutores(req, res);
});

module.exports = router;