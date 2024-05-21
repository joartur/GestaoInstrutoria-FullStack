const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class CoordenadorArea extends Model {}

CoordenadorArea.init({
    matricula: {
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
    area: {
        type: DataTypes.STRING(30),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CoordenadorArea',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = CoordenadorArea;