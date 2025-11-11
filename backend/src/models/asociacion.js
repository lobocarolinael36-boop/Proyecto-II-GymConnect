// src/models/associations.js
import User from './User.js';
import Class from './Class.js';
import Enrollment from './Enrollment.js';

// Definir relaciones
User.belongsToMany(Class, { through: Enrollment, foreignKey: 'usuario_id' });
Class.belongsToMany(User, { through: Enrollment, foreignKey: 'clase_id' });
Enrollment.belongsTo(User, { foreignKey: 'usuario_id' });
Enrollment.belongsTo(Class, { foreignKey: 'clase_id' });
