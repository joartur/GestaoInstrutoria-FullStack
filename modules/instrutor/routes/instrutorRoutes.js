const express = require('express');
const override = require('method-override');
const { InstrutorController } = require('../controllers/instrutorController');
const router = express.Router();

router.use(override('_method'));

// rota get da page home do instrutor
router.get('/:matriculaInstrutor',(req, res) => {
    InstrutorController.home(req, res);
})

// rota get do perfil do instrutor
router.get('/perfil/:matriculaInstrutor',(req, res) => {
    InstrutorController.perfil(req, res);
})

//rota para a lista de todos os registro do instrutor
router.get('/registros/:matriculaInstrutor',(req, res) => {
    InstrutorController.listarRegistros(req, res);
})

//rota para a lista dos registros filtrados do instrutor
router.post('/registros/:matriculaInstrutor',(req, res) => {
    InstrutorController.filtroRegistros(req, res);
})

//rota post para criar um novo registro do instrutor
router.post('/registro/:matriculaInstrutor',(req, res) => {
    InstrutorController.cadastrarRegistro(req, res);
})

//rota para visualização de um registro
router.get('/registro/:matriculaInstrutor/:registroId',(req, res) => {
    InstrutorController.visualizarRegistro(req, res);
})

//rota para ediçao de informações
router.put('/registro/:matriculaInstrutor/:registroId',(req, res)=>{
    InstrutorController.editarRegistro(req, res);
})

//rota para exclusão de um registro
router.delete('/registro/:matriculaInstrutor/:registroId',(req, res)=>{
    InstrutorController.excluirRegistro(req, res);
})

//rota para listar as atividade de serviço educacional
router.get('/servicos/:matriculaInstrutor',(req, res) => {
    InstrutorController.listaAtvs(req, res);
})

module.exports = router;