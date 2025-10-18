import pool from "../config/db.js";

// =============================
// Crear curso
// =============================
export const crearCurso = async (req, res) => {
  const {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    duracion_horas,
    precio,
    id_docente,
    id_subcategoria,
  } = req.body;

  if (!titulo || !fecha_inicio || !fecha_fin || !duracion_horas || !precio) {
    return res.status(400).json({ mensaje: "Faltan campos obligatorios" });
  }

  const sql = `
    INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_docente, id_subcategoria)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  try {
    const [result] = await pool.query(sql, [
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      duracion_horas,
      precio,
      id_docente || null,
      id_subcategoria || null,
    ]);

    res.status(201).json({
      id: result.insertId,
      mensaje: "Curso registrado correctamente",
    });
  } catch (error) {
    console.error("Error al crear curso:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// =============================
// Listar cursos (con joins completos)
// =============================
export const obtenerCursos = async (req, res) => {
  const sql = `
    SELECT 
      c.id_curso,
      c.titulo,
      c.descripcion,
      c.fecha_inicio,
      c.fecha_fin,
      c.duracion_horas,
      c.precio,
      d.nombre AS nombre_docente,
      d.apellido AS apellido_docente,
      s.nombre AS nombre_subcategoria,
      cat.nombre AS nombre_categoria
    FROM curso c
    LEFT JOIN subcategoria s ON c.id_subcategoria = s.id_subcategoria
    LEFT JOIN categoria cat ON s.id_categoria = cat.id_categoria
    LEFT JOIN docente d ON c.id_docente = d.id_docente
    ORDER BY c.id_curso DESC
  `;

  try {
    const [cursos] = await pool.query(sql);
    console.log("📚 Cursos obtenidos:", cursos); // <--- agrega esto para verificar
    res.status(200).json(cursos);
  } catch (error) {
    console.error("Error al obtener cursos:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// =============================
// Buscar curso por ID
// =============================
export const obtenerCursoPorId = async (req, res) => {
  const { id } = req.params;
  const sql = `
    SELECT * FROM curso WHERE id_curso = ?
  `;

  try {
    const [curso] = await pool.query(sql, [id]);
    if (curso.length === 0) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
    res.status(200).json(curso[0]);
  } catch (error) {
    console.error("Error al obtener curso:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// =============================
// Actualizar curso
// =============================
export const actualizarCurso = async (req, res) => {
  const { id } = req.params;
  const {
    titulo,
    descripcion,
    fecha_inicio,
    fecha_fin,
    duracion_horas,
    precio,
    id_docente,
    id_subcategoria,
  } = req.body;

  const sql = `
    UPDATE curso
    SET titulo=?, descripcion=?, fecha_inicio=?, fecha_fin=?, duracion_horas=?, precio=?, id_docente=?, id_subcategoria=?
    WHERE id_curso=?
  `;

  try {
    const [result] = await pool.query(sql, [
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      duracion_horas,
      precio,
      id_docente || null,
      id_subcategoria || null,
      id,
    ]);

    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }

    res.status(200).json({ mensaje: "Curso actualizado correctamente" });
  } catch (error) {
    console.error("Error al actualizar curso:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// =============================
// Eliminar curso
// =============================
export const eliminarCurso = async (req, res) => {
  const { id } = req.params;
  const sql = `DELETE FROM curso WHERE id_curso = ?`;

  try {
    const [result] = await pool.query(sql, [id]);
    if (result.affectedRows === 0) {
      return res.status(404).json({ mensaje: "Curso no encontrado" });
    }
    res.status(200).json({ mensaje: "Curso eliminado correctamente" });
  } catch (error) {
    console.error("Error al eliminar curso:", error);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

// --- Obtener categorías ---
export const obtenerCategorias = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_categoria, nombre FROM categoria");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener categorías:", error);
    res.status(500).json({ mensaje: "Error al obtener categorías" });
  }
};

// --- Obtener subcategorías ---
export const obtenerSubcategorias = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT id_subcategoria, nombre, id_categoria FROM subcategoria"
    );
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener subcategorías:", error);
    res.status(500).json({ mensaje: "Error al obtener subcategorías" });
  }
};

// --- Obtener docentes ---
export const obtenerDocentes = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT id_docente, nombre, apellido FROM docente");
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error al obtener docentes:", error);
    res.status(500).json({ mensaje: "Error al obtener docentes" });
  }
};
