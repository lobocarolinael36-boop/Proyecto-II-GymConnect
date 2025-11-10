# Proyecto-II-GymConnect

GymConnect: Sistema de gestión de gimnasio con autenticación de usuarios, gestión de clases y perfiles personalizados. Desarrollado con React y Node.js como parte de la materia Proyecto II.

---

Este proyecto es desarrollado por el grupo 5°1 como parte de la materia Proyecto II.

## Integrantes del Grupo

- Lautaro Palombo
- Carolina Lobo
- Lucas Haedo
- Thomas Barrera
- Santiago Lavorgnia

---

## Visión del Proyecto

GymConnect es un sistema de gestión integral para gimnasios que permite a los miembros gestionar su perfil, visualizar clases disponibles y reservar cupos. El sistema contempla diferentes roles de usuario (administrador, entrenador y cliente) con permisos específicos para cada uno.

---

## Stack Tecnológico

### Frontend
- React 18.3.1
- Vite 5.4.10
- React Router DOM 7.0.1
- Axios para peticiones HTTP

### Backend
- Node.js con Express 4.21.2
- Sequelize 6.37.5 (ORM)
- MySQL 8.x (antes SQLite en desarrollo)
- CORS para peticiones cross-origin
- Dotenv para manejo de variables de entorno

---

## Características Principales

### Módulos Implementados

- **Autenticación de Usuarios:** Sistema de registro y login con validación y cifrado básico.
- **Gestión de Perfiles:** Los usuarios pueden ver y editar su información personal.
- **Sistema de Roles:** Diferenciación entre administrador, entrenador y cliente con permisos en backend y frontend.
- **Gestión de Clases:** Visualización, creación y eliminación de clases, con control de cupos y horarios.
- **Dashboard Personalizado:** Panel de control con información relevante según el rol del usuario.
- **Panel de Administración:** Gestión y eliminación de usuarios, cambio de roles y aprobación de solicitudes para profesores.
- **Persistencia Completa:** Datos guardados en MySQL que no se pierden tras cerrar sesión o reiniciar.
- **Diseño Responsive:** Interfaz moderna y adaptable.
- **Gestión con MySQL:** Uso de XAMPP/MySQL Workbench para base de datos en desarrollo local.

---

## Estructura del Proyecto

- `/backend`: Servidor Express, Sequelize y MySQL
- `/frontend`: React + Vite + Axios + CSS personalizado
- `.env`: Variables de entorno para configuración (no se suben a GitHub)

---

## Instrucciones de Instalación

### Requisitos Previos
- Node.js (v16+)
- MySQL Server activo (puede ser XAMPP con MySQL Workbench)
- npm o yarn

### 1. Clonar el repositorio

git clone https://github.com/lobocarolinael36-boop/Proyecto-II-GymConnect.git
cd Proyecto-II-GymConnect


### 2. Configurar Backend

cd backend
npm install

Crear un archivo `.env` con tus credenciales MySQL:
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=tu_contraseña
DB_NAME=gymconnect



### 3. Configurar Frontend

cd ../frontend
npm install



---

## Ejecución del Proyecto

### Backend

cd backend
npm run dev



### Frontend

cd frontend
npm run dev



El frontend corre en `http://localhost:5173`.

---

## API Endpoints Principales

### Autenticación
- `POST /api/auth/register` - Registrar nuevo usuario
- `POST /api/auth/login` - Iniciar sesión
- `GET /api/auth/profile` - Obtener perfil (requiere login)
- `PUT /api/auth/profile` - Actualizar perfil
- `PUT /api/auth/password` - Cambiar contraseña
- `DELETE /api/auth/account` - Eliminar cuenta

### Clases
- `GET /api/clases` - Obtener todas las clases
- `GET /api/clases/:id` - Obtener clase por ID
- `POST /api/clases` - Crear nueva clase (solo profesores/admin)
- `GET /api/instructores/:id/clases` - Obtener clases por instructor

### Administración
- `GET /api/admin/usuarios` - Obtener lista de usuarios (clientes, profesores)
- `PATCH /api/admin/usuarios/:id/cambiar-rol` - Cambiar rol de usuario
- `DELETE /api/admin/usuarios/:id` - Eliminar usuario
- `GET /api/admin/solicitudes` - Obtener solicitudes para ser profesor
- `PATCH /api/admin/solicitudes/:id/aprobar` - Aprobar solicitud
- `PATCH /api/admin/solicitudes/:id/rechazar` - Rechazar solicitud

---

## Usuarios de Prueba

Al iniciar backend se crea automáticamente

- Admin:
   - Email: `admin@gymconnect.com`
   - Pass: `admin123`

- Profesor de ejemplo:
   - Email: `carlos.profesor@profesor.gymconnect.com`
   - Pass: `profesor123`

---

## Mejoras Realizadas

- Base Mysql con persistencia real en lugar de SQLite.
- Panel administrador funcional para ver, cambiar rol y eliminar usuarios.
- Soporte completo para distintos roles: admin, profesor, cliente.
- Carrusel frontend con imágenes locales y externas.
- Logout, registro y edición de perfil funcionando.
- Backend robusto con rutas seguras y fáciles de mantener.

---

## Próximas Mejoras

- Sistema de reserva e inscripción a clases.
- Notificaciones y feed social.
- Tienda en línea integrada.
- Logros y gamificación.

---

## Licencia

Proyecto 100% educativo para Proyecto II.

---

## Contacto

Grupo 5°1 - Proyecto II.

[GitHub Repo](https://github.com/lobocarolinael36-boop/Proyecto-II-GymConnect)

---

¡Gracias por usar GymConnect!