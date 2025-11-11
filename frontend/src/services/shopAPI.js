import axios from 'axios';
const API_URL = 'http://localhost:5000/api/shop';

const getProductos = () => axios.get(`${API_URL}/productos`);

const comprarProducto = (id) => {
  const token = localStorage.getItem('token');
  return axios.post(
    `${API_URL}/comprar/${id}`, 
    {}, 
    { headers: { Authorization: `Bearer ${token}` }}
  );
};

export default { getProductos, comprarProducto };
