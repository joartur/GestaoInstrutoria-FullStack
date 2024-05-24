const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// rota GET da home do coordenador, com as response sintetizada.
router.get('/:matriculaCoordenador', (req, res) => {
    coordArea.home(req, res);
});

// rota GET de perfil do coordenador
router.get('/perfil/:matriculaCoordenador', (req, res) => {
    coordArea.perfilCorodenador(req, res);
});

// Rota GET para listar os registros de um instrutor
router.get('/listarRegistros/:matriculaInstrutor', (req, res) => {
    coordArea.listarRegistros(req, res);
});

//Rota PUT para validar completamente um resgistro
router.put('/validarRegistro/:matriculaCoordenador/:registroId', (req, res) =>{
    coordArea.validarRegistro(req, res);
})

//Rota PUT para validar completamente, parcialmente ou rejeitar o registro 
router.put('/validarParcialmenteRegistro/:matriculaCoordenador/:registroId', (req, res) =>{
    coordArea.validarParcialmenteRegistro(req, res);
})

//rota post para criar um novo registro do instrutor
router.post('/registro/:matriculaCoordenador/:matriculaInstrutor', (req, res) => {
    coordArea.cadastrarRegistro(req, res);
})

module.exports = router;