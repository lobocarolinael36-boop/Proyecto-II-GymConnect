// src/models/Enrollment.js
import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';
import User from './User.js';
import Class from './Class.js';

const Enrollment = sequelize.define('Enrollment', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  usuario_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: User,
      key: 'id'
    }
  },
  clase_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Class,
      key: 'id'
    }
  },
  fecha_inscripcion: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  estado: {
    type: DataTypes.ENUM('inscrito', 'cancelado', 'asistio', 'no_asistio'),
    defaultValue: 'inscrito'
  }
}, {
  tableName: 'inscripciones',
  timestamps: true,
  indexes: [
    {
      unique: true,
      fields: ['usuario_id', 'clase_id']
    }
  ]
});

// Definir relaciones
User.belongsToMany(Class, { through: Enrollment, foreignKey: 'usuario_id' });
Class.belongsToMany(User, { through: Enrollment, foreignKey: 'clase_id' });
Enrollment.belongsTo(User, { foreignKey: 'usuario_id' });
Enrollment.belongsTo(Class, { foreignKey: 'clase_id' });

export default Enrollment;
