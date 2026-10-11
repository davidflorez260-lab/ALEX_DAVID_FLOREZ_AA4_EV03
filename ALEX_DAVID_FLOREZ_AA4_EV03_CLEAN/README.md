# E-Commerce — Componente Front-end

**Aprendiz:** Alex David Florez  
**Evidencia:** GA7-220501096-AA4-EV03  
**Código de la evidencia:** Componente front-end del proyecto formativo y proyectos de clase  

---

## Descripción del proyecto

Este proyecto implementa el **componente front-end** de un sistema e-commerce web.  
Incluye las siguientes funcionalidades orientadas al cliente:

### Funcionalidades

- **Catálogo de productos** con búsqueda y filtro por categoría
- **Detalle de producto** con selección de cantidad
- **Carrito de compras** (agregar, eliminar, modificar cantidad, vaciar)
- **Login y Registro** de usuarios (simulado con localStorage)
- **Navegación** entre páginas con React Router
- Persistencia del carrito y sesión en el navegador
- Formato de precios en pesos colombianos (COP)
- Indicadores visuales de stock (alto / medio / bajo)
- Diseño responsive

---

## Tecnologías utilizadas

| Tecnología       | Uso                          |
|------------------|------------------------------|
| React 19         | Librería frontend            |
| Vite             | Herramienta de construcción  |
| React Router DOM | Enrutamiento de páginas      |
| JavaScript (ES6+)| Lógica de la aplicación      |
| CSS3             | Estilos                      |
| Context API      | Estado global (carrito, auth)|

---

## Cómo ejecutar el proyecto

1. Abrir una terminal en la carpeta del proyecto.
2. Instalar dependencias:

```bash
npm install
```

3. Ejecutar en modo desarrollo:

```bash
npm run dev
```

4. Abrir el navegador en la URL que muestra la terminal (normalmente `http://localhost:5173`).

---

## Estructura del proyecto

```
ALEX_DAVID_FLOREZ_AA4_EV03/
├── public/
├── src/
│   ├── components/
│   │   ├── Navbar.jsx          # Barra de navegación
│   │   ├── Navbar.css
│   │   ├── ProductCard.jsx     # Tarjeta de producto
│   │   └── ProductCard.css
│   ├── context/
│   │   ├── CartContext.jsx     # Estado global del carrito
│   │   └── AuthContext.jsx     # Estado de autenticación
│   ├── data/
│   │   └── productos.js        # Datos de productos (mock)
│   ├── pages/
│   │   ├── Catalogo.jsx        # Página de catálogo
│   │   ├── Catalogo.css
│   │   ├── ProductoDetalle.jsx # Detalle de producto
│   │   ├── ProductoDetalle.css
│   │   ├── Carrito.jsx         # Carrito de compras
│   │   ├── Carrito.css
│   │   ├── Login.jsx           # Inicio de sesión
│   │   ├── Registro.jsx        # Registro de usuario
│   │   └── Auth.css
│   ├── App.jsx                 # Componente raíz + rutas
│   ├── App.css
│   ├── index.css
│   └── main.jsx                # Punto de entrada
├── index.html
├── package.json
├── vite.config.js
├── README.md
└── ENLACE_REPOSITORIO.txt
```

---

## Estándares de codificación aplicados

- Comentarios en español explicando cada función y bloque importante.
- Nombres de variables y funciones en **camelCase**.
- Componentes funcionales de React.
- Separación de lógica (Context) y presentación (páginas/componentes).
- Código limpio, legible y organizado por carpetas.
- Uso de hooks personalizados (`useCart`, `useAuth`).

---

## Relación con artefactos previos

Este módulo front-end se construye sobre:

- Historias de usuario de catálogo, carrito y autenticación.
- Diagrama de clases (Producto, Usuario, Carrito).
- Prototipos de interfaz de las evidencias anteriores.
- Módulo CRUD de productos (AA3-EV01) como base de datos de productos.

---

## Control de versiones

El proyecto está versionado con **Git**.  
El enlace del repositorio se encuentra en el archivo `ENLACE_REPOSITORIO.txt`.

---

## Autor

**Alex David Florez**  
Evidencia de aprendizaje — SENA  
GA7-220501096-AA4-EV03
