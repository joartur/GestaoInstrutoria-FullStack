const express = require('express');
const override = require('method-override');
const coordArea = require('../controllers/coordAreaController');
const router = express.Router();

router.use(override('_method'));

// seria melhor se tivesse a matricula do coordenador em todas as rotas

// rota GET de perfil do coordenador

// rota GET da home do coordenador, com as response sintetizada.

// Rota GET para saber a situação de um instrutor
router.get('/verificaSituacao/:matricula', (req, res) => {
    coordArea.verificaSituacao(req, res);
});

// Rota GET para listar os registros de um instrutor
router.get('/listarRegistros/:matricula', (req, res) => {
    coordArea.listarRegistros(req, res);
});

// Rota GET para listar os instrutores
// da pra fazer com a matricula do coordenador
router.get('/listarInstrutores/:area', (req, res) => {
    coordArea.listarInstrutores(req, res);
});

// Rota GET para contar os Instrutores com o saldo de horas zerado
router.get('/contarInstrutoresZerados/:area', (req, res) => {
    coordArea.contarInstrutoresComHorasZeradasPeriodo(req, res);
});

// Rota GET para contar os Instrutores com o saldo de horas Excedente
router.get('/contarInstrutoresExcedente/:area', (req, res) => {
    coordArea.contarInstrutoresComSaldoHoras(req, res);
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
router.post('/registro/:matriculaC/:matriculaI',(req, res) => {
    coordArea.cadastrarRegistro(req, res);
})

module.exports = router;