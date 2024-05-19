const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); 

const Usuario = require('../../usuario/models/Usuario');

class Instrutor extends Model {}

Instrutor.init({
    id:{        
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        allowNull: false
    },
    horasMinimas: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00'
    },
    horasTrabalhadasPeriodo: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00'
    },
    saldoHoras: {
        type: DataTypes.TIME,
        defaultValue: '00:00:00'
    },
    FKinstrutor: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: Usuario,
            key: 'matricula'
        }
    }
}, {
    sequelize,
    modelName: 'Instrutor',
    timestamps: true
});

// 1 p/ 1
Instrutor.belongsTo(Usuario, { foreignKey: 'FKinstrutor' });

module.exports = Instrutor;