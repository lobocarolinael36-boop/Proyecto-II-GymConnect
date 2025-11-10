// src/routes/admin.routes.js
import express from 'express';
import User from '../models/User.js';
import { Op } from 'sequelize';

const router = express.Router();

// Buscar usuarios por nombre
router.get('/usuarios/buscar', async (req, res) => {
  try {
    const { q } = req.query;

    if (!q || q.trim().length < 2) {
      return res.status(400).json({ 
        error: 'La búsqueda debe tener al menos 2 caracteres' 
      });
    }

    const usuarios = await User.findAll({
      where: {
        [Op.or]: [
          { nombre: { [Op.like]: `%${q}%` } },
          { email: { [Op.like]: `%${q}%` } }
        ]
      },
      attributes: ['id', 'nombre', 'email', 'rol', 'telefono', 'createdAt'],

    });

    res.json(usuarios);

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error buscando usuarios' });
  }
});

// Obtener todos los usuarios
router.get('/usuarios', async (req, res) => {
  try {
    const usuarios = await User.findAll({
      attributes: ['id', 'nombre', 'email', 'rol', 'telefono', 'createdAt'],
      order: [['createdAt', 'DESC']]
    });

    res.json(usuarios);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error obteniendo usuarios' });
  }
});

// Cambiar rol de usuario
router.patch('/usuarios/:id/cambiar-rol', async (req, res) => {
  try {
    const { rol } = req.body;
    
    if (!['admin', 'profesor', 'cliente'].includes(rol)) {
      return res.status(400).json({ error: 'Rol inválido' });
    }

    const usuario = await User.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    await usuario.update({ rol });

    res.json({ 
      success: true, 
      message: `Rol cambiado a ${rol} exitosamente`,
      usuario
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error cambiando rol' });
  }
});

// Eliminar usuario
router.delete('/usuarios/:id', async (req, res) => {
  try {
    const usuario = await User.findByPk(req.params.id);
    
    if (!usuario) {
      return res.status(404).json({ error: 'Usuario no encontrado' });
    }

    // No permitir eliminar admins
    if (usuario.rol === 'admin') {
      return res.status(403).json({ error: 'No se puede eliminar un administrador' });
    }

    await usuario.destroy();

    res.json({ success: true, message: 'Usuario eliminado exitosamente' });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error eliminando usuario' });
  }
});

export default router;
