# Ecommerce Pro

Aplicación web de comercio electrónico construida con React y Vite. El proyecto incluye una barra de navegación adaptable y rutas iniciales para las secciones principales de la tienda.

> **Estado actual:** las rutas muestran contenido de prueba. Las páginas completas del catálogo, la autenticación, el panel y la persistencia de productos aún deben implementarse.

## Requisitos

- Node.js y npm instalados.

## Instalación y ejecución

Cloná el repositorio y entrá en la carpeta del proyecto. Luego instalá las dependencias y arrancá el servidor de desarrollo:

```bash
npm install
npm run dev
```

Vite mostrará la dirección local en la terminal (normalmente `http://localhost:5173/`). Abrí esa dirección en el navegador.

**No abras `index.html` directamente desde el explorador de archivos.** Es el punto de entrada de Vite y carga módulos de JavaScript que necesitan servirse mediante el servidor de desarrollo.

## Comandos disponibles

| Comando | Descripción |
| --- | --- |
| `npm run dev` | Inicia Vite en modo desarrollo con recarga en caliente. |
| `npm run build` | Genera la versión de producción en `dist/`. |
| `npm run preview` | Sirve localmente la compilación de `dist/` para revisarla. Ejecutá primero `npm run build`. |
| `npm run lint` | Ejecuta ESLint para revisar el código. |

## Funcionalidad incluida

- Navegación entre Catálogo, Nosotros, Panel, Ingresar, Registrarse y Lista de deseos.
- Enlaces activos indicados en la barra de navegación.
- Menú hamburguesa para pantallas de hasta 768 px; se cierra al navegar y con la tecla `Escape`.
- Barra preparada para visitante, usuario y administrador.
- Acceso a la lista de deseos y contador opcional para usuarios autenticados.
- Estilos globales y tipografía Archivo.

La barra recibe datos de usuario por propiedades, pero este repositorio todavía no implementa autenticación. Actualmente `App` la muestra en modo visitante. Las rutas no encontradas redirigen al Catálogo.

## Estructura principal

```text
.
├── index.html                  # Documento HTML de entrada de Vite
├── src/
│   ├── main.jsx                # Inicializa React y BrowserRouter
│   ├── App.jsx                 # Barra de navegación y rutas de la aplicación
│   ├── index.css               # Estilos globales
│   ├── components/
│   │   └── Navbar/
│   │       ├── Navbar.jsx      # Componente de navegación
│   │       └── Navbar.css      # Estilos de la navegación
│   ├── assets/                 # Recursos de la aplicación
│   └── pro/                    # Material de referencia del componente
├── package.json
└── vite.config.js
```

## Barra de navegación

El componente se encuentra en `src/components/Navbar/` y utiliza `react-router-dom`. Como se renderiza dentro de `BrowserRouter` en `src/main.jsx`, al integrarlo en otra parte de la aplicación debe conservarse ese proveedor de rutas.

```jsx
import Navbar from "./components/Navbar/Navbar";

<Navbar
  user={user}
  onLogout={handleLogout}
  wishlistCount={wishlist.length}
/>
```

| Propiedad | Tipo | Descripción |
| --- | --- | --- |
| `user` | `null` o `{ nombre: string, rol: "admin" \| "user" }` | Usuario actual. Si es `null` (valor predeterminado), se muestran las opciones para visitantes. |
| `onLogout` | función | Acción de cierre de sesión. Debe proporcionarse cuando se muestra un usuario autenticado. |
| `wishlistCount` | número | Cantidad de productos deseados; es opcional y su valor predeterminado es `0`. |

El enlace Panel se muestra únicamente cuando `user.rol` es `"admin"`. El corazón de deseos se muestra cuando hay un usuario. La barra consume el estado de autenticación y deseos desde sus propiedades; no los administra por sí misma.

## Rutas actuales

| Ruta | Sección |
| --- | --- |
| `/` | Catálogo |
| `/nosotros` | Nosotros |
| `/panel` | Panel |
| `/login` | Ingresar |
| `/registro` | Registrarse |
| `/deseos` | Lista de deseos |

Las rutas están declaradas en `src/App.jsx`. Actualmente cada una muestra un encabezado de prueba; reemplazalo por las páginas correspondientes al desarrollar la tienda.

## Tecnologías

- [React](https://react.dev/) y React DOM
- [Vite](https://vite.dev/)
- [React Router](https://reactrouter.com/)
- [ESLint](https://eslint.org/)

La tipografía Archivo se carga desde Google Fonts, por lo que requiere conexión a Internet para mostrarse; se utilizan fuentes del sistema como alternativa.
