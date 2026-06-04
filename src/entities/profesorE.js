const {EntitySchema} = require('typeorm');

module.exports = new EntitySchema({
    name: 'Profesor',
    tableName: 'profesores',
    columns: {
        id: {
            primary: true, type: 'int', generated: 'increment'
        },
        nombre: {
            type: 'varchar', length: 30, nullable: false
        },
        apellido: {
            type: 'varchar', length: 30, nullable: false
        },
        categoria: {
            type: 'varchar', length: 30, nullable: false
        }
    }
});