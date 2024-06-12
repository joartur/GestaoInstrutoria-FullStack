const { DataTypes, Model } = require('sequelize');
const moment = require('moment-timezone');
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
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome do serviço é obrigatório!'
            },
            len: {
                args: [3, 60],
                msg: 'O nome do serviço deve ter entre 3 e 60 caracteres!'
            }
        }
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false,
        validate: {
            notNull: {
                msg: 'A descrição do serviço é obrigatória!'
            },
            len: {
                args: [5, 500],
                msg: 'A descrição do serviço deve ter entre 5 e 500 caracteres!'
            }
        }
    }
}, {
    sequelize,
    modelName: 'Servico',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = Servico;
