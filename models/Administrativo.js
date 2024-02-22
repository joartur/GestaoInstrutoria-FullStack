const { DataTypes, Model } = require('sequelize');
const sequelize = require('../database/connection'); // Certifique-se de importar sua instância do sequelize corretamente

class Administrativo extends Model {}

Administrativo.init({
    matricula: {
        type: DataTypes.STRING,
        primaryKey: true,
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true,
        validate:{
            isEmail: true,
        }
    }
}, {
    sequelize,
    modelName: 'Administrativo',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = Administrativo;
