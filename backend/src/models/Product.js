import { DataTypes } from 'sequelize';
import sequelize from '../config/initbd.js';

const Product = sequelize.define('Product', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  nombre: { type: DataTypes.STRING, allowNull: false },
  descripcion: { type: DataTypes.STRING },
  precio: { type: DataTypes.FLOAT, allowNull: false },
  imagen: { type: DataTypes.STRING },
}, {
  tableName: 'productos',
  timestamps: true
});

export default Product;
