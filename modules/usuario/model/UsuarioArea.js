const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection');
const Usuario = require('./Usuario');
const Area = require('./Area');

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
    },
    usuarioMatricula: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: 'Usuario', // Nome da tabela de usuarios
        key: 'matricula'
      }
    },
    areaId: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'Area', // Nome da tabela de areas
        key: 'id'
      }
    }
}, {
    sequelize,
    modelName: 'UsuarioArea',
    timestamps: false 
});

// definindo relações
UsuarioArea.belongsTo(Usuario, {foreignKey: 'usuarioMatricula'})

UsuarioArea.belongsTo(Area, {foreignKey: 'areaId'})

module.exports = UsuarioArea;