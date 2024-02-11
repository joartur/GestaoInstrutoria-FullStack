const { DataTypes } = require('sequelize');
const db = require("../database/Connection");

//construindo o model equivalente a tabela instrutores
const Instrutor = db.define("Instrutor", {
    matricula:{
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false //Não é permitido campo nulo
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    },
    unidade:{
        type: DataTypes.STRING,
        allowNull: false
    },
    area:{
        type: DataTypes.STRING,
        allowNull: false
    },
    horasMinimas:{
        type: DataTypes.TIME,
        allowNull: false
    },
    // pode ter campos sem dados, já que vai sendo alimentado posteriormente
    // por padrão possui 0 horas
    horasTrabalhadas:{
        type: DataTypes.TIME,
        defaultValue: '00:00'
    },
    bancoHoras:{
        type: DataTypes.TIME,
        defaultValue: '00:00'
    }, 
});


module.exports = Instrutor;