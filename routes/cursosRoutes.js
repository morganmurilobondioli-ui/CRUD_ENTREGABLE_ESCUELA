import express from "express";
import {
  crearCurso,
  obtenerCursos,
  obtenerCursoPorId,
  actualizarCurso,
  eliminarCurso,
  obtenerCategorias,
  obtenerSubcategorias,
  obtenerDocentes
} from "../controllers/cursoController.js";

const router = express.Router();

// CRUD principal
router.post("/", crearCurso);
router.get("/", obtenerCursos);
router.get("/:id", obtenerCursoPorId);
router.put("/:id", actualizarCurso);
router.delete("/:id", eliminarCurso);

// Rutas auxiliares para selects
router.get("/data/categorias", obtenerCategorias);
router.get("/data/subcategorias", obtenerSubcategorias);
router.get("/data/docentes", obtenerDocentes);

export default router;