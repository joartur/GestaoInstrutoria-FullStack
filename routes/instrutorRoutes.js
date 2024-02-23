const express = require('express');
const override = require('method-override');
const instrutorController = require('../controllers/instrutorController');
const router = express.Router();

router.use(override('_method'));

// rota get da page home do instrutor
router.get('/:matricula')

//rota post para criar um novo registro do instrutor
router.post('/adicionarRegistro/:matricula',(req, res) => {
    instrutorController.cadRegistro(req, res);
})

module.exports = router;