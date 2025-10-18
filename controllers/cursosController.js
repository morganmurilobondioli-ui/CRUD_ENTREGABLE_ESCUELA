//Acceso a la BD mysql/promise
const db = require("../config/db");

//Métodos exportados
//req   require (solicitud)
//res   response (respuesta)

//Crear
exports.crearCurso = async (req, res) => {
  //1. Recepcionar los datos
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

  //2. Validación backend
  if (
    !titulo ||
    !fecha_inicio ||
    !fecha_fin ||
    !duracion_horas ||
    !precio ||
    !id_docente ||
    !id_subcategoria
  ) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  //3. Estructurar la consulta
  const sql = `
    INSERT INTO curso (titulo, descripcion, fecha_inicio, fecha_fin, duracion_horas, precio, id_docente, id_subcategoria)
    VALUES (?, ?, ?, ?, ?, ?, ?, ?)
  `;

  //4. Transacción
  try {
    const [result] = await db.query(sql, [
      titulo,
      descripcion,
      fecha_inicio,
      fecha_fin,
      duracion_horas,
      precio,
      id_docente,
      id_subcategoria,
    ]);

    res.status(201).json({
      id: result.insertId,
      mensaje: "Curso registrado correctamente",
    });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//Listar
exports.obtenerCursos = async (req, res) => {
  //1. Preparar consulta
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
    LEFT JOIN docente d ON c.id_docente = d.id_docente
    LEFT JOIN subcategoria s ON c.id_subcategoria = s.id_subcategoria
    LEFT JOIN categoria cat ON s.id_categoria = cat.id_categoria
    ORDER BY c.id_curso DESC
  `;

  //2. Transacción
  try {
    const [cursos] = await db.query(sql);
    res.status(200).json(cursos);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//Buscar por ID
exports.obtenerCursoPorId = async (req, res) => {
  const { id } = req.params;
  const sql = "SELECT * FROM curso WHERE id_curso = ?";

  try {
    const [cursos] = await db.query(sql, [id]);

    if (cursos.length === 0) {
      return res.status(404).json({ mensaje: "No encontramos el curso" });
    }

    res.status(200).json(cursos[0]);
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};

//Actualizar
exports.actualizarCurso = async (req, res) => {
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

  //Validación => debe haber al menos un campo
  if (
    !titulo &&
    !descripcion &&
    !fecha_inicio &&
    !fecha_fin &&
    !duracion_horas &&
    !precio &&
    !id_docente &&
    !id_subcategoria
  ) {
    return res.status(400).json({ mensaje: "Falta completar los campos" });
  }

  let sqlParts = [];
  let values = [];

  if (titulo) {
    sqlParts.push("titulo = ?");
    values.push(titulo);
  }
  if (descripcion) {
    sqlParts.push("descripcion = ?");
    values.push(descripcion);
  }
  if (fecha_inicio) {
    sqlParts.push("fecha_inicio = ?");
    values.push(fecha_inicio);
  }
  if (fecha_fin) {
    sqlParts.push("fecha_fin = ?");
    values.push(fecha_fin);
  }
  if (duracion_horas) {
    sqlParts.push("duracion_horas = ?");
    values.push(duracion_horas);
  }
  if (precio) {
    sqlParts.push("precio = ?");
    values.push(precio);
  }
  if (id_docente) {
    sqlParts.push("id_docente = ?");
    values.push(id_docente);
  }
  if (id_subcategoria) {
    sqlParts.push("id_subcategoria = ?");
    values.push(id_subcategoria);
  }

  if (sqlParts.length === 0) {
    return res.status(400).json({ mensaje: "No hay datos por actualizar" });
  }

  values.push(id);
  const sql = `UPDATE curso SET ${sqlParts.join(", ")} WHERE id_curso = ?`;

  try {
    const [result] = await db.query(sql, values);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "No encontramos el curso con el ID especificado" });
    }

    res.status(200).json({ mensaje: "Curso actualizado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno en el servidor" });
  }
};

//Eliminar
exports.eliminarCurso = async (req, res) => {
  const { id } = req.params;
  const sql = "DELETE FROM curso WHERE id_curso = ?"; //¡CUIDADO! DELETE ES IRREVERSIBLE

  try {
    const [result] = await db.query(sql, [id]);

    if (result.affectedRows === 0) {
      return res
        .status(404)
        .json({ mensaje: "Curso no encontrado para eliminar" });
    }

    res.status(200).json({ mensaje: "Eliminado correctamente" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ mensaje: "Error interno del servidor" });
  }
};