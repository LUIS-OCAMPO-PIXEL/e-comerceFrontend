import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import api from '../services/api';

function PedidoConfirmado() {
  const { id } = useParams();
  const [pedido, setPedido] = useState(null);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    const obtenerPedido = async () => {
      try {
        const respuesta = await api.get(`/pedidos/${id}`);
        setPedido(respuesta.data);
      } catch (err) {
        console.error(err);
      } finally {
        setCargando(false);
      }
    };

    obtenerPedido();
  }, [id]);

  if (cargando) return <p>Cargando...</p>;
  if (!pedido) return <p>No se encontró el pedido.</p>;

  return (
    <div>
      <h2>¡Gracias por tu compra!</h2>
      <p>Pedido #{pedido.id} — Estado: {pedido.estado}</p>
      <ul>
        {pedido.items.map((item) => (
          <li key={item.id}>
            {item.producto_nombre} — {item.cantidad} x ${item.precio_unitario}
          </li>
        ))}
      </ul>
      <h3>Total: ${pedido.total}</h3>
      <Link to="/">Seguir comprando</Link>
    </div>
  );
}

export default PedidoConfirmado;