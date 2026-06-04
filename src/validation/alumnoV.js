const Joi = require('joi');


const alumnoSchema = Joi.object({
    
    nombre: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Nombre invalido', 'empty': 'El nombre no puede estar vacio'}),

    apellido: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Apellido invalido', 'empty': 'El Apellido no puede estar vacio'}),

});

const updateAlumnoSchema = Joi.object({
    rut: Joi.string() .alphanum() .min(9) .max(10) .optional(),
    nombre: Joi.string() .alphanum() .min(3) .max(30) .optional(),
    apellido: Joi.string() .alphanum() .min(3) .max(30) .optional()
}).min(1);

module.exports = {alumnoSchema,updateAlumnoSchema}; 