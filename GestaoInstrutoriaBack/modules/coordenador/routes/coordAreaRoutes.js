const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// seria melhor se tivesse a matricula do coordenador em todas as rotas

// rota GET de perfil do coordenador
router.get('/perfil/:matriculaCoordenador', (req, res) => {
    coordArea.perfilCorodenador(req, res);
});

// rota GET da home do coordenador, com as response sintetizada.
router.get('/:matriculaCoordenador', (req, res) => {
    coordArea.home(req, res);
});

// Rota GET para listar os registros de um instrutor
router.get('/listarRegistros/:matricula', (req, res) => {
    coordArea.listarRegistros(req, res);
});

//Rota PUT para validar completamente um resgistro
router.put('/validarRegistro/:id/:FKcoordenador', (req, res) =>{
    coordArea.validarRegistro(req, res);
})

//Rota PUT para validar completamente, parcialmente ou rejeitar o registro 
router.put('/validarParcialmenteRegistro/:id/:FKcoordenador', (req, res) =>{
    coordArea.validarParcialmenteRegistro(req, res);
})

//rota post para criar um novo registro do instrutor
router.post('/registro/:matriculaC/:matriculaI', (req, res) => {
    coordArea.cadastrarRegistro(req, res);
})

module.exports = router;