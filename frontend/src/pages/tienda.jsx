import { useEffect, useState } from 'react';
import Navbar from '../components/Navbar';
import shopAPI from '../services/shopAPI';
import ClassCard from '../components/ClassCard'; // asegúrate que acepte props personalizables

const productosDemo = [
  {
    id: 1,
    nombre: 'Proteína Whey',
    descripcion: 'Suplemento de proteína para recuperación muscular.',
    precio: 8200,
    imagen: 'https://images.unsplash.com/photo-1506744038136-46273834b3fb'
  },
  {
    id: 2,
    nombre: 'Elásticos Físicos',
    descripcion: 'Set de bandas elásticas para entrenamiento funcional.',
    precio: 3400,
    imagen: 'https://images.pexels.com/photos/4666754/pexels-photo-4666754.jpeg'
  },
  {
    id: 3,
    nombre: 'Guantes de gimnasio',
    descripcion: 'Guantes antideslizantes y transpirables para pesas.',
    precio: 2200,
    imagen: 'https://images.pexels.com/photos/1552249/pexels-photo-1552249.jpeg'
  },
  {
    id: 4,
    nombre: 'Shaker Pro',
    descripcion: 'Botella mezcladora para batidos de proteína.',
    precio: 1500,
    imagen: 'https://images.unsplash.com/photo-1519866663826-c2f6900cf05f'
  }
];

const Tienda = () => (
  <div style={{ minHeight: '100vh', background: '#0a0a0a', paddingTop: '80px' }}>
    <Navbar />
    <div style={{
      maxWidth: '1200px',
      margin: '0 auto',
      padding: '2rem',
      display: 'grid',
      gap: '2rem',
      gridTemplateColumns: 'repeat(auto-fit,minmax(320px,1fr))'
    }}>
      {productosDemo.map(producto => (
        <ClassCard
          key={producto.id}
          nombre={producto.nombre}
          descripcion={producto.descripcion}
          precio={producto.precio}
          imagen={producto.imagen}
          onClick={() => alert(`¡${producto.nombre} comprado por $${producto.precio}!`)}
          labelBtn="Comprar"
        />
      ))}
    </div>
  </div>
);


export default Tienda;
