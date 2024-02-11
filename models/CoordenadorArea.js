const { DataTypes } = require('sequelize');
const db = require("../database/Connection");

const CoordenadorArea = db.define("CoordenadorArea", {
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
    },
    area:{
        type: DataTypes.STRING,
        allowNull: false
    }
});


module.exports = CoordenadorArea;