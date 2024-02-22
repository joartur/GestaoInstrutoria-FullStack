const express = require('express');
const override = require('method-override');
const instrutorController = require('../controllers/instrutorController');
const router = express.Router();

router.use(override('_method'));


module.exports = router;