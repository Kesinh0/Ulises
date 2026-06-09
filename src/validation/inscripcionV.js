const Joi = require('joi');

const inscripcionSchema = Joi.object({
    alumnoId: Joi.number().integer().positive().required().messages({
        invalid: 'Alumno ID invalido',
        empty: 'El Alumno ID no puede estar vacio'
    }),
    profesorId: Joi.number().integer().positive().required().messages({
        invalid: 'Profesor ID invalido',
        empty: 'El Profesor ID no puede estar vacio'
    }),
});

const updateInscripcionSchema = Joi.object({
    alumnoId: Joi.number().integer().positive().optional(),
    profesorId: Joi.number().integer().positive().optional(),
}).min(1);

module.exports = { inscripcionSchema, updateInscripcionSchema };