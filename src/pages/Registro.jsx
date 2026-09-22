import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import api from '../services/api';


function Registro() {
  const [formData, setFormData] = useState({
    nombre: '',
    email: '',
    password: ''
  });

  const [enviando, setEnviando] = useState(false);
  const [errorMsg, setErrorMsg] = useState(''); // Estado para mostrar errores en pantalla
  const navigate = useNavigate();

  // CORREGIDO: Extraer 'value' de e.target
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setErrorMsg('');

    try {
      // USANDO TU INSTANCIA DE API (Axios):
      const respuesta = await api.post('/usuarios', formData);

      // Si usas axios y llega aquí, la respuesta fue exitosa (200/201)
      alert('¡Cuenta creada con éxito!');

      // CORREGIDO: Reiniciar también password
      setFormData({ nombre: '', email: '', password: '' });

      // REDIRECCIÓN: Enviar al usuario al login tras registrarse
      navigate('/login');

    } catch (error) {
      console.error('Error al registrar:', error);
      setErrorMsg(error.response?.data?.error || 'Error al conectar con el servidor.');
    } finally {
      setEnviando(false);
    }
  };

  return (
    <div>
      <h2>Crea una cuenta</h2>

      {/* Mostrar mensaje de error si existe */}
      {errorMsg && <p style={{ color: 'red' }}>{errorMsg}</p>}

      <form onSubmit={handleSubmit}>
        <div>
          <label>Nombre:</label>
          <input
            type="text"
            name="nombre"
            value={formData.nombre}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div>
          <label>Contraseña:</label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" disabled={enviando}>
          {enviando ? 'Creando cuenta...' : 'Registrarme'}
        </button>
      </form>

      {/* Enlace para los que ya tienen cuenta */}
      <p>
        ¿Ya tienes cuenta? <Link to="/login">Inicia sesión aquí</Link>
      </p>
    </div>
  );
}

export default Registro;