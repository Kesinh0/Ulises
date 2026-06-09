const {EntitySchema} = require("typeorm");

module.exports = new EntitySchema({
    name: "Inscripcion",
    tableName: "inscripciones",
    columns: {
        alumnoId: {
            primary: true,
            type: "int"
        },
        profesorId: {
            type: "int"
        },
    },
    relations: {
        alumno: {
            type: "many-to-one",
            target: "Alumno",
            joinColumn: { name: "alumnoId" },
        },
        profesor: {
            type: "many-to-one",
            target: "Profesor",
            joinColumn: { name: "profesorId" },
        },
    },
});