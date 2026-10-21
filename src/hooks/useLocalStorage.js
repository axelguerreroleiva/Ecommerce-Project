import { useEffect, useState } from 'react';

/**
 * Lee un valor de LocalStorage.
 * Si no existe (o está corrupto) devuelve el valor inicial.
 */
function readStorage(key, initialValue) {
  try {
    const raw = localStorage.getItem(key);
    return raw !== null ? JSON.parse(raw) : initialValue;
  } catch {
    return initialValue;
  }
}

/**
 * Funciona igual que useState, pero el valor queda guardado en LocalStorage.
 *
 *   const [productos, setProductos] = useLocalStorage('ecp_products', semilla);
 *
 * Este es el ÚNICO lugar de la app donde se escribe en LocalStorage.
 */
export default function useLocalStorage(key, initialValue) {
  // 1) Al montar: leemos lo guardado (la función se ejecuta una sola vez).
  const [value, setValue] = useState(() => readStorage(key, initialValue));

  // 2) useEffect: cada vez que `value` cambia, se guarda automáticamente.
  useEffect(() => {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`No se pudo guardar "${key}" en LocalStorage`, error);
    }
  }, [key, value]);

  // 3) Sincronización entre pestañas: si otra pestaña modifica la clave,
  //    el evento "storage" nos avisa y actualizamos el estado local.
  useEffect(() => {
    const onStorage = (event) => {
      if (event.key === key && event.newValue !== null) {
        setValue(JSON.parse(event.newValue));
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, [key]);

  return [value, setValue];
}
