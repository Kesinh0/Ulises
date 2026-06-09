const Joi = require("joi");

const calificacionSchema = Joi.object({
	profesorId: Joi.number().integer().required(),
	alumnoId: Joi.number().integer().required(),
	tareaId: Joi.number().integer().required(),
	nota: Joi.number().min(1).max(7).required(),
	observacion: Joi.string().max(255).allow("", null),
});

module.exports = {
	calificacionSchema,
};