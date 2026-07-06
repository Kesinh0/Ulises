const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Calificacion",
  tableName: "calificaciones",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    cursoId: {
      type: "int",
      nullable: false,
    },
    alumnoId: {
      type: "int",
      nullable: false,
    },
    tareaId: {
      type: "int",
      nullable: false,
    },
    nota: {
      type: "float",
      nullable: false,
    },
    observacion: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    fechaRegistro: {
      type: "date",
      default: () => "CURRENT_DATE",
    },
  },
  relations: {
    curso: {
      type: "many-to-one",
      target: "Curso",
      joinColumn: { name: "cursoId" },
    },
    alumno: {
      type: "many-to-one",
      target: "Usuario",
      joinColumn: { name: "alumnoId" },
    },
    tarea: {
      type: "many-to-one",
      target: "Tarea",
      joinColumn: { name: "tareaId" },
    },
  },
});
