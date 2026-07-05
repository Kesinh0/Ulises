const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Usuario",
	tableName: "usuarios",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		correo: {
			type: "varchar",
			length: 50,
			nullable: false,
		},
		contrasenaHash: {
			type: "varchar",
			length: 100,
			nullable: false,
		},
		rol: {
			type: "enum",
			enum: ["alumno", "profesor"],
			nullable: false,
		},
	},
});
