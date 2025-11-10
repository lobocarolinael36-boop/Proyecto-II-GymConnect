// frontend/src/pages/Classes.jsx
import { useState, useEffect } from 'react';
import { classesAPI } from '../services/api';
import ClassCard from '../components/ClassCard';
import Navbar from '../components/Navbar';

const Classes = () => {
  const [classes, setClasses] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    loadClasses();
  }, []);

  const loadClasses = async () => {
    try {
      setLoading(true);
      const response = await classesAPI.getAll();
      setClasses(response.data);
    } catch (err) {
      setError('Error cargando las clases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0', fontSize: '1.2rem' }}>
        Cargando clases...
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ff4444', fontSize: '1.2rem' }}>
        {error}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        <div style={{ marginBottom: '2rem', borderBottom: '2px solid #00ff87', paddingBottom: '1rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Clases Disponibles</h1>
        </div>

        {classes.length === 0 ? (
          <div style={{
            background: '#161616',
            borderRadius: '1rem',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #2a2a2a'
          }}>
            <p style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>
              No hay clases disponibles por el momento
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {classes.map((clase) => (
              <ClassCard
                key={clase.id}
                clase={clase}
                onEnroll={loadClasses}
                onUpdate={loadClasses}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Classes;
