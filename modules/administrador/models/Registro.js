const { DataTypes, Model } = require('sequelize');
const Servico = require("./Servico");
const Usuario = require('../../usuario/model/Usuario')
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente

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
        allowNull: true // Pode ser nulo, dependendo da situação
    },
    FKinstrutor: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'matricula'
        }
    },
    FKservico: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'Servico',
            key: 'id'
        }
    },
    FKcoordenador: {
        type: DataTypes.STRING,
        allowNull: true,
        references: {
            model: 'Usuario',
            key: 'matricula'
        }
    }
}, {
    sequelize,
    modelName: 'Registro',
    timestamps: true // Adiciona automaticamente createdAt e updatedAt
});

Registro.belongsTo(Servico, { foreignKey: 'FKservico' });

Registro.belongsTo(Usuario, { as: 'instrutor', foreignKey: 'FKinstrutor' });

Registro.belongsTo(Usuario, { as: 'coordenadador', foreignKey: 'FKcoordenador' });

module.exports = Registro;
