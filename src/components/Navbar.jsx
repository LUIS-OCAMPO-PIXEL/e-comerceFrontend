import { Link, useNavigate } from 'react-router-dom';
import { useCarrito } from '../context/CarritoContext';
import { useAuth } from '../context/AuthContext';

function Navbar() {
  const { cantidadTotal } = useCarrito();
  const { usuario, cerrarSesion } = useAuth();
  const navigate = useNavigate();

  const manejarLogout = () => {
    cerrarSesion();
    navigate('/');
  };

  return (
    <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
      <Link to="/">Inicio</Link>
      <Link to="/carrito">Carrito ({cantidadTotal})</Link>

      {usuario ? (
        <>
          <span>Hola, {usuario.nombre}</span>
          <button onClick={manejarLogout}>Cerrar sesión</button>
        </>
      ) : (
        <>
          <Link to="/login">Iniciar sesión</Link>
          <Link to="/registro">Registrarse</Link>
        </>
      )}
    </nav>
  );
}

export default Navbar;
// import { Link } from 'react-router-dom';
// import { useCarrito } from '../context/CarritoContext';

// function Navbar() {
//   const { cantidadTotal } = useCarrito();

//   return (
//     <nav style={{ display: 'flex', gap: '1rem', padding: '1rem', borderBottom: '1px solid #ccc' }}>
//       <Link to="/">Inicio</Link>
//       <Link to="/carrito">Carrito ({cantidadTotal})</Link>
//       <Link to="/login">Iniciar sesión</Link>
//       <Link to="/registro">Registrarse</Link>
//     </nav>
//   );
// }

// export default Navbar;