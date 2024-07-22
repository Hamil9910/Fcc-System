const { Model, DataTypes } = require('sequelize');

class Especialidad extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'especialidad',
            modelName: 'Especialidad',
            schema: 'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        Especialidad.belongsTo(models.TipoEspecialidad, {
            foreignKey: 'id_tipo_especialidad',
            as: 'tipo_especialidad',
        });
    }
}

const EspecialidadSchema = {
    id_especialidad: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_tipo_especialidad: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombre_especialidad: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { Especialidad, EspecialidadSchema };
