import { createContext, useContext, useState } from 'react';

// 1. Creamos el "contenedor" del contexto
const CarritoContext = createContext();

// 2. Este componente envuelve tu app y provee el estado a todos sus hijos
export function CarritoProvider({ children }) {
  const [items, setItems] = useState([]);

  const agregarAlCarrito = (producto, cantidad = 1) => {
    setItems((prevItems) => {
      const existente = prevItems.find((item) => item.producto_id === producto.producto_id);

      if (existente) {
        // Si ya está en el carrito, solo aumenta la cantidad
        return prevItems.map((item) =>
          item.producto_id === producto.producto_id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        );
      }

      // Si es nuevo, lo agrega con la cantidad indicada
      return [...prevItems, { ...producto, cantidad }];
    });
  };

  const quitarDelCarrito = (producto_id) => {
    setItems((prevItems) => prevItems.filter((item) => item.producto_id !== producto_id));
  };

  const vaciarCarrito = () => {
    setItems([]);
  };

  const total = items.reduce((acc, item) => acc + item.precio * item.cantidad, 0);
  const cantidadTotal = items.reduce((acc, item) => acc + item.cantidad, 0);

  return (
    <CarritoContext.Provider
      value={{ items, agregarAlCarrito, quitarDelCarrito, vaciarCarrito, total, cantidadTotal }}
    >
      {children}
    </CarritoContext.Provider>
  );
}

// 3. Hook personalizado para usar el contexto fácilmente en cualquier componente
export function useCarrito() {
  return useContext(CarritoContext);
}