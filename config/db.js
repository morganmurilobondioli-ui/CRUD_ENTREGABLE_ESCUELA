// Importar el paquete mysql2
import mysql from "mysql2/promise";

// Crear la conexión a la base de datos
const pool = mysql.createPool({
  host: "localhost",      // Servidor local
  user: "root",           // Tu usuario MySQL (ajústalo según tu configuración)
  password: "",           // Tu contraseña MySQL
  database: "gestion_cursos", // Nombre de la base de datos
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

// Probar la conexión
(async () => {
  try {
    const connection = await pool.getConnection();
    console.log("✅ Conectado correctamente a la base de datos MySQL");
    connection.release();
  } catch (error) {
    console.error("❌ Error al conectar con la base de datos:", error.message);
  }
})();

// Exportar el pool para usarlo en otros módulos
export default pool;
