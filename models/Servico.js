const { DataTypes } = require('sequelize');
const db = require("../database/Connection");

const Servico = db.define("Servico", {
    id:{
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = Servico;