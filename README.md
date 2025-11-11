# Proyecto-II-GymConnect

GymConnect: Sistema de gestión de gimnasio con autenticación de usuarios, gestión de clases, tienda integrada y perfiles personalizados. Desarrollado con React y Node.js como parte de la materia Proyecto II.

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

GymConnect es un sistema de gestión integral para gimnasios que permite a los miembros gestionar su perfil, visualizar clases disponibles y reservar cupos. El sistema contempla diferentes roles de usuario (administrador, entrenador y cliente) con permisos específicos para cada uno. Incluye una tienda integrada y un sistema robusto de persistencia de datos.

---

## Stack Tecnológico

### Frontend
- React 18.3.1
- Vite 5.4.10
- React Router DOM 7.0.1
- Axios para peticiones HTTP
- CSS personalizado con diseño responsive

### Backend
- Node.js con Express 4.21.2
- Sequelize 6.37.5 (ORM)
- SQLite (desarrollo local con persistencia real)
- CORS para peticiones cross-origin
- Dotenv para manejo de variables de entorno
- Nodemailer para envío de emails

---

## Características Principales

### Módulos Implementados

- **Autenticación de Usuarios:** Sistema de registro y login con validación y seguridad.
- **Gestión de Perfiles:** Los usuarios pueden ver y editar su información personal.
- **Sistema de Roles:** Diferenciación entre administrador, entrenador y cliente con permisos en backend y frontend.
- **Gestión de Clases:** Visualización, creación y eliminación de clases, con control de cupos y horarios.
- **Inscripción a Clases:** Los clientes pueden inscribirse y desinscribirse de clases disponibles.
- **Dashboard Personalizado:** Panel de control con información relevante según el rol del usuario.
- **Panel de Administración:** Gestión y eliminación de usuarios, cambio de roles y aprobación de solicitudes para profesores.
- **Sistema de Solicitudes de Profesor:** Los usuarios pueden solicitar ser profesores, con aprobación por admin y envío automático de emails.
- **Tienda Integrada:** Catálogo de productos con interfaz clara y funcional.
- **Persistencia Completa:** Datos guardados en SQLite que no se pierden tras cerrar sesión o reiniciar.
- **Generación Automática de Emails:** El sistema genera automáticamente emails corporativos para nuevos profesores.
- **Favicon Personalizado:** Logo del proyecto en todas las pestañas del navegador.
- **Diseño Responsive:** Interfaz moderna y adaptable a diferentes dispositivos.

---

## Estructura del Proyecto
<img width="375" height="469" alt="image" src="https://github.com/user-attachments/assets/a802afd8-833c-4a02-8a8d-83bd5a836d63" />


