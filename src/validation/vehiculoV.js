const Joi = require('joi');

const vehiculoSchema = Joi.object({
    marca: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Marca invalida', 'empty': 'La marca no puede estar vacia'}),
    modelo: Joi.string() .alphanum() .min(3) .max(30) .required()
    .messages({'invalid': 'Modelo invalido', 'empty': 'El modelo no puede estar vacio'}),
    año: Joi.number() .integer() .min(1886) .max(new Date().getFullYear()) .required()
    .messages({'invalid': 'Año invalido', 'empty': 'El año no puede estar vacio'}),
    estado: Joi.string() .alphanum() .min(3) .max(20) .required()
    .messages({'invalid': 'Estado invalido', 'empty': 'El estado no puede estar vacio'}),
    enMantenimiento: Joi.boolean() .required()
    .messages({'invalid': 'En mantenimiento debe ser un booleano', 'empty': 'El campo en mantenimiento no puede estar vacio'}),
});

const updateVehiculoSchema = Joi.object({
    id: Joi.number() .integer() .min(1) .optional(),
    marca: Joi.string() .alphanum() .min(3) .max(30) .optional(),
    modelo: Joi.string() .alphanum() .min(3) .max(30) .optional(),
    año: Joi.number() .integer() .min(1886) .max(new Date().getFullYear()) .optional(),
    estado: Joi.string() .alphanum() .min(3) .max(20) .optional(),
    enMantenimiento: Joi.boolean() .optional()
}).min(1);
