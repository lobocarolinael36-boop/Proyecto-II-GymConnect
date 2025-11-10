// src/models/ProfesorRequest.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const ProfesorRequest = sequelize.define('ProfesorRequest', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false

  },
  email_personal: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  telefono: {
    type: DataTypes.STRING,
    allowNull: true
  },
  mensaje: {
    type: DataTypes.TEXT,
    allowNull: true
  },
  estado: {
    type: DataTypes.ENUM('pendiente', 'aprobada', 'rechazada'),
    defaultValue: 'pendiente'
  },
  email_generado: {
    type: DataTypes.STRING,
    allowNull: true
  },
  token_activacion: {
    type: DataTypes.STRING,
    allowNull: true
  },
  fecha_solicitud: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  fecha_respuesta: {
    type: DataTypes.DATE,
    allowNull: true
  }
}, {
  tableName: 'solicitudes_profesor',
  timestamps: true
});

export default ProfesorRequest;
