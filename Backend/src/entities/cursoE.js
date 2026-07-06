const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
  name: "Curso",
  tableName: "cursos",
  columns: {
    id: {
      primary: true,
      type: "int",
      generated: "increment",
    },
    nombre: {
      type: "varchar",
      length: 80,
      nullable: false,
    },
    descripcion: {
      type: "varchar",
      length: 255,
      nullable: true,
    },
    vigente: {
      type: "boolean",
      default: true,
    },
    fechaInicioAcademica: {
      type: "date",
      nullable: false,
    },
    fechaFinAcademica: {
      type: "date",
      nullable: false,
    },
    profesorId: {
      type: "int",
      nullable: false,
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
