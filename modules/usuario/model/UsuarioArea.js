const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection');

class UsuarioArea extends Model {}

// Definindo o modelo de junção com campos adicionais
UsuarioArea.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    // Exemplos de campos adicionais
    dataAssociacao: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW
    }
}, {
    sequelize,
    modelName: 'UsuarioArea',
    timestamps: false 
});

module.exports = UsuarioArea;
