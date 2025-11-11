import express from 'express';
import Product from '../models/Product.js';

const router = express.Router();

// Obtener productos
router.get('/productos', async (req, res) => {
  const productos = await Product.findAll();
  res.json(productos);
});

// Comprar producto (solo usuario logeado)
router.post('/comprar/:id', async (req, res) => {
  const { id } = req.params;
  const producto = await Product.findByPk(id);
  if (!producto) return res.status(404).json({ error: 'Producto no encontrado' });
  // Lógica sencilla de compra
  res.json({ success: true, message: `Compraste ${producto.nombre} por $${producto.precio}` });
});

export default router;
