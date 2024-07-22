const { TipoEnfermedad, TipoEnfermedadSchema } = require('./historiaclinica.models/tipo_enfermedad.model'); 
const { Enfermedad, EnfermedadSchema } = require('./historiaclinica.models/enfermedades.model'); 
const { TipoExamen, TipoExamenSchema } = require('./historiaclinica.models/tipo_examen.model'); 
const { Examen, ExamenSchema } = require('./historiaclinica.models/examen.model'); 
const { TipoEspecialidad, TipoEspecialidadSchema } = require('./historiaclinica.models/tipo_especialidad.model'); 
const { Especialidad, EspecialidadSchema } = require('./historiaclinica.models/especialidad.model'); 
const { APS, ApsSchema } = require('./historiaclinica.models/aps.model');
const {Medico, MedicoSchema}  = require('./historiaclinica.models/medicos.model');
const {Historia, HistoriaSchema}  = require('./historiaclinica.models/historia.model');
const {Paciente, PacienteSchema}  = require('./historiaclinica.models/paciente.model');

function setupModels(sequelize) {
   //models
   TipoEnfermedad.init(TipoEnfermedadSchema, TipoEnfermedad.config(sequelize)); 
   Enfermedad.init(EnfermedadSchema, Enfermedad.config(sequelize));
   TipoExamen.init(TipoExamenSchema, TipoExamen.config(sequelize)); 
   Examen.init(ExamenSchema, Examen.config(sequelize));
   TipoEspecialidad.init(TipoEspecialidadSchema, TipoEspecialidad.config(sequelize)); 
   Especialidad.init(EspecialidadSchema, Especialidad.config(sequelize));
   APS.init(ApsSchema, APS.config(sequelize));
   Medico.init(MedicoSchema, Medico.config(sequelize));
   Historia.init(HistoriaSchema, Historia.config(sequelize));
   Paciente.init(PacienteSchema, Paciente.config(sequelize));

   //association
   TipoEnfermedad.associate({ Enfermedad: Enfermedad });
   Enfermedad.associate({ TipoEnfermedad: TipoEnfermedad })
   TipoExamen.associate({ Examen: Examen }); 
   Examen.associate({ TipoExamen: TipoExamen });
   TipoEspecialidad.associate({ Especialidad: Especialidad }); 
   Especialidad.associate({ TipoEspecialidad: TipoEspecialidad });
}

module.exports = setupModels;
