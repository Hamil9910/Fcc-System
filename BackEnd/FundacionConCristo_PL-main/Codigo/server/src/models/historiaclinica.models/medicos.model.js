const { Model, DataTypes } = require('sequelize');

class Medico extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'medicos',
            modelName: 'Medico',
            schema:'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        Medico.belongsTo(models.especialidad, {
            foreignKey: 'id_especialidad',
            as: 'especialidad',
        });
    }
}

const MedicoSchema = {
    id_medico: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_especialidad: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombres_medico: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    apellidos_medico: {
        type: DataTypes.STRING(30),
        allowNull: true,
    },
    cedula_medico: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    titulos_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    telefono_medico: {
        type: DataTypes.STRING(160),
        allowNull: true,
    },
    direccion_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    email_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    hdv_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    foto_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    postgrado_medico: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { Medico, MedicoSchema };
