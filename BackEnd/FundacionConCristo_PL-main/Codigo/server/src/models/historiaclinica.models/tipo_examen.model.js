const { Model, DataTypes } = require('sequelize');

class TipoExamen extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_examen',
            modelName: 'TipoExamen',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }
    static associate(models) {
        TipoExamen.hasMany(models.Examen, {
            foreignKey: 'id_tipo_examen',
            as: 'tipo_examen',
        });
    }
}

const TipoExamenSchema = {
    id_tipo_examen: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    nombre_tipo_examen: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};


module.exports = { TipoExamen, TipoExamenSchema };
