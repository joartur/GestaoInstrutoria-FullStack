const { DataTypes, Model } = require('sequelize');
const sequelize = require('../../../config/connection');

class Area extends Model {}

Area.init({
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
                msg: 'O nome é obrigatório!'
            },
            len: {
                args: [3, 60],
                msg: 'O nome deve ter no mínimo 3 caracteres e no máximo 80'
            }
        }
    }
}, {
    sequelize,
    modelName: 'Area',
    timestamps: false 
});

module.exports = Area;
