/**
 * ============================================================
 * Componente principal de la aplicación E-Commerce
 * Define las rutas y la estructura general (Navbar + contenido).
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * Componente front-end del proyecto formativo
 * ============================================================
 */
import { Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Catalogo from './pages/Catalogo'
import ProductoDetalle from './pages/ProductoDetalle'
import Carrito from './pages/Carrito'
import Login from './pages/Login'
import Registro from './pages/Registro'
import './App.css'

function App() {
  return (
    <div className="app">
      {/* Barra de navegación global */}
      <Navbar />

      {/* Contenido principal según la ruta */}
      <main className="main-content">
        <Routes>
          {/* Catálogo de productos (página de inicio) */}
          <Route path="/" element={<Catalogo />} />

          {/* Detalle de un producto */}
          <Route path="/producto/:id" element={<ProductoDetalle />} />

          {/* Carrito de compras */}
          <Route path="/carrito" element={<Carrito />} />

          {/* Autenticación */}
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Registro />} />

          {/* Ruta 404 */}
          <Route
            path="*"
            element={
              <div className="not-found">
                <h2>404 - Página no encontrada</h2>
                <p>La ruta que buscas no existe.</p>
              </div>
            }
          />
        </Routes>
      </main>

      {/* Pie de página */}
      <footer className="app-footer">
        <p>
          E-Commerce SENA | Desarrollado con React + Vite |{' '}
          <strong>Alex David Florez</strong>
        </p>
        <p>Evidencia GA7-220501096-AA4-EV03 — Componente front-end</p>
      </footer>
    </div>
  )
}

export default App
