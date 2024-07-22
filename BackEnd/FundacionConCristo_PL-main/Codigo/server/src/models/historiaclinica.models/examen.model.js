const { Model, DataTypes } = require('sequelize');

class Examen extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'examen',
            modelName: 'Examen',
            schema:'fcc_historiaclinica',
            timestamps: false,
            
        };
    }
    static associate(models) {
        Examen.belongsTo(models.TipoExamen, {
            foreignKey: 'id_tipo_examen',
            as: 'tipo_examen',
        });
    }
}

const ExamenSchema = {
    id_examen: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_tipo_examen: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombre_examen: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    descripcion_examen: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
};


module.exports = { Examen, ExamenSchema };