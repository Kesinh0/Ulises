require("reflect-metadata");

const express = require("express");
const config = require("./conf/config");
const db = require("./conf/db");
const alumnoR = require("./routes/alumnoR");
const profesorR = require("./routes/profesorR");
const vehiculoR = require("./routes/vehiculoR");
const horarioR = require("./routes/horarioR");
const inscripcionR = require("./routes/inscripcionR");

const app = express();

app.use(express.json());
app.use("/alumnos", alumnoR);
app.use("/profesores", profesorR);
app.use("/vehiculos", vehiculoR);
app.use("/horarios", horarioR);
app.use("/inscripciones", inscripcionR);

app.get("/", (req, res) => {
	res.json({ mensaje: "porfa funciona", version: "1.0.0" });
});

app.use((req, res) => {
	res.status(404).json({ success: false, error: "no se encontró ruta" });
});

db.initialize()
	.then(() => {
		console.log("base de datos conectada");
		app.listen(config.PORT, () => {
			console.log(`Servidor corriendo en: ${config.PORT}`);
		});
	})
	.catch((err) => {
		console.error("no se pudo conectar a la db:", err);
	});
