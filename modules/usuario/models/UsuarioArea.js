const { DataTypes, Model } = require('sequelize');
const Usuario = require('./Usuario');
const Area = require('./Area');
const sequelize = require('../../../config/connection');

class UsuarioArea extends Model {}

// Definindo o modelo de junção com campos adicionais
UsuarioArea.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    }
}, {
    sequelize,
    modelName: 'UsuarioArea',
    timestamps: false 
});

// definindo relacionamento
// UsuarioArea.belongsTo(Usuario, { as: 'usuario', foreignKey: 'usuarioMatricula' });
// UsuarioArea.belongsTo(Area, { as: 'area', foreignKey: 'areaId' });

module.exports = UsuarioArea;
