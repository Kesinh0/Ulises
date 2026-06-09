const Joi = require("joi");

const tareaSchema = Joi.object({
	profesorId: Joi.number().integer().required(),
	titulo: Joi.string().min(3).max(100).required(),
	descripcion: Joi.string().max(255).allow("", null),
	material: Joi.string().max(255).allow("", null),
	fechaEntrega: Joi.date().required(),
});

module.exports = {
	tareaSchema,
};