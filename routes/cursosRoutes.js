import express from "express";
import { getCursos, createCurso, updateCurso, deleteCurso } from "../controllers/cursosController.js";

const router = express.Router();

// Rutas CRUD
router.get("/", getCursos);
router.post("/add", createCurso);
router.post("/update/:id", updateCurso);
router.get("/delete/:id", deleteCurso);

// Exportación por defecto
export default router;