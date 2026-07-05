const Joi = require("joi");

const horarioSchema = Joi.object({
	dia: Joi.string()
		.valid(
			"LUNES",
			"MARTES",
			"MIERCOLES",
			"JUEVES",
			"VIERNES",
			"SABADO",
			"DOMINGO",
		)
		.required()
		.messages({
			invalid: "Dia invalido",
			empty: "El dia no puede estar vacio",
		}),
	horaInicio: Joi.string()
		.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
		.required()
		.messages({
			invalid: "Hora de inicio invalida",
			empty: "La hora de inicio no puede estar vacia",
		}),
	horaFin: Joi.string()
		.pattern(/^(([01]\d)|(2[0-3])):([0-5]\d)$/)
		.required()
		.messages({
			invalid: "Hora de fin invalida",
			empty: "La hora de fin no puede estar vacia",
		}),
	profesorId: Joi.number().integer().positive().required().messages({
		invalid: "Profesor ID invalido",
		empty: "El profesor ID no puede estar vacio",
	}),
});

const updateHorarioSchema = Joi.object({
	dia: Joi.string()
		.valid(
			"LUNES",
			"MARTES",
			"MIERCOLES",
			"JUEVES",
			"VIERNES",
			"SABADO",
			"DOMINGO",
		)
		.optional(),
	horaInicio: Joi.string()
		.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
		.optional(),
	horaFin: Joi.string()
		.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
		.optional(),
	profesorId: Joi.number().integer().positive().optional(),
}).min(1);

module.exports = { horarioSchema, updateHorarioSchema };
