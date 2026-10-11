/**
 * ============================================================
 * Página: Iniciar Sesión
 * Formulario de login simulado con validación.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Login() {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)
  const { login, estaAutenticado } = useAuth()
  const navigate = useNavigate()

  // Si ya está autenticado, redirige al catálogo
  if (estaAutenticado) {
    navigate('/')
    return null
  }

  /**
   * Maneja el envío del formulario de login.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const resultado = login(email, password)
    setMensaje(resultado.mensaje)
    setError(!resultado.success)

    if (resultado.success) {
      setTimeout(() => navigate('/'), 1000)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Iniciar sesión</h1>
        <p className="auth-subtitle">Accede a tu cuenta de E-Commerce</p>

        {mensaje && (
          <div className={`auth-mensaje ${error ? 'error' : 'exito'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="email">Correo electrónico</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="tu@correo.com"
              required
              autoComplete="email"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Mínimo 4 caracteres"
              required
              minLength={4}
              autoComplete="current-password"
            />
          </div>

          <button type="submit" className="btn-auth">
            Iniciar sesión
          </button>
        </form>

        <p className="auth-footer">
          ¿No tienes cuenta? <Link to="/registro">Regístrate aquí</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
