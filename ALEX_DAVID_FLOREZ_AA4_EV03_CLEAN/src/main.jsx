/**
 * ============================================================
 * Punto de entrada de la aplicación E-Commerce
 * Aprendiz: Alex David Florez
 * Evidencia: GA7-220501096-AA4-EV03
 * Componente front-end del proyecto formativo
 * ============================================================
 */
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { CartProvider } from './context/CartContext'
import { AuthProvider } from './context/AuthContext'
import App from './App.jsx'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <App />
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  </StrictMode>,
)
