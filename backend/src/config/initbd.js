// src/config/initbd.js
import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ SQLite - base de datos en archivo local
const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: path.join(__dirname, '../../database.sqlite'), // Archivo en la raíz del proyecto
  logging: false,
  define: {
    freezeTableName: true
  }
});

// Función para inicializar la base de datos
export const initializeDatabase = async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Conectado a SQLite');
    
    await sequelize.sync({ force: false });
    console.log('✅ Tablas sincronizadas');
    
    return sequelize;
  } catch (error) {
    console.error('❌ Error inicializando base de datos:', error);
    throw error;
  }
};

// ✅ Exportar la instancia de sequelize para los modelos
export default sequelize;