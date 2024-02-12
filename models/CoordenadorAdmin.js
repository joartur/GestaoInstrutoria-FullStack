// models/coordenadorAdmin.js

const { DataTypes, Model } = require('sequelize');

class CoordenadorAdmin extends Model {}

CoordenadorAdmin.init({
    matricula: {
        type: DataTypes.BIGINT.UNSIGNED,
        primaryKey: true,
        autoIncrement: true
    },
    nome: {
        type: DataTypes.STRING,
        allowNull: false
    },
    email: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'CoordenadorAdmin',
    timestamps: true // Timestamps ativados
});

module.exports = CoordenadorAdmin;
