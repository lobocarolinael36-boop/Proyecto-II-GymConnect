// src/routes/profesor.routes.js
import express from 'express';
import ProfesorRequest from '../models/ProfesorRequest.js';
import User from '../models/User.js';
import crypto from 'crypto';
import { enviarEmailAprobacion } from '../config/email.js'; // NUEVO

const router = express.Router();

// Crear solicitud de profesor
router.post('/solicitar', async (req, res) => {
  try {
    const { nombre, email_personal, telefono, mensaje } = req.body;

    const existingSolicitud = await ProfesorRequest.findOne({ 
      where: { email_personal } 
    });

    if (existingSolicitud) {
      return res.status(400).json({ 
        error: 'Ya existe una solicitud con este email' 
      });
    }

    const solicitud = await ProfesorRequest.create({
      nombre,
      email_personal,
      telefono,
      mensaje
    });

    res.json({ 
      success: true, 
      message: 'Solicitud enviada exitosamente. Recibirás una respuesta pronto.',
      solicitud 
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error enviando solicitud' });
  }
});

// Obtener todas las solicitudes (solo admin)
router.get('/', async (req, res) => {
  try {
    const solicitudes = await ProfesorRequest.findAll({
      order: [['fecha_solicitud', 'DESC']]
    });
    res.json(solicitudes);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo solicitudes' });
  }
});

// Aprobar solicitud (solo admin) - CON ENVÍO DE EMAIL
router.post('/:id/aprobar', async (req, res) => {
  try {
    const solicitud = await ProfesorRequest.findByPk(req.params.id);
    
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    if (solicitud.estado !== 'pendiente') {
      return res.status(400).json({ error: 'Esta solicitud ya fue procesada' });
    }

    // Generar email corporativo
    const nombreLimpio = solicitud.nombre.toLowerCase().replace(/\s+/g, '');
    const emailCorporativo = `${nombreLimpio}.profesor@gymconnect.com`;
    
    // Generar token de activación
    const token = crypto.randomBytes(32).toString('hex');

    // Crear contraseña temporal
    const passwordTemporal = crypto.randomBytes(8).toString('hex');

    // Crear usuario
    const usuario = await User.create({
      nombre: solicitud.nombre,
      email: emailCorporativo,
      password: passwordTemporal,
      rol: 'profesor',
      telefono: solicitud.telefono
    });

    // Actualizar solicitud
    await solicitud.update({
      estado: 'aprobada',
      email_generado: emailCorporativo,
      token_activacion: token,
      fecha_respuesta: new Date()
    });

    // ENVIAR EMAIL (NUEVO)
    try {
      await enviarEmailAprobacion({
        nombre: solicitud.nombre,
        email_personal: solicitud.email_personal,
        email_corporativo: emailCorporativo,
        password_temporal: passwordTemporal
      });

      res.json({
        success: true,
        message: 'Solicitud aprobada y email enviado exitosamente',
        datos_profesor: {
          email_corporativo: emailCorporativo,
          email_personal: solicitud.email_personal,
          mensaje: 'Se ha enviado un email al profesor con sus credenciales'
        }
      });

    } catch (emailError) {
      console.error('Error enviando email:', emailError);
      
      // Aunque falle el email, la cuenta se creó
      res.json({
        success: true,
        message: 'Solicitud aprobada pero hubo un error enviando el email',
        datos_profesor: {
          email_corporativo: emailCorporativo,
          password_temporal: passwordTemporal,
          email_personal: solicitud.email_personal,
          advertencia: 'Deberás compartir estas credenciales manualmente'
        }
      });
    }

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error aprobando solicitud' });
  }
});

// Rechazar solicitud (solo admin)
router.post('/:id/rechazar', async (req, res) => {
  try {
    const solicitud = await ProfesorRequest.findByPk(req.params.id);
    
    if (!solicitud) {
      return res.status(404).json({ error: 'Solicitud no encontrada' });
    }

    await solicitud.update({
      estado: 'rechazada',
      fecha_respuesta: new Date()
    });

    res.json({ success: true, message: 'Solicitud rechazada' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error rechazando solicitud' });
  }
});

export default router;
