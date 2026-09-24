import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { CarritoProvider } from './context/CarritoContext';
import { AuthProvider } from './context/AuthContext';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import ProductoDetalle from './pages/ProductoDetalle';
import Carrito from './pages/Carrito';
import Login from './pages/Login';
import Registro from './pages/Registro';
import PedidoConfirmado from './pages/PedidoConfirmado';

function App() {
  return (
    <AuthProvider>
    <CarritoProvider>
      <BrowserRouter>
        <Navbar />
        <Routes>

          
          <Route path="/" element={<Home />} />
          <Route path="/producto/:id" element={<ProductoDetalle />} />
          <Route path="/carrito" element={<Carrito />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />
          <Route path="/pedido-confirmado/:id" element={<PedidoConfirmado />} />

        </Routes>
      </BrowserRouter>
    </CarritoProvider>
    </AuthProvider>
  );
}

export default App;