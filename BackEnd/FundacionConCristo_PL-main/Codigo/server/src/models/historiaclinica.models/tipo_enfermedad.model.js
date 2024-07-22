const { Model, DataTypes } = require('sequelize');

class TipoEnfermedad extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_enfermedad',
            modelName: 'TipoEnfermedad',
            schema: 'fcc_historiaclinica',
            timestamps: false,
           
        };
    }
     static associate(models) {
        TipoEnfermedad.hasMany(models.Enfermedad, {
            foreignKey: 'id_tipo_enfermedad',
            as: 'enfermedades',
        });
    }
}

const TipoEnfermedadSchema = {
    id_tipo_enfermedad: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    nombre_tipo_enfermedad: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { TipoEnfermedad, TipoEnfermedadSchema };
