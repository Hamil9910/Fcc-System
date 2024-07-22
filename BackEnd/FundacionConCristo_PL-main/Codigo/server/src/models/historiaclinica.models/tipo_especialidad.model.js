const { Model, DataTypes } = require('sequelize');

class TipoEspecialidad extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'tipo_especialidad',
            modelName: 'TipoEspecialidad',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        TipoEspecialidad.hasMany(models.Especialidad, {
            foreignKey: 'id_tipo_especialidad',
            as: 'especialidades',
        });
    }
}

const TipoEspecialidadSchema = {
    id_tipo_especialidad: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    descripcion_tipo_especialidad: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { TipoEspecialidad, TipoEspecialidadSchema };
