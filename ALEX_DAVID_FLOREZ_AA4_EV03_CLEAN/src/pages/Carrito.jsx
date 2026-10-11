/**
 * ============================================================
 * Página: Carrito de Compras
 * Permite ver, modificar y vaciar el carrito.
 * Calcula subtotal y muestra resumen de compra.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Carrito.css'

/**
 * Formatea precio a COP.
 */
const formatearPrecio = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)
}

function Carrito() {
  const {
    carrito,
    eliminarDelCarrito,
    actualizarCantidad,
    vaciarCarrito,
    totalItems,
    subtotal,
  } = useCart()
  const { estaAutenticado, usuario } = useAuth()

  /**
   * Simula el proceso de checkout.
   */
  const handleCheckout = () => {
    if (!estaAutenticado) {
      alert('Debes iniciar sesión para finalizar la compra.')
      return
    }
    if (carrito.length === 0) return

    const confirmar = window.confirm(
      `¿Confirmar compra por ${formatearPrecio(subtotal)}?\n\nCliente: ${usuario.nombre}`
    )
    if (confirmar) {
      alert(
        '✅ ¡Compra realizada con éxito!\n\nGracias por tu compra. (Simulación de checkout)'
      )
      vaciarCarrito()
    }
  }

  // Carrito vacío
  if (carrito.length === 0) {
    return (
      <div className="carrito-page">
        <h1>🛒 Carrito de Compras</h1>
        <div className="carrito-vacio">
          <p>Tu carrito está vacío.</p>
          <Link to="/" className="btn btn-primary">
            Ir al catálogo
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="carrito-page">
      <div className="carrito-header">
        <h1>🛒 Carrito de Compras</h1>
        <span className="carrito-items-count">
          {totalItems} producto{totalItems !== 1 ? 's' : ''}
        </span>
      </div>

      <div className="carrito-layout">
        {/* Lista de ítems */}
        <div className="carrito-lista">
          {carrito.map((item) => (
            <div key={item.id} className="carrito-item">
              <img
                src={item.imagen}
                alt={item.nombre}
                className="carrito-item-img"
              />
              <div className="carrito-item-info">
                <Link to={`/producto/${item.id}`} className="carrito-item-nombre">
                  {item.nombre}
                </Link>
                <span className="carrito-item-categoria">{item.categoria}</span>
                <span className="carrito-item-precio">
                  {formatearPrecio(item.precio)}
                </span>
              </div>

              <div className="carrito-item-cantidad">
                <button
                  onClick={() => actualizarCantidad(item.id, item.cantidad - 1)}
                  aria-label="Disminuir"
                >
                  −
                </button>
                <span>{item.cantidad}</span>
                <button
                  onClick={() =>
                    actualizarCantidad(
                      item.id,
                      Math.min(item.stock, item.cantidad + 1)
                    )
                  }
                  aria-label="Aumentar"
                >
                  +
                </button>
              </div>

              <div className="carrito-item-subtotal">
                {formatearPrecio(item.precio * item.cantidad)}
              </div>

              <button
                className="carrito-item-eliminar"
                onClick={() => eliminarDelCarrito(item.id)}
                title="Eliminar del carrito"
              >
                🗑️
              </button>
            </div>
          ))}

          <button className="btn-vaciar" onClick={vaciarCarrito}>
            Vaciar carrito
          </button>
        </div>

        {/* Resumen */}
        <aside className="carrito-resumen">
          <h2>Resumen de compra</h2>
          <div className="resumen-fila">
            <span>Subtotal ({totalItems} ítems)</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>
          <div className="resumen-fila">
            <span>Envío</span>
            <span className="envio-gratis">Gratis</span>
          </div>
          <div className="resumen-total">
            <span>Total</span>
            <span>{formatearPrecio(subtotal)}</span>
          </div>

          <button className="btn-checkout" onClick={handleCheckout}>
            {estaAutenticado
              ? 'Finalizar compra'
              : 'Inicia sesión para comprar'}
          </button>

          {!estaAutenticado && (
            <p className="resumen-aviso">
              <Link to="/login">Inicia sesión</Link> o{' '}
              <Link to="/registro">regístrate</Link> para completar tu compra.
            </p>
          )}

          <Link to="/" className="link-seguir">
            ← Seguir comprando
          </Link>
        </aside>
      </div>
    </div>
  )
}

export default Carrito
