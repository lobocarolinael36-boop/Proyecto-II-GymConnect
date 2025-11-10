// frontend/src/services/api.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (credentials) => api.post('/auth/login', credentials),
  register: (userData) => api.post('/auth/register', userData),
  getProfile: (email) => api.get(`/auth/profile?email=${email}`),
  updateProfile: (userData) => api.put('/auth/profile', userData),
  changePassword: (passwordData) => api.put('/auth/password', passwordData),
};

export const classesAPI = {
  getAll: () => api.get('/clases'),
  getById: (id) => api.get(`/clases/${id}`),
  create: (classData) => api.post('/clases', classData),
  update: (id, classData) => api.put(`/clases/${id}`, classData),
  delete: (id) => api.delete(`/clases/${id}`),
  toggleEstado: (id) => api.patch(`/clases/${id}/toggle-estado`),
  getByInstructor: (instructorId) => api.get(`/instructores/${instructorId}/clases`),
};

export const enrollmentAPI = {
  enroll: (enrollmentData) => api.post('/inscripciones', enrollmentData),
  cancel: (enrollmentId) => api.delete(`/inscripciones/${enrollmentId}`),
  getMyClasses: (userId) => api.get(`/inscripciones/user/${userId}`),
};

export const profesorAPI = {
  solicitarCuenta: (data) => api.post('/profesor/solicitar', data),
  obtenerSolicitudes: () => api.get('/profesor'),
  aprobar: (id) => api.post(`/profesor/${id}/aprobar`),
  rechazar: (id) => api.post(`/profesor/${id}/rechazar`),
};

export const adminAPI = {
  buscarUsuarios: (query) => api.get(`/admin/usuarios/buscar?q=${query}`),
  obtenerUsuarios: () => api.get('/admin/usuarios'),
  cambiarRol: (id, rol) => api.patch(`/admin/usuarios/${id}/cambiar-rol`, { rol }),
  eliminarUsuario: (id) => api.delete(`/admin/usuarios/${id}`),
};

export default api;
