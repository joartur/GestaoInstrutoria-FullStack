const express = require('express');
const router = express.Router();
const loginController = require('../controllers/loginController')

//rota quebra galho de login
router.post('/login', (req, res) => {
    loginController.login(req, res);
});

module.exports = router;