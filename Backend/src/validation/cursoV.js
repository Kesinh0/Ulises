const Joi = require("joi");

const cursoSchema = Joi.object({
	nombre: Joi.string().min(3).max(80).required(),
	descripcion: Joi.string().max(255).allow("", null),
	vigente: Joi.boolean().default(true),
	fechaInicioAcademica: Joi.date().required(),
	fechaFinAcademica: Joi.date().required(),
	profesorId: Joi.number().integer().required(),
});

module.exports = {
	cursoSchema,
};