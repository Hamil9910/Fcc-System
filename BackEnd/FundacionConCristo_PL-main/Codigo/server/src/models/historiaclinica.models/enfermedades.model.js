const { Model, DataTypes } = require('sequelize');

class Enfermedad extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'enfermedades',
            modelName: 'Enfermedad',
            schema:'fcc_historiaclinica',
            timestamps: false, 
            
        };
    }
    static associate(models) {
        Enfermedad.belongsTo(models.TipoEnfermedad, {
            foreignKey: 'id_tipo_enfermedad',
            as: 'tipo_enfermedad',
        });
    }
}

const EnfermedadSchema = {
    id_enfermedad: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_tipo_enfermedad: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombre_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field:'nombre_enfermedad'
    },
    descripcion_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field: 'descripcion_enfermedad'
    },
    documento_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
        field: 'documento_enfermedad'
    },
};

module.exports = { Enfermedad, EnfermedadSchema };
