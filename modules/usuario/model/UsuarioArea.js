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
    usuarioMatricula: {
      type: DataTypes.STRING(15),
      allowNull: false,
      references: {
        model: 'Usuario', // Nome da tabela de usuarios
        key: 'matricula'
      }
    },
    AreaId: {
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

module.exports = UsuarioArea;