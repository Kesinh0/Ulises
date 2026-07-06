const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Horario",
  tableName: "horarios",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    dia: {
      type: "enum",
      enum: [
        "LUNES",
        "MARTES",
        "MIERCOLES",
        "JUEVES",
        "VIERNES",
        "SABADO",
        "DOMINGO",
      ],
    },
    horaInicio: {
      type: "time",
    },
    horaFin: {
      type: "time",
    },
    profesorId: {
      type: "int",
    },
  },
  relations: {
    profesor: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "profesorId" },
    },
  },
});
