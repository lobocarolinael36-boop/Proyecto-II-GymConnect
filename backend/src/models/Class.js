// src/models/Class.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Class = sequelize.define('Class', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING(100),
    allowNull: false
  },
  descripcion: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  horario: {
    type: DataTypes.DATE,
    allowNull: false
  },
  duracion_minutos: {
    type: DataTypes.INTEGER,
    defaultValue: 60
  },
  cupos_maximos: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cupos_disponibles: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  instructor_id: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  estado: {
    type: DataTypes.ENUM('activa', 'cancelada', 'completa'),
    defaultValue: 'activa'
  },
  imagen: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'
  }
}, {
  tableName: 'clases',
  timestamps: true
});

export default Class;
