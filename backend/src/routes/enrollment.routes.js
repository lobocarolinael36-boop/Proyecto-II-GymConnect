// src/routes/enrollment.routes.js
import express from 'express';
import Enrollment from '../models/Enrollment.js';
import Class from '../models/Class.js';
import User from '../models/User.js';

const router = express.Router();

// Inscribirse a una clase
router.post('/', async (req, res) => {
  try {
    const { usuario_id, clase_id } = req.body;

    const clase = await Class.findByPk(clase_id);
    if (!clase) {
      return res.status(404).json({ error: 'Clase no encontrada' });
    }

    if (clase.cupos_disponibles <= 0) {
      return res.status(400).json({ error: 'No hay cupos disponibles' });
    }

    const existingEnrollment = await Enrollment.findOne({
      where: { usuario_id, clase_id }
    });

    if (existingEnrollment) {
      return res.status(400).json({ error: 'Ya estás inscrito en esta clase' });
    }

    const enrollment = await Enrollment.create({
      usuario_id,
      clase_id,
      estado: 'inscrito'
    });

    await clase.update({
      cupos_disponibles: clase.cupos_disponibles - 1
    });

    res.json({
      success: true,
      message: 'Inscripción exitosa',
      enrollment
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error en la inscripción' });
  }
});

// Cancelar inscripción - ARREGLADO
router.delete('/:id', async (req, res) => {
  try {
    const enrollment = await Enrollment.findByPk(req.params.id);

    if (!enrollment) {
      return res.status(404).json({ error: 'Inscripción no encontrada' });
    }

    // Obtener la clase asociada
    const clase = await Class.findByPk(enrollment.clase_id);
    
    if (clase) {
      // Aumentar cupos disponibles
      await clase.update({
        cupos_disponibles: clase.cupos_disponibles + 1
      });
    }

    // Eliminar inscripción
    await enrollment.destroy();

    res.json({
      success: true,
      message: 'Inscripción cancelada exitosamente'
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error cancelando inscripción' });
  }
});

// Obtener mis clases (clases del usuario)
router.get('/user/:userId', async (req, res) => {
  try {
    const enrollments = await Enrollment.findAll({
      where: { usuario_id: req.params.userId },
      include: [{
        model: Class,
        attributes: ['id', 'nombre', 'descripcion', 'horario', 'duracion_minutos', 'estado', 'cupos_maximos', 'cupos_disponibles']
      }],
      order: [[Class, 'horario', 'ASC']]
    });

    res.json(enrollments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo las clases del usuario' });
  }
});

export default router;
