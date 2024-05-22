const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// rota get da page home do coordenador
router.get('/:area',(req, res) => {
    coordArea.home(req, res);
})

// Rota GET para listar os registros de um determinado instrutor
router.get('/listarRegistros/:matricula', (req, res) => {
    coordArea.listarRegistros(req, res);
});

// Rota GET para saber a situação de determinado instrutor
router.get('/verificaSituacao/:matricula', (req, res) => {
    coordArea.verificaSituacao(req, res);
});

// Rota GET para listar os Instrutores
router.get('/listarInstrutores/:area', (req, res) => {
    coordArea.listarInstrutores(req, res);
});

// Rota GET para contar os Instrutores com o saldo de horas zerado
router.get('/contarInstrutoresZerados/:area', (req, res) => {
    coordArea.contarInstrutoresComSaldoZero(req, res);
});

// Rota GET para contar os Instrutores com o saldo de horas Excedente
router.get('/contarInstrutoresExcedente/:area', (req, res) => {
    coordArea.contarInstrutoresComSaldoExcedente(req, res);
});

//Rota PUT para validar o resgistro
router.put('/validarRegistro/:id/:FKcoordenador', (req, res) =>{
    coordArea.validarRegistro(req, res);
})

//Rota PUT para validar parcialmente o resgistro
router.put('/validarParcialmenteRegistro/:id/:FKcoordenador', (req, res) =>{
    coordArea.validarParcialmenteRegistro(req, res);
})

//rota post para criar um novo registro do instrutor
router.post('/registro/:matriculaC/:matriculaI',(req, res) => {
    coordArea.cadastrarRegistro(req, res);
})

module.exports = router;