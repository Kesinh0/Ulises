const {
	obtenerCursos,
	obtenerCursoPorId,
	crearCurso,
    inscribirAlumno,
    crearTarea,
    registrarCalificacion,
    obtenerPanelAlumno,
} = require("../service/cursoService");

const { cursoSchema } = require("../validation/cursoV");
const { tareaSchema } = require("../validation/tareaV");
const { calificacionSchema } = require("../validation/calificacionV");

const listarCursos = async (req, res) => {
	try {
		const cursos = await obtenerCursos();
		res.status(200).json(cursos);
	} catch (error) {
		res.status(500).json({ mensaje: error.message });
	}
};

const buscarCurso = async (req, res) => {
	try {
		const curso = await obtenerCursoPorId(req.params.id);

		if (!curso) {
			return res.status(404).json({ mensaje: "Curso no encontrado" });
		}

		res.status(200).json(curso);
	} catch (error) {
		res.status(500).json({ mensaje: error.message });
	}
};

const registrarCurso = async (req, res) => {
	try {
		const { error, value } = cursoSchema.validate(req.body);

		if (error) {
			return res.status(400).json({ mensaje: error.details[0].message });
		}

		const curso = await crearCurso(value);
		res.status(201).json({
			mensaje: "Curso creado correctamente",
			curso,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
};

const registrarInscripcion = async (req, res) => {
	try {
		const { alumnoId } = req.body;

		if (!alumnoId) {
			return res.status(400).json({ mensaje: "Debe enviar el alumnoId" });
		}

		const inscripcion = await inscribirAlumno(req.params.id, alumnoId);

		res.status(201).json({
			mensaje: "Alumno inscrito correctamente en el curso",
			inscripcion,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
};

const registrarTarea = async (req, res) => {
	try {
		const { error, value } = tareaSchema.validate(req.body);

		if (error) {
			return res.status(400).json({ mensaje: error.details[0].message });
		}

		const tarea = await crearTarea(req.params.id, value);

		res.status(201).json({
			mensaje: "Tarea registrada correctamente",
			tarea,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
};
const crearCalificacion = async (req, res) => {
	try {
		const { error, value } = calificacionSchema.validate(req.body);

		if (error) {
			return res.status(400).json({ mensaje: error.details[0].message });
		}

		const calificacion = await registrarCalificacion(req.params.id, value);

		res.status(201).json({
			mensaje: "Calificacion registrada correctamente",
			calificacion,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
};
const verPanelAlumno = async (req, res) => {
	try {
		const panel = await obtenerPanelAlumno(req.params.id, req.params.alumnoId);

		res.status(200).json({
			mensaje: "Panel del alumno obtenido correctamente",
			panel,
		});
	} catch (error) {
		res.status(400).json({ mensaje: error.message });
	}
};
module.exports = {
	listarCursos,
	buscarCurso,
	registrarCurso,
    registrarInscripcion,
    registrarTarea,
    crearCalificacion,
    verPanelAlumno,
};