# 🧩 Gestión de Cursos — CRUD con Node.js, Express y MySQL

Aplicación web para **gestionar cursos, docentes, categorías y subcategorías**, desarrollada con **Node.js**, **Express**, **MySQL** y **Bootstrap 5**.  
Permite registrar, editar y eliminar cursos de forma dinámica, con alertas modernas gracias a **SweetAlert2**.

---

## 🚀 Características principales

✅ CRUD completo de cursos (crear, leer, actualizar y eliminar).  
✅ Carga dinámica de **categorías**, **subcategorías** y **docentes** desde la base de datos.  
✅ Formularios y tablas responsivas con **Bootstrap 5**.  
✅ Alertas, confirmaciones y notificaciones con **SweetAlert2**.  
✅ Backend con rutas REST usando **Express Router**.  
✅ Código limpio y modular con controladores y conexión MySQL separados.

---
🧩 API REST disponible
  Método	Ruta	Descripción
  
    GET	      /cursos	Obtener todos los cursos
    GET	      /cursos/:id	Obtener un curso específico
    POST	    /cursos	Crear nuevo curso
    PUT	      /cursos/:id	Actualizar curso existente
    DELETE	  /cursos/:id	Eliminar curso
    GET	      /cursos/data/categorias	Listar categorías
    GET	      /cursos/data/subcategorias	Listar subcategorías
    GET	      /cursos/data/docentes	Listar docentes
---

## 🧠 Tecnologías utilizadas

| Tipo | Herramienta |
|------|--------------|
| Backend | Node.js + Express |
| Base de datos | MySQL |
| Frontend | HTML, CSS, Bootstrap 5, JavaScript |
| Alertas | SweetAlert2 |
| ORM / Conexión | mysql2 / Pool |
---

## ⚙️ Instalación y configuración

1. **Clonar el repositorio**
   ```
   git clone https://github.com/morganmurilobondioli-ui/CRUD_ENTREGABLE_ESCUELA.git
   cd gestion-cursos
   
2. **Instalar dependencias**
   ```
   npm install
   
3. **Configurar la base de datos**
   Crea una base de datos MySQL (por ejemplo db_cursos) y ajusta las credenciales en:
    ```
   /config/db.js
4. **Importar las tablas necesarias**
    ```sql
    CREATE TABLE categoria (
      id_categoria INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100)
    );
    
    CREATE TABLE subcategoria (
      id_subcategoria INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      id_categoria INT,
      FOREIGN KEY (id_categoria) REFERENCES categoria(id_categoria)
    );
    
    CREATE TABLE docente (
      id_docente INT AUTO_INCREMENT PRIMARY KEY,
      nombre VARCHAR(100),
      apellido VARCHAR(100)
    );
    
    CREATE TABLE curso (
      id_curso INT AUTO_INCREMENT PRIMARY KEY,
      titulo VARCHAR(150),
      descripcion TEXT,
      fecha_inicio DATE,
      fecha_fin DATE,
      duracion_horas INT,
      precio DECIMAL(10,2),
      id_docente INT,
      id_subcategoria INT,
      FOREIGN KEY (id_docente) REFERENCES docente(id_docente),
      FOREIGN KEY (id_subcategoria) REFERENCES subcategoria(id_subcategoria)
    );

5. **Ejecutar el servidor**
 ```
  nodemon server
 ```  
6.**Abrir en el navegador**
 ```
  http://localhost:3000
 ```
---

## 💻 Uso

Completa el formulario para registrar un curso nuevo.

Usa los botones ✏️ Editar y 🗑️ Eliminar directamente desde la tabla.

SweetAlert2 muestra confirmaciones y mensajes visuales para cada acción.


  

