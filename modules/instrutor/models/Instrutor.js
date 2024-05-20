const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class Instrutor extends Model {}

Instrutor.init({
    matricula:{        
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    senha: {       
        type: DataTypes.STRING(128),
        allowNull: false,
    },
    unidade: {
        type: DataTypes.STRING(50),
        allowNull: false
    },
    area: {
        type: DataTypes.STRING(30),
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
