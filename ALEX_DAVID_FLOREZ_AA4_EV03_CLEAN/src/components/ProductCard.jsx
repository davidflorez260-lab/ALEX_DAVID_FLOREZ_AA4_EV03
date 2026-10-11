/**
 * ============================================================
 * Componente ProductCard - Tarjeta individual de producto
 * Muestra imagen, nombre, precio, stock y botones de acción.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { Link } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import './ProductCard.css'

/**
 * Formatea un valor numérico a pesos colombianos (COP).
 * @param {number} valor
 * @returns {string}
 */
const formatearPrecio = (valor) => {
  return new Intl.NumberFormat('es-CO', {
    style: 'currency',
    currency: 'COP',
    minimumFractionDigits: 0,
  }).format(valor)
}

function ProductCard({ producto }) {
  const { agregarAlCarrito } = useCart()

  /**
   * Agrega el producto al carrito y muestra feedback visual.
   */
  const handleAgregar = () => {
    if (producto.stock <= 0) return
    agregarAlCarrito(producto, 1)
  }

  return (
    <article className="product-card">
      <Link to={`/producto/${producto.id}`} className="product-card-img-link">
        <img
          src={producto.imagen}
          alt={producto.nombre}
          className="product-card-img"
          loading="lazy"
        />
      </Link>

      <div className="product-card-body">
        <span className="product-card-categoria">{producto.categoria}</span>
        <h3 className="product-card-nombre">
          <Link to={`/producto/${producto.id}`}>{producto.nombre}</Link>
        </h3>
        <p className="product-card-precio">{formatearPrecio(producto.precio)}</p>

        <div className="product-card-stock">
          <span
            className={
              producto.stock > 10
                ? 'stock-alto'
                : producto.stock > 0
                ? 'stock-medio'
                : 'stock-bajo'
            }
          >
            {producto.stock > 0 ? `Stock: ${producto.stock}` : 'Agotado'}
          </span>
        </div>

        <div className="product-card-actions">
          <Link to={`/producto/${producto.id}`} className="btn btn-outline">
            Ver detalle
          </Link>
          <button
            className="btn btn-primary"
            onClick={handleAgregar}
            disabled={producto.stock <= 0}
            title={producto.stock <= 0 ? 'Producto agotado' : 'Agregar al carrito'}
          >
            🛒 Agregar
          </button>
        </div>
      </div>
    </article>
  )
}

export default ProductCard
