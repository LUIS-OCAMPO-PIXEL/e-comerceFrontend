import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

function Carrito() {
  const { items, quitarDelCarrito, vaciarCarrito, total } = useCarrito();
  const { usuario } = useAuth();
  const navigate = useNavigate();

  const [procesando, setProcesando] = useState(false);
  const [error, setError] = useState('');

  const manejarCheckout = async () => {
    setError('');   

    // Validación de sesión, justo aquí, en el momento de intentar pagar
    if (!usuario) {
      navigate('/login');
      return;
    }

    setProcesando(true);

    try {
      const itemsParaPedido = items.map((item) => ({
        producto_id: item.producto_id,
        cantidad: item.cantidad,
      }));

      const respuesta = await api.post('/pedidos', {
        usuario_id: usuario.usuario_id,
        items: itemsParaPedido,
      });

      vaciarCarrito();
      navigate(`/pedido-confirmado/${respuesta.data.id}`);
    } catch (err) {
      setError(err.response?.data?.error || 'Error al procesar el pedido');
    } finally {
      setProcesando(false);
    }
  };

  if (items.length === 0) {
    return (
      <div>
        <h2>Tu Carrito</h2>
        <p>Tu carrito está vacío.</p>
        <Link to="/">Ver productos</Link>
      </div>
    );
  }

  return (
    <div>
      <h2>Tu Carrito</h2>
      <ul>
        {items.map((item) => (
          <li key={item.producto_id}>
            {item.nombre} — {item.cantidad} x ${item.precio} = ${item.cantidad * item.precio}
            <button onClick={() => quitarDelCarrito(item.producto_id)}>Quitar</button>
          </li>
        ))}
      </ul>
      <h3>Total: ${total}</h3>

      {!usuario && (
        <p style={{ color: '#b45309' }}>
          Debes iniciar sesión para completar tu compra.
        </p>
      )}

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <button onClick={manejarCheckout} disabled={procesando}>
        {procesando ? 'Procesando...' : usuario ? 'Pagar ahora' : 'Iniciar sesión para pagar'}
      </button>

      <button onClick={vaciarCarrito}>Vaciar carrito</button>
    </div>
  );
}

export default Carrito;