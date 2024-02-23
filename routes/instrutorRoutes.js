const express = require('express');
const override = require('method-override');
const instrutorController = require('../controllers/instrutorController');
const router = express.Router();

router.use(override('_method'));

// rota get da page home do instrutor
router.get('/:matricula')

//rota post para criar um novo registro do instrutor
router.post('/adicionarRegistro/:matriculaI',(req, res) => {
    instrutorController.cadastrarRegistro(req, res);
})

//rota para a lista de todos os registro
router.get('/listarRegistros/:matriculaI',(req, res) => {
    instrutorController.listarRegistros(req, res);
})

//rota para visualização de um registro
router.get('/visualizarRegistro/:matriculaI/:registroId',(req, res) => {
    instrutorController.visualizarRegistro(req, res);
})

//rota para ediçao de informações
router.put('/editarRegistro/:matriculaI/:registroId',(req, res)=>{
    instrutorController.editarRegistro(req, res);
})

//rota para exclusão de um registr
router.delete('/excluirRegistro/:matriculaI/:registroId',(req, res)=>{
    instrutorController.excluirRegistro(req, res);
})


module.exports = router;