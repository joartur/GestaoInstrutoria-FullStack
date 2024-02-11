const { DataTypes } = require('sequelize');
const db = require("../database/Connection");
import Servico from './Servico';
import Instrutor from './Instrutor';

const Registro = db.define("Registro", {
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
    },
}, {
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

// Defina a associação com a tabela de Servico
Registro.belongsTo(Servico, {
    foreignKey: 'servicoId', // Nome do campo na tabela Registro que faz referência à chave primária de Servico
    allowNull: false // Certifique-se de que um registro sempre esteja associado a um serviço
});

// Defina a associação com a tabela de Instrutor
Registro.belongsTo(Instrutor, {
    foreignKey: 'instrutorId', // Nome do campo na tabela Registro que faz referência à chave primária de Instrutor
    allowNull: false // Certifique-se de que um registro sempre esteja associado a um instrutor
});

module.exports= Registro;