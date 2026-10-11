/**
 * ============================================================
 * Componente Navbar - Barra de navegación principal
 * Muestra logo, enlaces, contador del carrito y estado de sesión.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { Link, NavLink } from 'react-router-dom'
import { useCart } from '../context/CartContext'
import { useAuth } from '../context/AuthContext'
import './Navbar.css'

function Navbar() {
  const { totalItems } = useCart()
  const { usuario, logout, estaAutenticado } = useAuth()

  return (
    <nav className="navbar">
      <div className="navbar-container">
        {/* Logo / Marca */}
        <Link to="/" className="navbar-logo">
          🛒 E-Commerce SENA
        </Link>

        {/* Enlaces de navegación */}
        <ul className="navbar-links">
          <li>
            <NavLink to="/" end className={({ isActive }) => (isActive ? 'active' : '')}>
              Catálogo
            </NavLink>
          </li>
          <li>
            <NavLink to="/carrito" className={({ isActive }) => (isActive ? 'active' : '')}>
              Carrito
              {totalItems > 0 && (
                <span className="badge-carrito">{totalItems}</span>
              )}
            </NavLink>
          </li>
          {estaAutenticado ? (
            <>
              <li className="usuario-info">
                Hola, <strong>{usuario.nombre}</strong>
              </li>
              <li>
                <button className="btn-logout" onClick={logout}>
                  Cerrar sesión
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <NavLink to="/login" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Iniciar sesión
                </NavLink>
              </li>
              <li>
                <NavLink to="/registro" className={({ isActive }) => (isActive ? 'active' : '')}>
                  Registrarse
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
