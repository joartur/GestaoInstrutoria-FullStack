// models/registro.js

const { DataTypes, Model } = require('sequelize');
const Servico = require('./Servico'); // Importando o modelo de Serviço
const Instrutor = require('./Instrutor'); // Importando o modelo de Instrutor

class Registro extends Model {}

Registro.init({
    id: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    dataServico: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    horaInicio: {
        type: DataTypes.TIME,
        allowNull: false
    },
    horaFinal: {
        type: DataTypes.TIME,
        allowNull: false
    },
    total: {
        type: DataTypes.TIME,
        allowNull: false
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    situacao: {
        type: DataTypes.ENUM('Em análise', 'Validado', 'Rejeitado', 'Parcialmente Validado'),
        defaultValue: 'Em análise',
        allowNull: false
    },
    justificativa: {
        type: DataTypes.TEXT,
        allowNull: true // Pode ser nulo, dependendo da situação
    }
}, {
    sequelize: db,
    modelName: 'Registro',
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

// Definindo as associações com os modelos de Serviço e Instrutor
Registro.belongsTo(Servico, {
    foreignKey: 'servicoId',
    allowNull: false
});

Registro.belongsTo(Instrutor, {
    foreignKey: 'instrutorId',
    allowNull: false
});

Registro.belongsTo(CoordenadorArea, {
    foreignKey: 'coordenadorId',
    allowNull: false
});

module.exports = Registro;
