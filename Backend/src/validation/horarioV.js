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
}).min(1);

module.exports = { horarioSchema, updateHorarioSchema };
