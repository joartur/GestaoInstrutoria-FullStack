// models/coordenadorAdmin.js

const { DataTypes, Model } = require('sequelize');

class Administrativo extends Model {}

Administrativo.init({
    matricula: {
        type: DataTypes.STRING,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true 
    }
}, {
    sequelize: db,
    modelName: 'Administrativo',
    timestamps: true // Timestamps ativados
});

module.exports = Administrativo;
