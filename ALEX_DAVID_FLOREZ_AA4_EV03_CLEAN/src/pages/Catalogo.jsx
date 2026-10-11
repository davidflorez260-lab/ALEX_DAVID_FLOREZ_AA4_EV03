/**
 * ============================================================
 * Página: Catálogo de Productos
 * Muestra el listado de productos con filtro por categoría.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { useState, useMemo } from 'react'
import { productos } from '../data/productos'
import ProductCard from '../components/ProductCard'
import './Catalogo.css'

function Catalogo() {
  const [busqueda, setBusqueda] = useState('')
  const [categoriaFiltro, setCategoriaFiltro] = useState('Todas')

  // Obtiene las categorías únicas de los productos
  const categorias = useMemo(() => {
    const cats = [...new Set(productos.map((p) => p.categoria))]
    return ['Todas', ...cats]
  }, [])

  // Filtra productos según búsqueda y categoría
  const productosFiltrados = useMemo(() => {
    return productos.filter((p) => {
      const coincideBusqueda =
        p.nombre.toLowerCase().includes(busqueda.toLowerCase()) ||
        p.descripcion.toLowerCase().includes(busqueda.toLowerCase())
      const coincideCategoria =
        categoriaFiltro === 'Todas' || p.categoria === categoriaFiltro
      return coincideBusqueda && coincideCategoria
    })
  }, [busqueda, categoriaFiltro])

  return (
    <div className="catalogo-page">
      {/* Hero / encabezado */}
      <section className="catalogo-hero">
        <h1>Catálogo de Productos</h1>
        <p>Encuentra lo que necesitas al mejor precio</p>
      </section>

      {/* Filtros */}
      <section className="catalogo-filtros">
        <div className="filtro-busqueda">
          <input
            type="search"
            placeholder="Buscar productos..."
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
            aria-label="Buscar productos"
          />
        </div>

        <div className="filtro-categorias">
          {categorias.map((cat) => (
            <button
              key={cat}
              className={`chip ${categoriaFiltro === cat ? 'chip-active' : ''}`}
              onClick={() => setCategoriaFiltro(cat)}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Grid de productos */}
      <section className="catalogo-grid">
        {productosFiltrados.length === 0 ? (
          <p className="sin-resultados">
            No se encontraron productos con los filtros seleccionados.
          </p>
        ) : (
          productosFiltrados.map((producto) => (
            <ProductCard key={producto.id} producto={producto} />
          ))
        )}
      </section>

      <p className="catalogo-contador">
        Mostrando {productosFiltrados.length} de {productos.length} productos
      </p>
    </div>
  )
}

export default Catalogo
