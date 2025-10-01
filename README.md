# Proyecto-II-GymConnect 
GymConnect: Plataforma Web Full Stack que transforma un gimnasio en una Red Social Fitness. Permite a los miembros reservar clases, gestionar perfiles, interactuar con un feed de actividad y comprar productos online. Desarrollado en React y Node.js

---

Este proyecto es desarrollado por el grupo 5°1 como parte de la materia Proyecto II.

🧑‍💻 Integrantes del Grupo
Lautaro Palombo
Carolina Lobo
Lucas Haedo
Thomas Barrera
Santiago Lavorgnia 

---

## 💡 Visión del Proyecto
GymConnect va más allá de un simple sistema de gestión. Buscamos crear un ecosistema donde los miembros puedan gestionar su progreso, reservar clases, comprar productos y, lo más importante, interactuar en un Feed Social dedicado a la comunidad del gimnasio. &emsp;

Stack Tecnológico Propuesto 

<img width="624" height="178" alt="image" src="https://github.com/user-attachments/assets/c693718b-8a5b-468b-853e-edcc407fe86d" />

---

## 📋 Primera Etapa: Modelado y Requerimientos
Esta sección resume el análisis y diseño de la Primera Etapa, sentando las bases de la arquitectura del sistema.

### Requerimientos Funcionales (RF) Destacados
El sistema contempla módulos clave de la aplicación, incluyendo:

- Autenticación Segura (RF001/RNF002): Registro, Login y uso de JWT con contraseñas Bcrypt.
- Tienda Online (RF004-RF006): Catálogo de productos, Carrito persistente y gestión de órdenes.
- Gestión (RF003/RF007): Panel de Administración para CRUD de Usuarios y Productos.
- Social & Clases (RF008-RF010): Reserva de clases, Feed de actividad y sistema de Gamificación (Logros).

### Requerimientos No Funcionales (RNF)
El diseño prioriza la Seguridad (JWT, Bcrypt), la Usabilidad (responsive) y el Rendimiento (API < 2 segundos).

Limitaciones Definidas
Para la entrega funcional inicial, se establece que:
- La Pasarela de Pago real (MercadoPago/Stripe) se simulará.
- Las notificaciones en tiempo real (Socket.io) y App Mobile se consideran bonus para etapas posteriores.

---

## 📐 Diseño y Modelado (UML & ERD)
Los diagramas visuales y el diccionario de datos documentan la estructura del sistema.

Diagramas y Documentación
<img width="622" height="289" alt="image" src="https://github.com/user-attachments/assets/636bdbed-b14e-4d75-9322-0c584fc526c2" />

---

🔗 Enlace a DRAW.io
Para visualizar la evolución y el detalle del diagrama UML:
https://drive.google.com/file/d/1WqgAtTloJcbxYR5xUaBG8VL7pSZQSKUS/view?usp=drive_link

⚙️ Instrucciones de Instalación (Próxima Etapa)
En esta sección se detallarán los pasos para clonar el repositorio e iniciar el backend y el frontend una vez que comience la fase de codificación.

# 1. Clonar el repositorio
git clone https://aws.amazon.com/es/what-is/repo/
cd gym-connect-app

# 2. Configurar el Backend (En el futuro)
cd backend
npm install
# ... (Instrucciones para la configuración del .env y la BD)

# 3. Configurar el Frontend (En el futuro)
cd ../frontend
npm install
# ...
