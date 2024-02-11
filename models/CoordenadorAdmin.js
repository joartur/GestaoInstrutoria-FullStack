const { DataTypes } = require('sequelize');
const db = require("../database/Connection");

const CoordenadorAdmin = db.define("CoordenadorAdmin", {
    matricula:{
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome:{
        type: DataTypes.STRING,
        allowNull: false
    },
    email:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = CoordenadorAdmin;