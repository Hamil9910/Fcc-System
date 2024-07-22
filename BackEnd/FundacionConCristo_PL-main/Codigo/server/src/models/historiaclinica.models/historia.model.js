const { Model, DataTypes } = require('sequelize');

class Historia extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'historia',
            modelName: 'Historia',
            schema:'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        Historia.belongsTo(models.enfermedades, {
            foreignKey: 'id_enfermedad',
            as: 'enfermedad',
        });
    }
}

const HistoriaSchema = {
    id_historia: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_enfermedad: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    codigo_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    fecha_historia: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    motivo_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    enfermedades_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    antece2: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    anteced: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    documento_historia: {
        type: DataTypes.STRING(140),
        allowNull: true,
    },
    tension_arterial_historia: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    p_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    t_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    talla_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    peso_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    bmi_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    nuneca_historia: {
        type: DataTypes.STRING(40),
        allowNull: true,
    },
    constitucion_historia: {
        type: DataTypes.STRING(140),
        allowNull: true,
    },
    tipo_piel_historia: {
        type: DataTypes.STRING(140),
        allowNull: true,
    },
    examen_fisico_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    diagnostico_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    plan_terapeutico_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    observaciones_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    arcchivo_general_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    archivo_especifico_historia: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { Historia, HistoriaSchema };
