import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Navbar.css";

/**
 * Navbar de Ecommerce Pro
 *
 * Props:
 *  - user:           null (visitante) o { nombre: string, rol: "admin" | "user" }
 *  - onLogout:       función que se ejecuta al tocar "Salir"
 *  - wishlistCount:  cantidad de productos en deseos (opcional)
 */
export default function Navbar({ user = null, onLogout, wishlistCount = 0 }) {
  const [open, setOpen] = useState(false);
  const isAdmin = user?.rol === "admin";

  // Cierra el menú con Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const linkClass = ({ isActive }) =>
    "navbar__link" + (isActive ? " navbar__link--active" : "");

  return (
    <header className="navbar">
      <div className="navbar__inner">
        <Link
          to="/"
          className="navbar__logo"
          aria-label="Ecommerce Pro, ir al inicio"
          onClick={() => setOpen(false)}
        >
          ECOMMERCE <span>PRO</span>
        </Link>

        {user && (
          <Link
            to="/deseos"
            className="navbar__icon-btn navbar__heart"
            onClick={() => setOpen(false)}
            aria-label={
              wishlistCount > 0
                ? `Lista de deseos, ${wishlistCount} productos`
                : "Lista de deseos"
            }
          >
            <HeartIcon />
            {wishlistCount > 0 && (
              <span className="navbar__badge">{wishlistCount}</span>
            )}
          </Link>
        )}

        <button
          type="button"
          className="navbar__toggle"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          aria-expanded={open}
          aria-controls="navbar-menu"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <CloseIcon /> : <MenuIcon />}
        </button>

        <div
          id="navbar-menu"
          className={"navbar__menu" + (open ? " navbar__menu--open" : "")}
        >
          <nav className="navbar__links" aria-label="Principal">
            <NavLink
              to="/"
              end
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Catálogo
            </NavLink>
            <NavLink
              to="/nosotros"
              className={linkClass}
              onClick={() => setOpen(false)}
            >
              Nosotros
            </NavLink>
            {isAdmin && (
              <NavLink
                to="/panel"
                className={linkClass}
                onClick={() => setOpen(false)}
              >
                Panel
              </NavLink>
            )}
          </nav>

          {!user && (
            <>
              <Link
                to="/login"
                className="navbar__btn navbar__btn--outline"
                onClick={() => setOpen(false)}
              >
                Ingresar
              </Link>
              <Link
                to="/registro"
                className="navbar__btn navbar__btn--solid"
                onClick={() => setOpen(false)}
              >
                Registrarse
              </Link>
            </>
          )}

          {user && (
            <>
              {isAdmin ? (
                <span className="navbar__admin-badge">ADMIN</span>
              ) : (
                <span className="navbar__greeting">Hola, {user.nombre}</span>
              )}
              <button
                type="button"
                className="navbar__btn navbar__btn--outline navbar__logout"
                onClick={() => {
                  setOpen(false);
                  onLogout();
                }}
              >
                Salir
              </button>
            </>
          )}
        </div>
      </div>
    </header>
  );
}

function HeartIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M20.8 4.6a5.5 5.5 0 0 0-7.8 0L12 5.7l-1-1.1a5.5 5.5 0 0 0-7.8 7.8l1 1.1L12 21l7.8-7.5 1-1.1a5.5 5.5 0 0 0 0-7.8z" />
    </svg>
  );
}

function MenuIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M3 6h18M3 12h18M3 18h18" />
    </svg>
  );
}

function CloseIcon() {
  return (
    <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor"
         strokeWidth="2" strokeLinecap="round" aria-hidden="true">
      <path d="M6 6l12 12M18 6L6 18" />
    </svg>
  );
}
