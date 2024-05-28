const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class Servico extends Model {}

Servico.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Servico',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = Servico;
