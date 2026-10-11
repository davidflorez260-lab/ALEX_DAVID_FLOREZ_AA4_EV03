/**
 * ============================================================
 * Contexto de Autenticación (simulado)
 * Maneja login, registro y sesión del usuario.
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * ============================================================
 */
import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

/**
 * Hook personalizado para consumir el contexto de autenticación.
 */
export function useAuth() {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth debe usarse dentro de un AuthProvider')
  }
  return context
}

/**
 * Proveedor de autenticación.
 * Los datos se guardan en localStorage para simular persistencia.
 */
export function AuthProvider({ children }) {
  const [usuario, setUsuario] = useState(() => {
    const guardado = localStorage.getItem('ecommerce-usuario')
    return guardado ? JSON.parse(guardado) : null
  })

  useEffect(() => {
    if (usuario) {
      localStorage.setItem('ecommerce-usuario', JSON.stringify(usuario))
    } else {
      localStorage.removeItem('ecommerce-usuario')
    }
  }, [usuario])

  /**
   * Inicia sesión con correo y contraseña (simulado).
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, mensaje: string }}
   */
  const login = (email, password) => {
    // Simulación: cualquier correo con contraseña de al menos 4 caracteres
    if (!email.trim() || password.length < 4) {
      return {
        success: false,
        mensaje: 'Correo y contraseña (mín. 4 caracteres) son obligatorios.',
      }
    }
    const nombre = email.split('@')[0]
    setUsuario({ email, nombre, rol: 'cliente' })
    return { success: true, mensaje: 'Inicio de sesión exitoso.' }
  }

  /**
   * Registra un nuevo usuario (simulado).
   * @param {string} nombre
   * @param {string} email
   * @param {string} password
   * @returns {{ success: boolean, mensaje: string }}
   */
  const registro = (nombre, email, password) => {
    if (!nombre.trim() || !email.trim() || password.length < 4) {
      return {
        success: false,
        mensaje: 'Todos los campos son obligatorios (contraseña mín. 4 caracteres).',
      }
    }
    setUsuario({ email, nombre, rol: 'cliente' })
    return { success: true, mensaje: 'Registro exitoso. ¡Bienvenido!' }
  }

  /**
   * Cierra la sesión del usuario.
   */
  const logout = () => {
    setUsuario(null)
  }

  const value = {
    usuario,
    login,
    registro,
    logout,
    estaAutenticado: !!usuario,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
