// src/models/User.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const User = sequelize.define('User', {
  id: { 
    type: DataTypes.INTEGER, 
    primaryKey: true, 
    autoIncrement: true 
  },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  email: { 
    type: DataTypes.STRING, 
    allowNull: false, 
    unique: true 
  },
  password: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  rol: { 
    type: DataTypes.ENUM('admin', 'profesor', 'cliente'), 
    defaultValue: 'cliente' 
  },
  telefono: { 
    type: DataTypes.STRING, 
    allowNull: true 
  }
}, {
  tableName: 'usuarios',
  timestamps: true
});

export default User;
