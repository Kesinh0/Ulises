const { EntitySchema } = require("typeorm");

module.exports = new EntitySchema({
	name: "Vehiculo",
	tableName: "vehiculos",
	columns: {
		id: {
			primary: true,
			type: "int",
			generated: "increment",
		},
		marca: {
			type: "varchar",
			length: 30,
			nullable: false,
		},
		modelo: {
			type: "varchar",
			length: 30,
			nullable: false,
		},
		anio: {
			type: "int",
			nullable: false,
		},
		estado: {
			type: "varchar",
			length: 20,
			nullable: false,
		},
		enMantenimiento: {
			type: "boolean",
			nullable: false,
		},
	},
});
