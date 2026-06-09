const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Tarea",
	tableName: "tareas",
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
		titulo: {
			type: "varchar",
			length: 100,
			nullable: false,
		},
		descripcion: {
			type: "varchar",
			length: 255,
			nullable: true,
		},
		material: {
			type: "varchar",
			length: 255,
			nullable: true,
		},
		fechaEntrega: {
			type: "date",
			nullable: false,
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
	},
});