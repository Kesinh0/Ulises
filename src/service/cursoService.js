const AppDataSource = require("../conf/db");

const cursoRepository = () => AppDataSource.getRepository("Curso");
const profesorRepository = () => AppDataSource.getRepository("Profesor");
const alumnoRepository = () => AppDataSource.getRepository("Alumno");
const inscripcionRepository = () => AppDataSource.getRepository("Inscripcion");
const tareaRepository = () => AppDataSource.getRepository("Tarea");
const calificacionRepository = () => AppDataSource.getRepository("Calificacion");

const obtenerCursos = async () => {
	return await cursoRepository().find({
		relations: ["profesor"],
	});
};

const obtenerCursoPorId = async (id) => {
	return await cursoRepository().findOne({
		where: { id: Number(id) },
		relations: ["profesor"],
	});
};

const crearCurso = async (cursoData) => {
	const profesor = await profesorRepository().findOne({
		where: { id: Number(cursoData.profesorId) },
	});

	if (!profesor) {
		throw new Error("El profesor indicado no existe");
	}

	const fechaInicio = new Date(cursoData.fechaInicioAcademica);
	const fechaFin = new Date(cursoData.fechaFinAcademica);

	if (fechaInicio > fechaFin) {
		throw new Error("La fecha de inicio no puede ser mayor a la fecha de termino");
	}

	const nuevoCurso = cursoRepository().create(cursoData);
	return await cursoRepository().save(nuevoCurso);
};

const inscribirAlumno = async (cursoId, alumnoId) => {
	const curso = await cursoRepository().findOne({
		where: { id: Number(cursoId) },
	});

	if (!curso) {
		throw new Error("El curso no existe");
	}

	if (!curso.vigente) {
		throw new Error("No se puede inscribir alumnos en un curso no vigente");
	}

	const alumno = await alumnoRepository().findOne({
		where: { id: Number(alumnoId) },
	});

	if (!alumno) {
		throw new Error("El alumno no existe");
	}

	const inscripcionExistente = await inscripcionRepository().findOne({
		where: {
			cursoId: Number(cursoId),
			alumnoId: Number(alumnoId),
		},
	});

	if (inscripcionExistente) {
		throw new Error("El alumno ya esta inscrito en este curso");
	}

	const nuevaInscripcion = inscripcionRepository().create({
		cursoId: Number(cursoId),
		alumnoId: Number(alumnoId),
	});

	return await inscripcionRepository().save(nuevaInscripcion);
};
const crearTarea = async (cursoId, tareaData) => {
	const curso = await cursoRepository().findOne({
		where: { id: Number(cursoId) },
	});

	if (!curso) {
		throw new Error("El curso no existe");
	}

	if (!curso.vigente) {
		throw new Error("No se pueden registrar tareas en un curso no vigente");
	}

	if (Number(curso.profesorId) !== Number(tareaData.profesorId)) {
		throw new Error("El profesor no pertenece a este curso");
	}

	const inscripciones = await inscripcionRepository().find({
		where: { cursoId: Number(cursoId) },
	});

	if (inscripciones.length === 0) {
		throw new Error("No se pueden registrar tareas porque el curso no tiene alumnos inscritos");
	}

	const hoy = new Date();
	const fechaInicio = new Date(curso.fechaInicioAcademica);
	const fechaFin = new Date(curso.fechaFinAcademica);

	if (hoy < fechaInicio || hoy > fechaFin) {
		throw new Error("No se pueden registrar tareas fuera del plazo academico");
	}

	const fechaEntrega = new Date(tareaData.fechaEntrega);

	if (fechaEntrega < fechaInicio || fechaEntrega > fechaFin) {
		throw new Error("La fecha de entrega debe estar dentro del plazo academico del curso");
	}

	const nuevaTarea = tareaRepository().create({
		cursoId: Number(cursoId),
		titulo: tareaData.titulo,
		descripcion: tareaData.descripcion,
		material: tareaData.material,
		fechaEntrega: tareaData.fechaEntrega,
	});

	return await tareaRepository().save(nuevaTarea);
};
const registrarCalificacion = async (cursoId, calificacionData) => {
	const curso = await cursoRepository().findOne({
		where: { id: Number(cursoId) },
	});

	if (!curso) {
		throw new Error("El curso no existe");
	}

	if (!curso.vigente) {
		throw new Error("No se pueden registrar calificaciones en un curso no vigente");
	}

	if (Number(curso.profesorId) !== Number(calificacionData.profesorId)) {
		throw new Error("El profesor no pertenece a este curso");
	}

	const inscripcion = await inscripcionRepository().findOne({
		where: {
			cursoId: Number(cursoId),
			alumnoId: Number(calificacionData.alumnoId),
		},
	});

	if (!inscripcion) {
		throw new Error("El alumno no esta inscrito en este curso");
	}

	const tarea = await tareaRepository().findOne({
		where: {
			id: Number(calificacionData.tareaId),
			cursoId: Number(cursoId),
		},
	});

	if (!tarea) {
		throw new Error("La tarea no existe o no pertenece a este curso");
	}

	const hoy = new Date();
	const fechaInicio = new Date(curso.fechaInicioAcademica);
	const fechaFin = new Date(curso.fechaFinAcademica);

	if (hoy < fechaInicio || hoy > fechaFin) {
		throw new Error("No se pueden registrar calificaciones fuera del plazo academico");
	}

	const calificacionExistente = await calificacionRepository().findOne({
		where: {
			cursoId: Number(cursoId),
			alumnoId: Number(calificacionData.alumnoId),
			tareaId: Number(calificacionData.tareaId),
		},
	});

	if (calificacionExistente) {
		throw new Error("El alumno ya tiene una calificacion registrada para esta tarea");
	}

	const nuevaCalificacion = calificacionRepository().create({
		cursoId: Number(cursoId),
		alumnoId: Number(calificacionData.alumnoId),
		tareaId: Number(calificacionData.tareaId),
		nota: calificacionData.nota,
		observacion: calificacionData.observacion,
	});

	return await calificacionRepository().save(nuevaCalificacion);
};
const obtenerPanelAlumno = async (cursoId, alumnoId) => {
	const curso = await cursoRepository().findOne({
		where: { id: Number(cursoId) },
		relations: ["profesor"],
	});

	if (!curso) {
		throw new Error("El curso no existe");
	}

	const inscripcion = await inscripcionRepository().findOne({
		where: {
			cursoId: Number(cursoId),
			alumnoId: Number(alumnoId),
		},
		relations: ["alumno"],
	});

	if (!inscripcion) {
		throw new Error("El alumno no esta inscrito en este curso");
	}

	const tareas = await tareaRepository().find({
		where: { cursoId: Number(cursoId) },
		order: { fechaEntrega: "ASC" },
	});

	const calificaciones = await calificacionRepository().find({
		where: {
			cursoId: Number(cursoId),
			alumnoId: Number(alumnoId),
		},
		relations: ["tarea"],
	});

	return {
		curso,
		alumno: inscripcion.alumno,
		tareas,
		calificaciones,
	};
};
module.exports = {
	obtenerCursos,
	obtenerCursoPorId,
	crearCurso,
	inscribirAlumno,
    crearTarea,
    registrarCalificacion,
    obtenerPanelAlumno,
};