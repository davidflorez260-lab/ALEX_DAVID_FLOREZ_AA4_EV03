/**
 * ============================================================
 * Página: Registro de Usuario
 * Formulario de registro simulado con validación.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import './Auth.css'

function Registro() {
  const [nombre, setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [mensaje, setMensaje] = useState('')
  const [error, setError] = useState(false)
  const { registro, estaAutenticado } = useAuth()
  const navigate = useNavigate()

  if (estaAutenticado) {
    navigate('/')
    return null
  }

  /**
   * Maneja el envío del formulario de registro.
   */
  const handleSubmit = (e) => {
    e.preventDefault()
    const resultado = registro(nombre, email, password)
    setMensaje(resultado.mensaje)
    setError(!resultado.success)

    if (resultado.success) {
      setTimeout(() => navigate('/'), 1000)
    }
  }

  return (
    <div className="auth-page">
      <div className="auth-card">
        <h1>Crear cuenta</h1>
        <p className="auth-subtitle">Regístrate para comprar en E-Commerce</p>

        {mensaje && (
          <div className={`auth-mensaje ${error ? 'error' : 'exito'}`}>
            {mensaje}
          </div>
        )}

        <form onSubmit={handleSubmit} className="auth-form">
          <div className="form-group">
            <label htmlFor="nombre">Nombre completo</label>
            <input
              type="text"
              id="nombre"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              placeholder="Tu nombre"
              required
              autoComplete="name"
            />
          </div>

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
              autoComplete="new-password"
            />
          </div>

          <button type="submit" className="btn-auth">
            Registrarse
          </button>
        </form>

        <p className="auth-footer">
          ¿Ya tienes cuenta? <Link to="/login">Inicia sesión</Link>
        </p>
      </div>
    </div>
  )
}

export default Registro
