// models/servico.js

const { DataTypes, Model } = require('sequelize');

class Servico extends Model {}

Servico.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'Servico',
    timestamps: true 
});

module.exports = Servico;
