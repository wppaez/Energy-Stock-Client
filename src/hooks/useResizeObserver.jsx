import { useEffect, useState } from 'react';
import ResizeObserver from 'resize-observer-polyfill';

/**
 * Hook que se encarga de estar pendiente de los cambios en el viewport y
 * actualizar el alto y ancho de un elemento.
 * @param {any} ref referencia del nodo HTML a observar.
 */
export const useResizeObserver = ref => {
  const [dimensions, setDimensions] = useState(null);
  useEffect(() => {
    const observeTarget = ref.current;
    const resizeObserver = new ResizeObserver(entries => {
      entries.forEach(entry => {
        setDimensions(entry.contentRect);
      });
    });
    resizeObserver.observe(observeTarget);
    return () => {
      resizeObserver.unobserve(observeTarget);
    };
  }, [ref]);
  return dimensions;
};
