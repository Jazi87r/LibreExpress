import React, { useState } from 'react';
import axios from 'axios';

const BuscarProductos = () => {
  const [busqueda, setBusqueda] = useState('');
  const [resultados, setResultados] = useState([]);

  const handleBuscar = async () => {
    if (!busqueda.trim()) return;

    try {
      const res = await axios.get(`http://localhost:5000/authproduct/buscar?nombre=${busqueda}`);
      setResultados(res.data);
    } catch (error) {
      console.error('Error al buscar productos:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Buscar Productos</h2>
      <input
        type="text"
        placeholder="Nombre del producto"
        value={busqueda}
        onChange={(e) => setBusqueda(e.target.value)}
      />
      <button onClick={handleBuscar}>Buscar</button>

      <div style={{ marginTop: '20px' }}>
        <h3>Resultados:</h3>
        {resultados.length > 0 ? (
          <ul>
            {resultados.map((producto) => (
              <li key={producto._id}>
                <strong>{producto.name}</strong> - ${producto.price}
              </li>
            ))}
          </ul>
        ) : (
          <p>No hay resultados</p>
        )}
      </div>
    </div>
  );
};

export default BuscarProductos;
