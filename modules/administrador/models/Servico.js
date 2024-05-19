const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection');

const Registro = require('../../usuario/models/Registro');

class Servico extends Model {}

Servico.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Servico',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

// Definindo a associação
// Servico.hasMany(Registro, { foreignKey: 'FKservico' });

module.exports = Servico;
