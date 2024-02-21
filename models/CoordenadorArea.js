const { DataTypes, Model } = require('sequelize');
const sequelize = require('./index'); // Certifique-se de importar sua instância do sequelize corretamente

class CoordenadorArea extends Model {}

CoordenadorArea.init({
    matricula: {
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
        unique: true 
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'CoordenadorArea',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = CoordenadorArea;
