const Joi = require('joi');


const profesorSchema = Joi.object({

    nombre: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Nombre invalido', 'empty': 'El nombre no puede estar vacio'}),

    apellido: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Apellido invalido', 'empty': 'El Apellido no puede estar vacio'}),

    categoria: Joi.string() .alphanum() .min(5) .max(30) .required()
    .messages({'invalid': 'Categoria invalida', 'empty': 'Categoria no puede estar vacia'}),

});

const updateProfesorSchema = Joi.object({
    nombre: Joi.string() .alphanum() .min(3) .max(30) .optional(),
    apellido: Joi.string() .alphanum() .min(3) .max(30) .optional(),
    categoria: Joi.string() .alphanum() .min(5) .max(30) .optional()
}).min(1);

module.exports = {profesorSchema,updateProfesorSchema};