// src/config/database.js
import { Sequelize } from 'sequelize';

const sequelize = new Sequelize(
  'gymconnect',     // Nombre de tu base de datos
  'root',           // Usuario de MySQL
  '',    // Contraseña
  {
    host: 'localhost',
    dialect: 'mysql',
    logging: false,
    define: {
      freezeTableName: true
    }
  }
);

export default sequelize;
