const { DataTypes, Model } = require('sequelize');
const moment = require('moment-timezone');
const sequelize = require('../../../config/connection'); 
const UsuarioArea = require('./UsuarioArea');
const Area = require('./Area');

class Usuario extends Model {}

Usuario.init({
    matricula: {
        type: DataTypes.STRING(6),
        primaryKey: true,
        validate:{
            len: {
                args: [4, 6],
                msg: 'A matricula deve ter no mínimo 4 caracteres e no máximo 6'
            }
        }
    },
    nome: {
        type: DataTypes.STRING(80),
        allowNull: false,
        validate: {
            notNull: {
                msg: 'O nome é obrigatório!'
            },
            len: {
                args: [3, 80],
                msg: 'O nome deve ter no mínimo 3 caracteres e no máximo 80'
            }
        }
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: {
            msg: 'O e-mail já existe!'
        },
        validate: {
            isEmail:{
                msg: 'Forneça um e-mail válido!'
            }
        }
    },
    senha: {       
        type: DataTypes.STRING,
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM('coordenador', 'instrutor', 'administrador', 'superUser'),
        allowNull: false,
        validate:{
            isIn:{
                args:[['coordenador', 'instrutor', 'administrador', 'superUser']],
                msg: "Valor invalido!"
            }
        }
    },
    data_cadastro: {
        type: DataTypes.NOW,
        allowNull: false,
        defaultValue: () => moment().tz('America/Recife').format('DD-MM-YYYY HH:mm:ss')
    }
}, {
    sequelize,
    modelName: 'Usuario',
    timestamps: false
});

// // Definindo as associações
Usuario.belongsToMany(Area, { through: UsuarioArea, foreignKey: 'usuarioMatricula' });

module.exports = Usuario;