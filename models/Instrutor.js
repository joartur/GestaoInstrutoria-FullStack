// models/instrutor.js

const { DataTypes, Model } = require('sequelize');

class Instrutor extends Model {}

Instrutor.init({
    matricula: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    },
    unidade: {
        type: DataTypes.STRING,
        allowNull: false
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    },
    horasMinimas: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: false
    },
    horasTrabalhadas: {
        type: DataTypes.TIME,
        defaultValue: '00:00'
    },
    bancoHoras: {
        type: DataTypes.TIME,
        defaultValue: '00:00'
    }
}, {
    sequelize,
    modelName: 'Instrutor',
    timestamps: true
});

module.exports = Instrutor;
