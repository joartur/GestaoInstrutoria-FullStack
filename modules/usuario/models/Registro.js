const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); 

const Servico = require("../../administrador/models/Servico");
const Usuario = require('./Usuario');

class Registro extends Model {}

Registro.init({
    id: {
        type: DataTypes.INTEGER,
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
        type: DataTypes.STRING(50),
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.ENUM('Em Análise', 'Validado', 'Recusado', 'Parcialmente Validado'),
        defaultValue: 'Em Análise',
        allowNull: false
    },
    justificativa: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    FKinstrutor: {
        type: DataTypes.STRING(15),
        allowNull: false,
        references: {
            model: Usuario,
            key: 'matricula'
        }
    },
    FKservico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: Servico,
            key: 'id'
        }
    },
    FKcoordenador: {
        type: DataTypes.STRING(15),
        allowNull: true,
        references: {
            model: Usuario,
            key: 'matricula'
        }
    }
}, {
    sequelize,
    modelName: 'Registro',
    timestamps: true
});

Registro.belongsTo(Servico, { foreignKey: 'FKservico' });

Registro.belongsTo(Usuario, { as: 'Instrutor', foreignKey: 'FKinstrutor' });

Registro.belongsTo(Usuario, { as: 'Coordenador', foreignKey: 'FKcoordenador' });

module.exports = Registro;
