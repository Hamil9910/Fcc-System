const { Model, DataTypes } = require('sequelize');

class APS extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'aps',
            modelName: 'Aps',
            schema:'fcc_historiaclinica',
            timestamps: false, 
        };
    }

    static associate(models) {
        APS.belongsTo(models.historia, {
            foreignKey: 'id_historia',
            as: 'historia',
        });

        APS.belongsTo(models.examen, {
            foreignKey: 'id_examen',
            as: 'examen',
        });

        APS.belongsTo(models.medico, {
            foreignKey: 'id_medico',
            as: 'medico',
        });
    }
}

const ApsSchema = {
    id_aps: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_historia: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    id_examen: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    id_medico: {
        allowNull: true,
        type: DataTypes.BIGINT,
    },
    resultados_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    fecha_aps: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    notas_evolucion_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    prescripciones_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    observaciones_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    documento_general_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    documento_especifico_aps: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};

module.exports = { APS, ApsSchema };
