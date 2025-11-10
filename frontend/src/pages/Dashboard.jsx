// frontend/src/pages/Dashboard.jsx
import { useState, useEffect } from 'react';
import { useAuth } from '../contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { enrollmentAPI } from '../services/api';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { user } = useAuth();
  const navigate = useNavigate();
  const [myClassesCount, setMyClassesCount] = useState(0);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (user) {
      loadStats();
    }
  }, [user]);

  const loadStats = async () => {
    try {
      setLoading(true);
      const response = await enrollmentAPI.getMyClasses(user.id);
      setMyClassesCount(response.data.length);
    } catch (error) {
      console.error('Error cargando estadísticas:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
      <Navbar />
      <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '2rem' }}>
        {/* Header */}
        <div style={{ marginBottom: '2rem' }}>
          <h1 style={{
            fontSize: '2.5rem',
            fontWeight: 'bold',
            background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            marginBottom: '0.5rem'
          }}>Bienvenido a GymConnect</h1>
          <p style={{ color: '#a0a0a0', fontSize: '1.1rem' }}>Tu sistema de gestión de gimnasio</p>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '2rem' }}>
          {/* Info Personal - Sidebar */}
          <div style={{
            background: '#161616',
            borderRadius: '1rem',
            padding: '2rem',
            boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
            border: '1px solid #2a2a2a',
            position: 'relative',
            overflow: 'hidden',
            height: 'fit-content'
          }}>
            <div style={{
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '3px',
              background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)'
            }} />
            
            <h2 style={{
              color: '#00ff87',
              marginBottom: '1.5rem',
              fontSize: '1.3rem',
              fontWeight: 'bold'
            }}>Información Personal</h2>
            
            <div style={{ display: 'grid', gap: '1rem' }}>
              {[
                { label: 'Nombre', value: user?.nombre || 'Usuario' },
                { label: 'Email', value: user?.email },
                { label: 'Rol', value: user?.rol === 'admin' ? 'Administrador' : user?.rol === 'entrenador' ? 'Entrenador' : 'Cliente' },
                { label: 'Teléfono', value: user?.telefono || 'No especificado' }
              ].map((item, idx) => (
                <div key={idx} style={{
                  display: 'flex',
                  flexDirection: 'column',
                  gap: '0.25rem',
                  padding: '0.75rem 0',
                  borderBottom: idx < 3 ? '1px solid #2a2a2a' : 'none'
                }}>
                  <span style={{ fontWeight: '600', color: '#a0a0a0', fontSize: '0.85rem' }}>{item.label}</span>
                  <span style={{ color: '#ffffff', fontWeight: '500', fontSize: '1rem' }}>{item.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Main Content */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
            {/* Stats Cards */}
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1.5rem'
            }}>
              <div style={{
                background: '#161616',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                border: '1px solid #2a2a2a'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 255, 135, 0.1)',
                  borderRadius: '0.75rem'
                }}>
                  🏋️‍♀️
                </div>
                <div>
                  <h3 style={{
                    fontSize: '0.9rem',
                    color: '#a0a0a0',
                    marginBottom: '0.5rem'
                  }}>Clases Tomadas</h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    margin: 0
                  }}>{loading ? '-' : myClassesCount}</p>
                </div>
              </div>

              <div style={{
                background: '#161616',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                border: '1px solid #2a2a2a'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 255, 135, 0.1)',
                  borderRadius: '0.75rem'
                }}>
                  📅
                </div>
                <div>
                  <h3 style={{
                    fontSize: '0.9rem',
                    color: '#a0a0a0',
                    marginBottom: '0.5rem'
                  }}>Próximas Clases</h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    margin: 0
                  }}>-</p>
                </div>
              </div>

              <div style={{
                background: '#161616',
                borderRadius: '1rem',
                padding: '1.5rem',
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
                border: '1px solid #2a2a2a'
              }}>
                <div style={{
                  fontSize: '2.5rem',
                  width: '60px',
                  height: '60px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: 'rgba(0, 255, 135, 0.1)',
                  borderRadius: '0.75rem'
                }}>
                  🎯
                </div>
                <div>
                  <h3 style={{
                    fontSize: '0.9rem',
                    color: '#a0a0a0',
                    marginBottom: '0.5rem'
                  }}>Objetivos</h3>
                  <p style={{
                    fontSize: '2rem',
                    fontWeight: 'bold',
                    color: '#ffffff',
                    margin: 0
                  }}>-</p>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div style={{
              background: '#161616',
              borderRadius: '1rem',
              padding: '2rem',
              boxShadow: '0 4px 16px rgba(0, 0, 0, 0.4)',
              border: '1px solid #2a2a2a',
              position: 'relative',
              overflow: 'hidden'
            }}>
              <div style={{
                position: 'absolute',
                top: 0,
                left: 0,
                right: 0,
                height: '3px',
                background: 'linear-gradient(135deg, #00ff87 0%, #60efff 100%)'
              }} />
              
              <h2 style={{
                color: '#00ff87',
                marginBottom: '1.5rem',
                fontSize: '1.5rem',
                fontWeight: 'bold'
              }}>Acciones Rápidas</h2>
              
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
                gap: '1rem'
              }}>
                {[
                  { icon: '🏃‍♀️', title: 'Ver Clases', desc: 'Explorar e inscribirse en clases', path: '/classes' },
                  { icon: '📚', title: 'Mis Clases', desc: 'Ver clases en las que estoy inscrito', path: '/my-classes' },
                  { icon: '👤', title: 'Mi Perfil', desc: 'Ver y editar información personal', path: '/profile' },
                  ...(user?.rol === 'admin' ? [{ icon: '⚙️', title: 'Administración', desc: 'Panel de administrador', path: '#' }] : [])
                ].map((action, idx) => (
                  <button
                    key={idx}
                    onClick={() => navigate(action.path)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '1.5rem',
                      background: '#1f1f1f',
                      border: '1px solid #2a2a2a',
                      borderRadius: '0.75rem',
                      cursor: 'pointer',
                      transition: 'all 0.3s ease',
                      textAlign: 'left'
                    }}
                    className="action-btn-hover"
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = '#00ff87';
                      e.currentTarget.style.transform = 'translateY(-2px)';
                      e.currentTarget.style.boxShadow = '0 4px 15px rgba(0, 255, 135, 0.2)';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = '#2a2a2a';
                      e.currentTarget.style.transform = 'translateY(0)';
                      e.currentTarget.style.boxShadow = 'none';
                    }}
                  >
                    <div style={{
                      fontSize: '2rem',
                      width: '60px',
                      height: '60px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      background: 'rgba(0, 255, 135, 0.1)',
                      borderRadius: '0.75rem',
                      flexShrink: 0
                    }}>
                      {action.icon}
                    </div>
                    <div>
                      <h3 style={{
                        fontSize: '1.1rem',
                        marginBottom: '0.5rem',
                        color: '#ffffff',
                        fontWeight: 'bold'
                      }}>{action.title}</h3>
                      <p style={{
                        fontSize: '0.9rem',
                        color: '#a0a0a0',
                        margin: 0
                      }}>{action.desc}</p>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
