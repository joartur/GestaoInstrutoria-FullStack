const { DataTypes, Model } = require('sequelize');
const moment = require('moment-timezone');
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente
const Usuario = require('../../usuario/model/Usuario');

class Instrutor extends Model {}

Instrutor.init({
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    horasMinimas: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00',
        validate: {
            is: {
                args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                msg: 'Forneça um tempo válido no formato HH:mm:ss'
            }
        }
    },
    horasTrabalhadasPeriodo: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00',
        validate: {
            is: {
                args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                msg: 'Forneça um tempo válido no formato HH:mm:ss'
            }
        }
    },
    saldoHoras: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00',
        validate: {
            is: {
                args: /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/,
                msg: 'Forneça um tempo válido no formato HH:mm:ss'
            }
        }
    },
    unidadeSenac: {
        type: DataTypes.STRING(30),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A unidade do Senac é obrigatória!'
            },
            len: {
                args: [3, 30],
                msg: 'A unidade do Senac deve ter entre 3 e 30 caracteres!'
            }
        }
    },
    FKinstrutor: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'matricula'
        },
        validate: {
            notNull: {
                msg: 'A matrícula do instrutor é obrigatória!'
            },
            len: {
                args: [4, 6],
                msg: 'A matrícula do instrutor deve ter entre 4 e 6 caracteres!'
            }
        }
    }
}, {
    sequelize,
    modelName: 'Instrutor',
    timestamps: true
});

Instrutor.belongsTo(Usuario, { foreignKey: 'FKinstrutor' });

module.exports = Instrutor;
