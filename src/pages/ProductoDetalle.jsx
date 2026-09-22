import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';
import { useCarrito } from '../context/CarritoContext';

function ProductoDetalle() {
  const { id } = useParams();
  const [producto, setProducto] = useState(null);
  const [cargando, setCargando] = useState(true);
  const [error, setError] = useState(null);
  const { agregarAlCarrito } = useCarrito();

  useEffect(() => {
    const obtenerProducto = async () => {
      try {
        const respuesta = await api.get(`/productos/${id}`);
        setProducto(respuesta.data);
      } catch (err) {
        setError('Producto no encontrado');
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerProducto();
  }, [id]);

  if (cargando) return <p>Cargando producto...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div>
      <Link to="/">← Volver a productos</Link>
      <h2>{producto.nombre}</h2>
      <p>{producto.descripcion}</p>
      <p><strong>Precio:</strong> ${producto.precio}</p>
      <p><strong>Stock disponible:</strong> {producto.stock}</p>
      <p><strong>Categoría:</strong> {producto.categoria_nombre || 'Sin categoría'}</p>
      <button onClick={() => agregarAlCarrito(producto)}>
        Agregar al carrito
      </button>
    </div>
  );
}

export default ProductoDetalle;