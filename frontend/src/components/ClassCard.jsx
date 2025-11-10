// frontend/src/components/ClassCard.jsx
import { useState } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { enrollmentAPI, classesAPI } from '../services/api';

const ClassCard = ({ clase, onEnroll, showEnrollButton = true, onUpdate }) => {
  const { user } = useAuth();
  const [loading, setLoading] = useState(false);

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

  const getEstadoBadge = (estado) => {
    const badges = {
      activa: { bg: '#c6f6d5', color: '#22543d', text: '✓ Activa' },
      cancelada: { bg: '#fed7d7', color: '#742a2a', text: '✗ Cancelada' },
      completa: { bg: '#e2e8f0', color: '#2d3748', text: '■ Completa' }
    };
    const badge = badges[estado] || badges.activa;
    
    return (
      <span style={{
        backgroundColor: badge.bg,
        color: badge.color,
        padding: '4px 8px',
        borderRadius: '4px',
        fontSize: '12px',
        fontWeight: 'bold'
      }}>
        {badge.text}
      </span>
    );
  };

  const handleEnroll = async () => {
    if (!user) return;
    
    setLoading(true);
    try {
      await enrollmentAPI.enroll({
        usuario_id: user.id,
        clase_id: clase.id
      });
      
      if (onEnroll) {
        onEnroll(clase.id);
      }
      
      alert('¡Inscripción exitosa!');
    } catch (error) {
      console.error('Error al inscribirse:', error);
      alert(error.response?.data?.error || 'Error al inscribirse');
    } finally {
      setLoading(false);
    }
  };

  const handleToggleEstado = async () => {
    setLoading(true);
    try {
      await classesAPI.toggleEstado(clase.id);
      alert(`Clase ${clase.estado === 'activa' ? 'desactivada' : 'activada'} exitosamente`);
      if (onUpdate) {
        onUpdate();
      }
    } catch (error) {
      console.error('Error al cambiar estado:', error);
      alert('Error al cambiar el estado de la clase');
    } finally {
      setLoading(false);
    }
  };

  const disponibilidadPorcentaje = (clase.cupos_disponibles / clase.cupos_maximos) * 100;
  const disponibilidadColor = 
    disponibilidadPorcentaje > 50 ? '#00ff87' :
    disponibilidadPorcentaje > 20 ? '#ffd700' : 
    '#ff4444';

  return (
    <div style={{
      background: '#161616',
      borderRadius: '1rem',
      overflow: 'hidden',
      boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
      border: '1px solid #2a2a2a',
      transition: 'all 0.3s ease'
    }}>
      {/* Imagen de la clase */}
      <div style={{
        height: '200px',
        backgroundImage: `url(${clase.imagen || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=600&h=400&fit=crop'})`,
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        position: 'relative'
      }}>
        <div style={{
          position: 'absolute',
          top: '1rem',
          right: '1rem'
        }}>
          {getEstadoBadge(clase.estado)}
        </div>
        <div style={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          background: 'linear-gradient(to top, rgba(0, 0, 0, 0.9), transparent)',
          padding: '1.5rem',
          color: 'white'
        }}>
          <h3 style={{ fontSize: '1.5rem', margin: 0, fontWeight: 'bold' }}>{clase.nombre}</h3>
        </div>
      </div>

      {/* Info de la clase */}
      <div style={{ padding: '1.5rem' }}>
        {clase.descripcion && (
          <p style={{ color: '#a0a0a0', marginBottom: '1rem', fontSize: '0.9rem' }}>
            {clase.descripcion}
          </p>
        )}

        <div style={{ marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00ff87' }}>📅</span>
            <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
              {formatDate(clase.horario)}
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span style={{ color: '#00ff87' }}>⏱️</span>
            <span style={{ color: '#ffffff', fontSize: '0.9rem' }}>
              {clase.duracion_minutos} minutos
            </span>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ color: '#00ff87' }}>👥</span>
            <span style={{ color: disponibilidadColor, fontWeight: 'bold', fontSize: '0.9rem' }}>
              {clase.cupos_disponibles}/{clase.cupos_maximos} disponibles
            </span>
          </div>
        </div>

        {/* Botones */}
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {/* Botón para profesor */}
          {user?.rol === 'profesor' && (
            <button
              onClick={handleToggleEstado}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: clase.estado === 'activa' ? '#ff4444' : '#00ff87',
                color: clase.estado === 'activa' ? 'white' : '#0a0a0a',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Procesando...' : (clase.estado === 'activa' ? 'Desactivar' : 'Activar')}
            </button>
          )}

          {/* Botón de inscripción para clientes */}
          {showEnrollButton && user?.rol !== 'profesor' && clase.estado === 'activa' && clase.cupos_disponibles > 0 && (
            <button
              onClick={handleEnroll}
              disabled={loading}
              style={{
                flex: 1,
                padding: '12px',
                backgroundColor: loading ? '#ccc' : '#00ff87',
                color: loading ? '#666' : '#0a0a0a',
                border: 'none',
                borderRadius: '8px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: 'bold'
              }}
            >
              {loading ? 'Inscribiendo...' : 'Inscribirse'}
            </button>
          )}
        </div>

        {clase.cupos_disponibles === 0 && user?.rol !== 'profesor' && (
          <div style={{
            backgroundColor: '#fed7d7',
            color: '#742a2a',
            padding: '12px',
            borderRadius: '8px',
            textAlign: 'center',
            marginTop: '1rem',
            fontWeight: 'bold'
          }}>
            Clase llena
          </div>
        )}
      </div>
    </div>
  );
};

export default ClassCard;
