const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection');
const UsuarioArea = require('./UsuarioArea');
const Usuario = require('./Usuario');

class Area extends Model {}

Area.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Area',
    timestamps: false 
});

module.exports = Area;
