const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection'); // Certifique-se de importar sua instância do sequelize corretamente
const Usuario = require('../../usuario/model/Usuario');

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
    unidadeSenac:{
        type: DataTypes.STRING(30),
        allowNull:false
    },
    FKinstrutor: {
        type: DataTypes.STRING,
        allowNull: false,
        references: {
            model: 'Usuario',
            key: 'matricula'
        }
    }
}, {
    sequelize,
    modelName: 'Instrutor',
    timestamps: true
});

Instrutor.belongsTo(Usuario, {foreignKey : 'FKinstrutor'})

module.exports = Instrutor;
