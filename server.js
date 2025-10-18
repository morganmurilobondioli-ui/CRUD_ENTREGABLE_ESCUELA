// Importaciones principales
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js"; // conexión MySQL
import cursosRoutes from "./routes/cursosRoutes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Configurar rutas absolutas
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Middlewares
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (Bootstrap, CSS, JS, imágenes, etc.)
app.use(express.static(path.join(__dirname, "public")));

// Configurar el motor de vistas EJS
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Ruta base
app.get("/", async (req, res) => {
  try {
    const [cursos] = await pool.query("SELECT * FROM curso");
    res.render("cursos/index", { cursos });
  } catch (error) {
    console.error("Error al obtener cursos:", error.message);
    res.status(500).send("Error en el servidor");
  }
});

// Rutas del CRUD de cursos
app.use("/cursos", cursosRoutes);

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});