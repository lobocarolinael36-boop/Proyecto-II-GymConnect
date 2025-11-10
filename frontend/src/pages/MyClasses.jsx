// frontend/src/pages/MyClasses.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { enrollmentAPI } from '../services/api';
import Navbar from '../components/Navbar';

const MyClasses = () => {
  const { user } = useAuth();
  const [enrollments, setEnrollments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (user) {
      loadMyClasses();
    }
  }, [user]);

  const loadMyClasses = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getMyClasses(user.id);
      setEnrollments(response.data);
    } catch (err) {
      setError('Error cargando tus clases');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const handleCancelEnrollment = async (enrollmentId) => {
    if (!window.confirm('¿Estás seguro que quieres cancelar esta inscripción?')) {
      return;
    }

    try {
      await enrollmentAPI.cancel(enrollmentId);
      alert('Inscripción cancelada exitosamente');
      loadMyClases();
    } catch (error) {
      console.error('Error cancelando inscripción:', error);
      alert('Error al cancelar la inscripción');
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-AR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (loading) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />
      <div style={{ padding: '2rem', textAlign: 'center', color: '#a0a0a0', fontSize: '1.2rem' }}>
        Cargando tus clases...
      </div>
    </div>
  );

  if (error) return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />
      <div style={{ padding: '2rem', textAlign: 'center', color: '#ff4444', fontSize: '1.2rem' }}>
        {error}
      </div>
    </div>
  );

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a' }}>
      <Navbar />
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem', borderBottom: '2px solid #00ff87', paddingBottom: '1rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>Mis Clases</h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>Clases en las que estás inscrito</p>
        </div>

        {enrollments.length === 0 ? (
          <div style={{
            background: '#161616',
            borderRadius: '1rem',
            padding: '3rem',
            textAlign: 'center',
            border: '1px solid #2a2a2a'
          }}>
            <h3 style={{ color: '#ffffff', fontSize: '1.5rem', marginBottom: '1rem' }}>
              No tienes clases registradas
            </h3>
            <p style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>
              Ve a la sección "Clases" para inscribirte en las clases disponibles
            </p>
          </div>
        ) : (
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))',
            gap: '2rem'
          }}>
            {enrollments.map((enrollment) => (
              <div
                key={enrollment.id}
                style={{
                  background: '#161616',
                  borderRadius: '1rem',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                  border: '1px solid #2a2a2a',
                  transition: 'all 0.3s ease'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = 'translateY(-5px)';
                  e.currentTarget.style.boxShadow = '0 8px 24px rgba(0, 255, 135, 0.2)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = 'translateY(0)';
                  e.currentTarget.style.boxShadow = '0 4px 16px rgba(0, 0, 0, 0.4)';
                }}
              >
                {/* Class Header */}
                <div style={{
                  background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                  padding: '1.5rem',
                  color: 'white'
                }}>
                  <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>
                    {enrollment.Class.nombre}
                  </h3>
                </div>

                {/* Class Info */}
                <div style={{ padding: '1.5rem' }}>
                  {enrollment.Class.descripcion && (
                    <p style={{ color: '#a0a0a0', marginBottom: '1rem', fontSize: '0.95rem' }}>
                      {enrollment.Class.descripcion}
                    </p>
                  )}

                  <div style={{ marginBottom: '1rem' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#00ff87' }}>📅</span>
                      <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                        {formatDate(enrollment.Class.horario)}
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
                      <span style={{ color: '#00ff87' }}>⏱️</span>
                      <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                        {enrollment.Class.duracion_minutos} minutos
                      </span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <span style={{ color: '#00ff87' }}>📊</span>
                      <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
                        Estado: <strong>{enrollment.Class.estado}</strong>
                      </span>
                    </div>
                  </div>

                  {/* Enrollment Info */}
                  <div style={{
                    background: '#1f1f1f',
                    borderRadius: '0.5rem',
                    padding: '1rem',
                    marginTop: '1rem',
                    border: '1px solid #2a2a2a'
                  }}>
                    <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      <strong style={{ color: '#00ff87' }}>Estado inscripción:</strong> {enrollment.estado}
                    </p>
                    <p style={{ color: '#a0a0a0', fontSize: '0.9rem', marginBottom: '1rem' }}>
                      <strong style={{ color: '#00ff87' }}>Inscrito:</strong>{' '}
                      {new Date(enrollment.fecha_inscripcion).toLocaleDateString('es-AR')}
                    </p>

                    {enrollment.estado === 'inscrito' && (
                      <button
                        onClick={() => handleCancelEnrollment(enrollment.id)}
                        style={{
                          width: '100%',
                          backgroundColor: '#ff4444',
                          color: 'white',
                          border: 'none',
                          padding: '0.75rem',
                          borderRadius: '0.5rem',
                          cursor: 'pointer',
                          fontSize: '0.95rem',
                          fontWeight: 'bold',
                          transition: 'all 0.3s ease'
                        }}
                        onMouseEnter={(e) => e.target.style.backgroundColor = '#ff2222'}
                        onMouseLeave={(e) => e.target.style.backgroundColor = '#ff4444'}
                      >
                        Cancelar Inscripción
                      </button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyClasses;
