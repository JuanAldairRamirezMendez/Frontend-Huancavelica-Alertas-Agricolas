// Formulario de registro de agricultores
export const provincia = [
  'Huancavelica (Ciudad)',
  'Provincia de Acobamba',
  'Provincia de Angaraes',
  'Provincia de Castrovirreyna',
  'Provincia de Churcampa',
  'Provincia de Huaytará',
  'Provincia de Tayacaja',
  'Otro distrito de Huancavelica'
];

export const extensiones = [
  { value: 'menos-1', label: 'Menos de 1 hectárea' },
  { value: '1-5', label: '1 - 5 hectáreas' },
  { value: '5-20', label: '5 - 20 hectáreas' },
  { value: 'mas-20', label: 'Más de 20 hectáreas' },
];

export const cultivos = ['Papa', 'Maíz', 'Quinua', 'Arroz', 'Café', 'Cacao'];

export const problemas = [
  { value: 'nunca', label: 'Nunca' },
  { value: 'ocasionalmente', label: 'Ocasionalmente' },
  { value: 'frecuentemente', label: 'Frecuentemente' },
  { value: 'muy-frecuente', label: 'Muy frecuentemente' },
];

export const medios = [
  { value: 'sms', label: 'SMS' },
  { value: 'Telegram', label: 'Telegram' },
  { value: 'email', label: 'Correo electrónico' },
  { value: 'app', label: 'Aplicación móvil' },
];

export const experiencias = [
  { value: 'menos-2', label: 'Menos de 2 años' },
  { value: '2-5', label: '2 - 5 años' },
  { value: '6-10', label: '6 - 10 años' },
  { value: '11-20', label: '11 - 20 años' },
  { value: 'mas-20', label: 'Más de 20 años' },
];

export const prediccion = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'a-veces', label: 'A veces' },
];

export const importancia = [
  { value: 'muy-importante', label: 'Muy importante' },
  { value: 'importante', label: 'Importante' },
  { value: 'poco-importante', label: 'Poco importante' },
  { value: 'no-importante', label: 'No es importante' },
];
// Constantes para la aplicación

export const SEVERITY_COLORS = {
  alto: '#dc2626',   // Rojo Alto
  medio: '#f59e0b',  // Amarillo Medio  
  bajo: '#10b981'    // Verde Bajo
} as const;

export const DESIGN_COLORS = {
  verdeAgricultura: '#22c55e',
  verdeOscuro: '#166534',
  azulConfianza: '#3b82f6',
  rojoAlto: '#dc2626',
  amarilloMedio: '#f59e0b',
  verdeBajo: '#10b981'
} as const;

export const ALERT_TYPES = {
  lluvia_intensa: 'Lluvia Intensa',
  helada: 'Helada',
  sequia: 'Sequía',
  granizo: 'Granizo',
  viento_fuerte: 'Viento Fuerte'
} as const;

export const CROP_TYPES = {
  papa: 'Papa',
  maiz: 'Maíz',
  quinua: 'Quinua',
  cebada: 'Cebada',
  habas: 'Habas',
  otro: 'Otro'
} as const;

export const PHONE_PATTERN = /^\+51\d{9}$/;

export const MIN_BUTTON_SIZE = 44; // px - Criterio de accesibilidad

export const DATE_RANGES = {
  last7days: 7,
  last15days: 15,
  last30days: 30
} as const;