const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); 
const UsuarioArea = require('./UsuarioArea');
const Area = require('./Area');

class Usuario extends Model {}

Usuario.init({
    matricula: {
        type: DataTypes.STRING(15),
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(80),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate: {
            isEmail: true,
        }
    },
    senha: {       
        type: DataTypes.STRING(20),
        allowNull: false,
    },
    tipoUsuario: {
        type: DataTypes.ENUM('coordenador', 'instrutor', 'administrador', 'superUser'),
        allowNull: false
    }
}, {
    sequelize,
    modelName: 'Usuario',
    timestamps: true
});

// // Definindo as associações
Usuario.belongsToMany(Area, { through: UsuarioArea, foreignKey: 'usuarioMatricula' });

module.exports = Usuario;