const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../database/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class Administrativo extends Model {}

Administrativo.init({
    matricula: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(80),
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    },
    senha: {       
        type: DataTypes.STRING(128),
        allowNull: false,
    }
}, {
    sequelize,
    modelName: 'Administrativo',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = Administrativo;
