/**
 * ============================================================
 * Contexto del Carrito de Compras
 * Maneja el estado global del carrito (agregar, eliminar,
 * actualizar cantidad y calcular totales).
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

/**
 * Hook personalizado para consumir el contexto del carrito.
 * @returns {Object} Valores y funciones del carrito
 */
export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart debe usarse dentro de un CartProvider')
  }
  return context
}

/**
 * Proveedor del carrito. Envuelve la aplicación y comparte el estado.
 */
export function CartProvider({ children }) {
  // Estado del carrito (se persiste en localStorage)
  const [carrito, setCarrito] = useState(() => {
    const guardado = localStorage.getItem('ecommerce-carrito')
    return guardado ? JSON.parse(guardado) : []
  })

  // Persiste el carrito cada vez que cambia
  useEffect(() => {
    localStorage.setItem('ecommerce-carrito', JSON.stringify(carrito))
  }, [carrito])

  /**
   * Agrega un producto al carrito.
   * Si ya existe, incrementa la cantidad.
   * @param {Object} producto - Producto a agregar
   * @param {number} cantidad - Cantidad a agregar (default 1)
   */
  const agregarAlCarrito = (producto, cantidad = 1) => {
    setCarrito((prev) => {
      const existente = prev.find((item) => item.id === producto.id)
      if (existente) {
        return prev.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + cantidad }
            : item
        )
      }
      return [...prev, { ...producto, cantidad }]
    })
  }

  /**
   * Elimina un producto del carrito por su ID.
   * @param {number} id - ID del producto
   */
  const eliminarDelCarrito = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id))
  }

  /**
   * Actualiza la cantidad de un producto en el carrito.
   * Si la cantidad llega a 0, se elimina.
   * @param {number} id - ID del producto
   * @param {number} cantidad - Nueva cantidad
   */
  const actualizarCantidad = (id, cantidad) => {
    if (cantidad <= 0) {
      eliminarDelCarrito(id)
      return
    }
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad } : item
      )
    )
  }

  /**
   * Vacía completamente el carrito.
   */
  const vaciarCarrito = () => {
    setCarrito([])
  }

  /**
   * Calcula el total de ítems en el carrito.
   * @returns {number}
   */
  const totalItems = carrito.reduce((acc, item) => acc + item.cantidad, 0)

  /**
   * Calcula el subtotal (suma de precios * cantidades).
   * @returns {number}
   */
  const subtotal = carrito.reduce(
    (acc, item) => acc + item.precio * item.cantidad,
    0
  )

  const value = {
    carrito,
    agregarAlCarrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalItems,
    subtotal,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}
