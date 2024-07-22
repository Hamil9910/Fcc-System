const { Model, DataTypes } = require('sequelize');

class Paciente extends Model {
    static config(sequelize) {
        return {
            sequelize,
            tableName: 'paciente',
            modelName: 'Paciente',
            schema:'fcc_historiaclinica',
            timestamps: false,
        };
    }

    static associate(models) {
        Paciente.belongsTo(models.historia, {
            foreignKey: 'id_historia',
            as: 'historia',
        });
    }
}

const PacienteSchema = {
    id_paciente: {
        allowNull: false,
        primaryKey: true,
        type: DataTypes.BIGINT,
    },
    id_historia: {
        allowNull: false,
        type: DataTypes.BIGINT,
    },
    nombre_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    apellidos_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    cedula_paciente: {
        type: DataTypes.STRING(20),
        allowNull: true,
    },
    direccion_paciente: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    telefono_paciente: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    email_paciente: {
        type: DataTypes.STRING(120),
        allowNull: true,
    },
    redes_paciente: {
        type: DataTypes.STRING(240),
        allowNull: true,
    },
    edad_paciente: {
        type: DataTypes.INTEGER,
        allowNull: true,
    },
    fecha_paciente: {
        type: DataTypes.DATE,
        allowNull: true,
    },
    genero_paciente: {
        type: DataTypes.STRING(15),
        allowNull: true,
    },
};

module.exports = { Paciente, PacienteSchema };
