import chroma from 'chroma-js';

/**
 * bolsa 4:
 *  Arima
 *  expo_2
 *  GARCH
 *  TAR
 * energia 4
 */

export const VARIABLES = [
  'Seleccione su variable',
  'Bolsa de Energia',
  'Precio Unitario',
];

export const MODELS = [
  { name: 'Seleccione su modelo', variable: VARIABLES[0] },
  { name: 'ARIMA', variable: VARIABLES[1] },
  { name: 'Exponencial Doble', variable: VARIABLES[1] },
  { name: 'GARCH', variable: VARIABLES[1] },
  { name: 'SETAR', variable: VARIABLES[1] },
  { name: 'ARIMA', variable: VARIABLES[2] },
  { name: 'Proceso Gaussiano', variable: VARIABLES[2] },
  { name: 'SVM', variable: VARIABLES[2] },
  { name: 'Red Neuronal', variable: VARIABLES[2] },
];

export class DateHelper {
  static getCurrentTime(offset = false) {
    const d = new Date();
    d.setHours(0);
    d.setMinutes(0);
    d.setSeconds(0);
    d.setMilliseconds(0);
    if (offset) return new Date(d.getTime() + 24 * 60 * 60 * 1000);
    return d;
  }

  static formatDate(date, format = 'yyyy-MM-dd', getNext = false) {
    try {
      if (getNext) date = new Date(date.getTime() + 24 * 60 * 60 * 1000);
      const years = date.getFullYear().toString();
      const months = (date.getMonth() + 1).toString().padStart(2, '0');
      const day = date.getDate().toString().padStart(2, '0');
      return format
        .replace('yyyy', years)
        .replace('MM', months)
        .replace('dd', day);
    } catch (error) {
      return 'Sin seleccionar';
    }
  }

  static d3Format(date) {
    const years = date.getFullYear().toString();
    const months = (date.getMonth() + 1).toString().padStart(2, '0');
    const day = date.getDate().toString().padStart(2, '0');
    return `${years}-${months}-${day}`;
  }

  static locale() {
    const months = [
      'Enero',
      'Febrero',
      'Marzo',
      'Abril',
      'Mayo',
      'Junio',
      'Julio',
      'Agosto',
      'Septiembre',
      'Octubre',
      'Noviembre',
      'Diciembre',
    ];
    const days = ['Dom.', 'Lun.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sab.'];

    return {
      localize: {
        month: n => months[n],
        day: n => days[n],
      },
      formatLong: {},
    };
  }
}

export class ChromaHelper {
  static brighten(color, delta) {
    return chroma(color).brighten(delta);
  }
}
