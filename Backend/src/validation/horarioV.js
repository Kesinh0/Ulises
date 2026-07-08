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
		.pattern(/^([01]\d|2[0-3]):([0-5]\d)$/)
		.required()
		.messages({
			invalid: "Hora de fin invalida",
			empty: "La hora de fin no puede estar vacia",
		}),
	vehiculoId: Joi.number().integer().required().messages({
		invalid: "VehiculoId invalido",
		empty: "El vehiculoId no puede estar vacio",
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
	vehiculoId: Joi.number().integer().optional(),
}).min(1);

module.exports = { horarioSchema, updateHorarioSchema };
