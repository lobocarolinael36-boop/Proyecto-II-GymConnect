import { DataTypes } from 'sequelize';
import sequelize from '../config/initbd.js';

const Enrollment = sequelize.define('Enrollment', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  usuario_id: { type: DataTypes.INTEGER, allowNull: false },
  clase_id: { type: DataTypes.INTEGER, allowNull: false },
  fecha_inscripcion: { type: DataTypes.DATE, defaultValue: DataTypes.NOW },
  estado: { type: DataTypes.ENUM('inscrito', 'cancelado', 'asistio', 'no_asistio'), defaultValue: 'inscrito' }
}, {
  tableName: 'inscripciones',
  timestamps: true,
  indexes: [{ unique: true, fields: ['usuario_id', 'clase_id'] }]
});

export default Enrollment;
