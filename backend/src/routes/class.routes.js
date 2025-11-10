// src/routes/class.routes.js
import express from 'express';
import Class from '../models/Class.js';

const router = express.Router();

// Obtener todas las clases
router.get('/', async (req, res) => {
  try {
    const clases = await Class.findAll({
      order: [['horario', 'ASC']]
    });
    res.json(clases);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo clases' });
  }
});

// Obtener una clase
router.get('/:id', async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }
    res.json(clase);
  } catch (error) {
    res.status(500).json({ error: 'Error obteniendo clase' });
  }
});

// Crear clase
router.post('/', async (req, res) => {
  try {
    const { nombre, descripcion, horario, duracion_minutos, cupos_maximos, instructor_id, imagen } = req.body;
    
    if (!nombre || !horario || !cupos_maximos || !instructor_id) {
      return res.status(400).json({ error: 'Faltan campos requeridos' });
    }

    const clase = await Class.create({
      nombre,
      descripcion,
      horario,
      duracion_minutos: duracion_minutos || 60,
      cupos_maximos,
      cupos_disponibles: cupos_maximos,
      instructor_id,
      imagen: imagen || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
    });

    res.json(clase);
  } catch (error) {
    res.status(500).json({ error: 'Error creando clase' });
  }
});

// Actualizar clase
router.put('/:id', async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    await clase.update(req.body);
    res.json(clase);
  } catch (error) {
    res.status(500).json({ error: 'Error actualizando clase' });
  }
});

// NUEVO: Toggle estado de clase (para profesores)
router.patch('/:id/toggle-estado', async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    const nuevoEstado = clase.estado === 'activa' ? 'cancelada' : 'activa';
    await clase.update({ estado: nuevoEstado });
    
    res.json({ 
      success: true, 
      message: `Clase ${nuevoEstado === 'activa' ? 'activada' : 'desactivada'} exitosamente`,
      clase 
    });
  } catch (error) {
    res.status(500).json({ error: 'Error cambiando estado de clase' });
  }
});

// Eliminar clase
router.delete('/:id', async (req, res) => {
  try {
    const clase = await Class.findByPk(req.params.id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    await clase.destroy();
    res.json({ message: 'Clase eliminada exitosamente' });
  } catch (error) {
    res.status(500).json({ error: 'Error eliminando clase' });
  }
});

export default router;
