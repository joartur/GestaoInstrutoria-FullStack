const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class Instrutor extends Model {}

Instrutor.init({
    matricula:{        
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
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
        type: DataTypes.TIME,
        allowNull: false
    },
    horasTrabalhadas: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00'
    },
    saldoHoras: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00'
    }
}, {
    sequelize,
    modelName: 'Instrutor',
    timestamps: true
});

module.exports = Instrutor;
