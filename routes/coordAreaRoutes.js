const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// Rota GET para buscar um serviço
router.get('/listarServicos/:matricula', (req, res) => {
    coordArea.listarServicos(req, res);
});

router.get('/listarInstrutores', (req, res) => {
    coordArea.listarInstrutores(req, res);
});

module.exports = router;