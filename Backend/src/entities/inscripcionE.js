const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Inscripcion",
  tableName: "inscripciones",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    profesorId: {
      type: "int",
      nullable: false,
    },
    alumnoId: {
      type: "int",
      nullable: false,
    },
    fechaInscripcion: {
      type: "date",
      default: () => "CURRENT_DATE",
    },
  },
  relations: {
    profesorId: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "profesorId" },
    },
    alumno: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "alumnoId" },
    },
  },
});
