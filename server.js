// ================================
// 📦 Importaciones principales
// ================================
import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import pool from "./config/db.js"; // conexión a MySQL
import cursosRoutes from "./routes/cursosRoutes.js";

// ================================
// ⚙️ Configuración básica
// ================================
const app = express();
const PORT = process.env.PORT || 3000;

// Resolver __dirname en módulos ES
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ================================
// 🧩 Middlewares
// ================================
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Archivos estáticos (Bootstrap, JS, CSS, HTML)
app.use(express.static(path.join(__dirname, "public")));

// ================================
// 🌐 Rutas principales
// ================================

// Página principal (formulario de cursos)
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "cursos.html"));
});

// Rutas del CRUD de cursos (API)
app.use("/cursos", cursosRoutes);

// Ruta de prueba (verificar conexión con la base de datos)
app.get("/api/test-db", async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT NOW() AS fecha");
    res.json({ conexion: "ok", fecha: rows[0].fecha });
  } catch (error) {
    console.error("Error al conectar con la BD:", error.message);
    res.status(500).json({ error: "Error al conectar con la base de datos" });
  }
});

// ================================
// 🚀 Iniciar servidor
// ================================
app.listen(PORT, () => {
  console.log(`✅ Servidor ejecutándose en http://localhost:${PORT}`);
});