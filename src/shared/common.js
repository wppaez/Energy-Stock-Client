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
  'Precio Bolsa de Energía',
  'Precio Energia Costa Atl.',
];

export const MODELS = [
  { name: 'Seleccione su modelo', variable: 'Seleccione su variable' },
  { name: 'ARIMA', variable: 'Precio Bolsa de Energía' },
  { name: 'Exponencial Doble', variable: 'Precio Bolsa de Energía' },
  { name: 'GARCH', variable: 'Precio Bolsa de Energía' },
  { name: 'TAR', variable: 'Precio Bolsa de Energía' },
  { name: 'Gradient Boosting', variable: 'Precio Energia Costa Atl.' },
  { name: 'Red Neuronal', variable: 'Precio Energia Costa Atl.' },
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

  static formatDate(date, format = 'yyyy-MM-dd') {
    try {
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
    const days = ['Lu.', 'Mar.', 'Mie.', 'Jue.', 'Vie.', 'Sa.', 'Dom.'];

    return {
      localize: {
        month: n => months[n],
        day: n => days[n],
      },
      formatLong: {},
    };
  }
}
