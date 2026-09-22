import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from '../services/api';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const obtenerProductos = async () => {
      try {
        const respuesta = await api.get('/productos');
        setProductos(respuesta.data);
      } catch (err) {
        setError('No se pudieron cargar los productos');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProductos();
  }, []);

  if (cargando) return <p>Cargando productos...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Productos</h2>
      <ul>
        {productos.map((producto) => (
          <li key={producto.producto_id}>
            <Link to={`/producto/${producto.producto_id}`}>
              <strong>{producto.nombre}</strong>
            </Link>
            {' — $'}{producto.precio}
            <br />
            Categoría: {producto.categoria_nombre || 'Sin categoría'}
            <br />
            Stock: {producto.stock}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ListaProductos;