/**
 * ============================================================
 * Página: Detalle de Producto
 * Muestra información completa del producto y permite
 * agregarlo al carrito con cantidad seleccionable.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { useState } from 'react'
import { useParams, Link, useNavigate } from 'react-router-dom'
import { productos } from '../data/productos'
import { useCart } from '../context/CartContext'
import './ProductoDetalle.css'

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

function ProductoDetalle() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { agregarAlCarrito } = useCart()
  const [cantidad, setCantidad] = useState(1)
  const [mensaje, setMensaje] = useState('')

  // Busca el producto por ID
  const producto = productos.find((p) => p.id === Number(id))

  // Si no existe el producto, muestra mensaje
  if (!producto) {
    return (
      <div className="detalle-page">
        <div className="detalle-no-encontrado">
          <h2>Producto no encontrado</h2>
          <p>El producto que buscas no existe o fue eliminado.</p>
          <Link to="/" className="btn btn-primary">
            Volver al catálogo
          </Link>
        </div>
      </div>
    )
  }

  /**
   * Agrega el producto al carrito con la cantidad seleccionada.
   */
  const handleAgregar = () => {
    if (producto.stock <= 0) return
    const cant = Math.min(cantidad, producto.stock)
    agregarAlCarrito(producto, cant)
    setMensaje(`✅ ${cant} unidad(es) agregada(s) al carrito.`)
    setTimeout(() => setMensaje(''), 3000)
  }

  return (
    <div className="detalle-page">
      <button className="btn-volver" onClick={() => navigate(-1)}>
        ← Volver
      </button>

      <div className="detalle-container">
        {/* Imagen */}
        <div className="detalle-imagen">
          <img src={producto.imagen} alt={producto.nombre} />
        </div>

        {/* Información */}
        <div className="detalle-info">
          <span className="detalle-categoria">{producto.categoria}</span>
          <h1>{producto.nombre}</h1>
          <p className="detalle-precio">{formatearPrecio(producto.precio)}</p>
          <p className="detalle-descripcion">{producto.descripcion}</p>

          <div className="detalle-stock">
            <span
              className={
                producto.stock > 10
                  ? 'stock-alto'
                  : producto.stock > 0
                  ? 'stock-medio'
                  : 'stock-bajo'
              }
            >
              {producto.stock > 0
                ? `${producto.stock} unidades disponibles`
                : 'Producto agotado'}
            </span>
          </div>

          {producto.stock > 0 && (
            <div className="detalle-acciones">
              <div className="cantidad-control">
                <label htmlFor="cantidad">Cantidad:</label>
                <div className="cantidad-btns">
                  <button
                    type="button"
                    onClick={() => setCantidad((c) => Math.max(1, c - 1))}
                    aria-label="Disminuir cantidad"
                  >
                    −
                  </button>
                  <input
                    id="cantidad"
                    type="number"
                    min="1"
                    max={producto.stock}
                    value={cantidad}
                    onChange={(e) =>
                      setCantidad(
                        Math.min(
                          producto.stock,
                          Math.max(1, Number(e.target.value) || 1)
                        )
                      )
                    }
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setCantidad((c) => Math.min(producto.stock, c + 1))
                    }
                    aria-label="Aumentar cantidad"
                  >
                    +
                  </button>
                </div>
              </div>

              <button className="btn btn-agregar" onClick={handleAgregar}>
                🛒 Agregar al carrito
              </button>
            </div>
          )}

          {mensaje && <div className="detalle-mensaje">{mensaje}</div>}
        </div>
      </div>
    </div>
  )
}

export default ProductoDetalle
