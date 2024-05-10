const express = require('express');
const override = require('method-override');
const instrutorController = require('../controllers/instrutorController');
const router = express.Router();

router.use(override('_method'));

// rota get da page home do instrutor
router.get('/:matriculaI',(req, res) => {
    instrutorController.home(req, res);
})

// rota get da page home do instrutor
router.get('/perfil/:matriculaI',(req, res) => {
    instrutorController.perfil(req, res);
})

//rota para a lista de todos os registro do instrutor
router.get('/registros/:matriculaI',(req, res) => {
    instrutorController.listarRegistros(req, res);
})

//rota para a lista dos registros filtrados do instrutor
router.post('/registros/:matriculaI',(req, res) => {
    instrutorController.filtroRegistros(req, res);
})

//rota post para criar um novo registro do instrutor
router.post('/registro/:matriculaI',(req, res) => {
    instrutorController.cadastrarRegistro(req, res);
})

//rota para visualização de um registro
router.get('/registro/:matriculaI/:registroId',(req, res) => {
    instrutorController.visualizarRegistro(req, res);
})

//rota para ediçao de informações
router.put('/registro/:matriculaI/:registroId',(req, res)=>{
    instrutorController.editarRegistro(req, res);
})

//rota para exclusão de um registro
router.delete('/registro/:matriculaI/:registroId',(req, res)=>{
    instrutorController.excluirRegistro(req, res);
})

//rota para listar as atividade de serviço educacional
router.get('/servicos/:matriculaI',(req, res) => {
    instrutorController.listaAtvs(req, res);
})

module.exports = router;