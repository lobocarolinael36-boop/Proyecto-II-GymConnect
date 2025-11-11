import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import sequelize from './src/config/initbd.js';
import cors from 'cors';
import User from './src/models/User.js';
import Class from './src/models/Class.js';
import Enrollment from './src/models/Enrollment.js';
import ProfesorRequest from './src/models/ProfesorRequest.js';
import authRoutes from './src/routes/auth.routes.js';
import classRoutes from './src/routes/class.routes.js';
import enrollmentRoutes from './src/routes/enrollment.routes.js';
import profesorRoutes from './src/routes/profesor.routes.js';
import adminRoutes from './src/routes/admin.routes.js';
import shopRoutes from './src/routes/shop.routes.js';
import './src/models/asociacion.js';

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

app.get('/api/test', (req, res) => {
  res.json({ message: '🎉 Backend funcionando!', timestamp: new Date() });
});

app.use('/api/auth', authRoutes);
app.use('/api/clases', classRoutes);
app.use('/api/inscripciones', enrollmentRoutes);
app.use('/api/profesor', profesorRoutes);
app.use('/api/admin', adminRoutes);
app.use('/api/shop', shopRoutes);

const initDB = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a SQLite');

    let admin, profesor;

    try {
      admin = await User.create({
        nombre: 'Admin',
        email: 'admin@gymconnect.com',
        password: 'admin123',
        rol: 'admin'
      });
      console.log('✅ Usuario admin creado');
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        admin = await User.findOne({ where: { email: 'admin@gymconnect.com' } });
        console.log('ℹ️  Admin ya existe, omitido');
      } else {
        throw err;
      }
    }

    try {
      profesor = await User.create({
        nombre: 'Carlos Profesor',
        email: 'carlos.profesor@gymconnect.com',
        password: 'profesor123',
        rol: 'profesor',
        telefono: '3516789012'
      });
      console.log('✅ Usuario profesor creado');
    } catch (err) {
      if (err.name === 'SequelizeUniqueConstraintError') {
        profesor = await User.findOne({ where: { email: 'carlos.profesor@profesor.gymconnect.com' } });
        console.log('ℹ️  Profesor ya existe, omitido');
      } else {
        throw err;
      }
    }

    const clasesExisten = await Class.count();

    if (clasesExisten === 0 && profesor) {
      await Class.bulkCreate([
        { nombre: 'Boxeo Principiantes', descripcion: 'Clase de boxeo para principiantes, aprende las técnicas básicas', horario: new Date('2025-11-15T09:00:00'), duracion_minutos: 60, cupos_maximos: 15, cupos_disponibles: 15, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop' },
        { nombre: 'Boxeo Avanzado', descripcion: 'Entrenamiento intensivo de boxeo para nivel avanzado', horario: new Date('2025-11-15T18:00:00'), duracion_minutos: 75, cupos_maximos: 12, cupos_disponibles: 12, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1549719386-74dfcbf7dbed?w=600&h=400&fit=crop' },
        { nombre: 'Jiu Jitsu Brasileño', descripcion: 'Arte marcial y sistema de defensa personal', horario: new Date('2025-11-16T19:00:00'), duracion_minutos: 90, cupos_maximos: 20, cupos_disponibles: 18, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1555597673-b21d5c935865?w=600&h=400&fit=crop' },
        { nombre: 'Entrenamiento Funcional', descripcion: 'Ejercicios funcionales para mejorar fuerza y resistencia', horario: new Date('2025-11-17T07:00:00'), duracion_minutos: 45, cupos_maximos: 25, cupos_disponibles: 22, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop' },
        { nombre: 'Yoga Matutino', descripcion: 'Sesión de yoga relajante para comenzar el día', horario: new Date('2025-11-17T08:00:00'), duracion_minutos: 60, cupos_maximos: 20, cupos_disponibles: 15, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop' },
        { nombre: 'Kickboxing', descripcion: 'Combina técnicas de boxeo y patadas para un entrenamiento completo', horario: new Date('2025-11-17T17:00:00'), duracion_minutos: 60, cupos_maximos: 18, cupos_disponibles: 16, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1605296867304-46d5465a13f1?w=600&h=400&fit=crop' },
        { nombre: 'Pilates', descripcion: 'Fortalece el core y mejora la flexibilidad', horario: new Date('2025-11-18T10:00:00'), duracion_minutos: 50, cupos_maximos: 15, cupos_disponibles: 12, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1518611012118-696072aa579a?w=600&h=400&fit=crop' },
        { nombre: 'CrossFit', descripcion: 'Entrenamiento de alta intensidad con ejercicios variados', horario: new Date('2025-11-18T18:30:00'), duracion_minutos: 60, cupos_maximos: 20, cupos_disponibles: 20, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop' },
        { nombre: 'Spinning', descripcion: 'Clase de ciclismo indoor con música motivadora', horario: new Date('2025-11-19T09:30:00'), duracion_minutos: 45, cupos_maximos: 25, cupos_disponibles: 23, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1517836357463-d25dfeac3438?w=600&h=400&fit=crop' },
        { nombre: 'Yoga Nocturno', descripcion: 'Sesión de yoga relajante para terminar el día', horario: new Date('2025-11-19T20:00:00'), duracion_minutos: 75, cupos_maximos: 15, cupos_disponibles: 10, instructor_id: profesor.id, estado: 'activa', imagen: 'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?w=600&h=400&fit=crop' }
      ]);
      console.log('✅ Clases creadas');
    } else if (clasesExisten > 0) {
      console.log('ℹ️  Clases ya existen, omitidas');
    }

    console.log('='.repeat(50));
    console.log('📧 Credenciales de acceso:');
    console.log('   Admin: admin@gymconnect.com / admin123');
    console.log('   Profesor: carlos.profesor@gymconnect.com / profesor123');
    console.log('='.repeat(50));

  } catch (error) {
    console.error('❌ Error con la BD:', error.message);
  }
};

app.listen(PORT, async () => {
  await initDB();
  console.log(`🚀 Backend en http://localhost:${PORT}`);
});
