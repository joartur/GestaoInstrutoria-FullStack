// models/coordenadorArea.js

const { DataTypes, Model } = require('sequelize');

class CoordenadorArea extends Model {}

CoordenadorArea.init({
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
    },
    area: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    sequelize: db,
    modelName: 'CoordenadorArea',
    timestamps: true // Se não precisar de timestamps, pode desativá-los aqui
});

module.exports = CoordenadorArea;
