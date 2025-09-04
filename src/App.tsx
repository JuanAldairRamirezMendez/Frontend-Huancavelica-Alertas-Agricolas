import React, { useState } from 'react';
import './App.css';

type FormData = {
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  region: string;
  extension: string;
  cultivos: string[];
  problemas_clima: string;
  altitud: string;
  medio_alerta: string;
  experiencia: string;
  usa_prediccion: string;
  importancia_recomendaciones: string;
  comentarios: string;
};

const regiones = [
  'Lima', 'Cusco', 'Arequipa', 'La Libertad', 'Piura', 'Junín', 'Cajamarca', 'Otro'
];

const extensiones = [
  { value: 'menos-1', label: 'Menos de 1 hectárea' },
  { value: '1-5', label: '1 - 5 hectáreas' },
  { value: '5-20', label: '5 - 20 hectáreas' },
  { value: 'mas-20', label: 'Más de 20 hectáreas' },
];

const cultivos = ['Papa', 'Maíz', 'Quinua', 'Arroz', 'Café', 'Cacao'];

const problemas = [
  { value: 'nunca', label: 'Nunca' },
  { value: 'ocasionalmente', label: 'Ocasionalmente' },
  { value: 'frecuentemente', label: 'Frecuentemente' },
  { value: 'muy-frecuente', label: 'Muy frecuentemente' },
];

const medios = [
  { value: 'sms', label: 'SMS' },
  { value: 'whatsapp', label: 'WhatsApp' },
  { value: 'email', label: 'Correo electrónico' },
  { value: 'app', label: 'Aplicación móvil' },
];

const experiencias = [
  { value: 'menos-2', label: 'Menos de 2 años' },
  { value: '2-5', label: '2 - 5 años' },
  { value: '6-10', label: '6 - 10 años' },
  { value: '11-20', label: '11 - 20 años' },
  { value: 'mas-20', label: 'Más de 20 años' },
];

const prediccion = [
  { value: 'si', label: 'Sí' },
  { value: 'no', label: 'No' },
  { value: 'a-veces', label: 'A veces' },
];

const importancia = [
  { value: 'muy-importante', label: 'Muy importante' },
  { value: 'importante', label: 'Importante' },
  { value: 'poco-importante', label: 'Poco importante' },
  { value: 'no-importante', label: 'No es importante' },
];

function App() {
  const [form, setForm] = useState<FormData>({
    nombre: '', dni: '', telefono: '', email: '', region: '', extension: '', 
    cultivos: [], problemas_clima: '', altitud: '', medio_alerta: '', 
    experiencia: '', usa_prediccion: '', importancia_recomendaciones: '', comentarios: ''
  });

  const [showHelpModal, setShowHelpModal] = useState(false);
  const [currentTip, setCurrentTip] = useState(0);
  const [showSuccessAnimation, setShowSuccessAnimation] = useState('');
  const [showWelcomeAnimation, setShowWelcomeAnimation] = useState(true);

  const tips = [
    {
      icon: '⏰',
      title: 'Sin prisa',
      message: 'Puede tomarse todo el tiempo que necesite. No hay límite de tiempo.'
    },
    {
      icon: '💾',
      title: 'Se guarda solo',
      message: 'Sus datos se guardan automáticamente cada pocos segundos. No se preocupe por perder información.'
    },
    {
      icon: '⏸️',
      title: 'Pause cuando guste',
      message: 'Puede cerrar esta página y continuar después. Su progreso se mantiene guardado.'
    },
    {
      icon: '🆘',
      title: '¿Necesita ayuda?',
      message: 'Cada campo tiene instrucciones claras y ejemplos para guiarle.'
    },
    {
      icon: '📱',
      title: 'Recordatorio amigable',
      message: 'Le enviaremos un mensaje amigable para continuar cuando lo desee.'
    }
  ];

  // Calcular progreso
  const calculateProgress = () => {
    const fields = ['nombre', 'dni', 'telefono', 'email', 'region', 'extension', 'problemas_clima', 'altitud', 'medio_alerta', 'experiencia', 'usa_prediccion', 'importancia_recomendaciones'];
    const filled = fields.filter(field => form[field as keyof FormData] !== '').length + (form.cultivos.length > 0 ? 1 : 0);
    return Math.round((filled / (fields.length + 1)) * 100);
  };

  const progress = calculateProgress();

  // Guardado automático simple
  React.useEffect(() => {
    localStorage.setItem('agriculturalForm', JSON.stringify(form));
  }, [form]);

  // Cargar datos guardados
  React.useEffect(() => {
    const savedForm = localStorage.getItem('agriculturalForm');
    if (savedForm) {
      setForm(JSON.parse(savedForm));
    }
    // Ocultar animación de bienvenida después de 3 segundos
    setTimeout(() => setShowWelcomeAnimation(false), 3000);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      setForm(prev => ({
        ...prev,
        cultivos: checked
          ? [...prev.cultivos, value]
          : prev.cultivos.filter(c => c !== value)
      }));
    } else {
      setForm(prev => ({ ...prev, [name]: value }));
      
      // Mostrar animación de éxito cuando completen un campo
      if (value && !form[name as keyof FormData]) {
        setShowSuccessAnimation(name);
        setTimeout(() => setShowSuccessAnimation(''), 1500);
      }
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('¡Formulario enviado exitosamente!');
    console.log('Datos del formulario:', form);
  };

  return (
    <div className="fixed inset-0 w-screen h-screen bg-gradient-to-br from-green-300 via-blue-200 to-purple-300 overflow-auto">
      <div className="min-h-screen w-full py-4 px-2 sm:py-8 sm:px-4 lg:px-8">
        <div className="max-w-4xl mx-auto bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl p-4 sm:p-6 lg:p-10 shadow-xl">
        
        {/* Encabezado con animaciones */}
        <div className="text-center mb-6 sm:mb-8 animate-fade-in">
          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-green-700 mb-3 flex items-center justify-center gap-2">
            🌾 Sistema Agrícola 🌾
          </h1>
          <p className="text-gray-600 text-base sm:text-lg lg:text-xl mb-4 font-medium">
            Formulario de Registro
          </p>
          
          {/* Mensaje de bienvenida con animación */}
          {showWelcomeAnimation && (
            <div className="animate-fade-in bg-gradient-to-r from-green-100 to-blue-100 p-4 rounded-lg border border-green-200 mb-4 animate-glow">
              <div className="flex items-center justify-center gap-2 text-green-700">
                <span className="text-2xl animate-bounce">👋</span>
                <p className="font-semibold">¡Bienvenido! Vamos paso a paso, sin prisa</p>
                <span className="text-2xl animate-bounce delay-150">😊</span>
              </div>
            </div>
          )}
          
          {/* Barra de progreso con animaciones */}
          {/* Barra de progreso con animaciones */}
          <div className="max-w-md mx-auto mb-6 animate-fade-in delay-500">
            <div className="flex justify-between text-sm font-medium text-gray-600 mb-2">
              <span>Progreso</span>
              <span className="text-green-600 font-bold animate-bounce">{progress}%</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-3 overflow-hidden">
              <div 
                className="bg-gradient-to-r from-green-400 to-green-500 h-3 rounded-full transition-all duration-1000 ease-out animate-shimmer"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="flex justify-center mt-3">
              {progress === 100 && (
                <div className="animate-bounce bg-green-100 text-green-600 px-4 py-2 rounded-full border border-green-300">
                  <span className="text-sm font-bold flex items-center gap-2">
                    <span className="animate-spin">✨</span> 
                    ¡Formulario completado! 
                    <span className="animate-spin">✨</span>
                  </span>
                </div>
              )}
              {progress > 0 && progress < 30 && (
                <div className="animate-fade-in bg-blue-50 text-blue-600 px-3 py-2 rounded-full border border-blue-200">
                  <span className="text-xs font-medium flex items-center gap-2">
                    <span className="animate-pulse">🌱</span> 
                    ¡Excelente inicio! Siga a su ritmo
                  </span>
                </div>
              )}
              {progress >= 30 && progress < 60 && (
                <div className="animate-fade-in bg-yellow-50 text-yellow-600 px-3 py-2 rounded-full border border-yellow-200">
                  <span className="text-xs font-medium flex items-center gap-2">
                    <span className="animate-pulse">🌿</span> 
                    ¡Muy buen progreso! Va por buen camino
                  </span>
                </div>
              )}
              {progress >= 60 && progress < 100 && (
                <div className="animate-fade-in bg-green-50 text-green-600 px-3 py-2 rounded-full border border-green-200">
                  <span className="text-xs font-medium flex items-center gap-2">
                    <span className="animate-pulse">🌟</span> 
                    ¡Casi terminado! Solo faltan algunos campos
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Datos Personales con animaciones */}
          <div className="bg-blue-50 p-6 rounded-xl border border-blue-200 animate-fade-in delay-700 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-blue-700 mb-4 flex items-center gap-2 animate-float">
              <span className="animate-bounce">👤</span> 
              Datos Personales
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="relative">
                <label className="block mb-2 font-medium text-gray-700 text-base">
                  Nombre completo *
                  {form.nombre && (
                    <span className={`ml-2 text-green-500 animate-bounce ${showSuccessAnimation === 'nombre' ? 'animate-pulse' : ''}`}>
                      ✓
                    </span>
                  )}
                </label>
                {showSuccessAnimation === 'nombre' && (
                  <div className="absolute -top-2 -right-2 text-green-500 text-2xl animate-bounce">
                    🎉
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded border-l-4 border-blue-300">
                    💡 <strong>Instrucción:</strong> Escriba su nombre completo como aparece en su DNI
                  </p>
                  <input 
                    name="nombre" 
                    value={form.nombre} 
                    onChange={handleChange} 
                    required 
                    className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 ${
                      form.nombre 
                        ? 'border-green-300 focus:border-green-500 bg-green-50/30' 
                        : 'border-gray-300 focus:border-green-500 hover:border-green-300'
                    }`} 
                    placeholder="Ejemplo: Juan Carlos Pérez López" 
                  />
                  {form.nombre.length > 0 && form.nombre.length < 3 && (
                    <p className="text-xs text-amber-600 flex items-center gap-1">
                      <span>⚠️</span> Por favor, ingrese su nombre completo
                    </p>
                  )}
                </div>
              </div>

              <div className="relative">
                <label className="block mb-2 font-medium text-gray-700 text-base">
                  DNI *
                  {form.dni.length === 8 && (
                    <span className={`ml-2 text-green-500 animate-bounce ${showSuccessAnimation === 'dni' ? 'animate-pulse' : ''}`}>
                      ✓
                    </span>
                  )}
                </label>
                {showSuccessAnimation === 'dni' && (
                  <div className="absolute -top-2 -right-2 text-green-500 text-2xl animate-bounce">
                    🎊
                  </div>
                )}
                <div className="space-y-2">
                  <p className="text-xs text-gray-500 bg-blue-50 p-2 rounded border-l-4 border-blue-300">
                    💡 <strong>Instrucción:</strong> Ingrese solo los 8 números de su DNI (sin puntos ni guiones)
                  </p>
                  <input 
                    name="dni" 
                    value={form.dni} 
                    onChange={e => {
                      const val = e.target.value.replace(/[^0-9]/g, '').substring(0,8);
                      setForm(prev => ({ ...prev, dni: val }));
                    }} 
                    required 
                    maxLength={8}
                    className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 font-mono text-center tracking-widest ${
                      form.dni.length === 8 
                        ? 'border-green-300 focus:border-green-500 bg-green-50/30' 
                        : 'border-gray-300 focus:border-green-500 hover:border-green-300'
                    }`} 
                    placeholder="12345678" 
                  />
                  <div className="flex items-center justify-between text-xs">
                    <div className={`${form.dni.length === 8 ? 'text-green-600' : 'text-gray-500'}`}>
                      Dígitos: {form.dni.length}/8
                    </div>
                    {form.dni.length > 0 && form.dni.length < 8 && (
                      <p className="text-amber-600 flex items-center gap-1">
                        <span>⚠️</span> Faltan {8 - form.dni.length} dígitos
                      </p>
                    )}
                    {form.dni.length === 8 && (
                      <p className="text-green-600 flex items-center gap-1">
                        <span>✅</span> DNI completo
                      </p>
                    )}
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 text-base">
                  Teléfono *
                </label>
                <input 
                  name="telefono" 
                  value={form.telefono} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200" 
                  placeholder="+51 999 888 777" 
                />
              </div>

              <div>
                <label className="block mb-2 font-medium text-gray-700 text-base">
                  Email *
                </label>
                <input 
                  name="email" 
                  type="email" 
                  value={form.email} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200" 
                  placeholder="ejemplo@correo.com" 
                />
              </div>
            </div>
          </div>

          {/* Información Agrícola con animaciones */}
          <div className="bg-green-50 p-6 rounded-xl border border-green-200 animate-fade-in delay-1000 hover:shadow-lg transition-all duration-300">
            <h2 className="text-xl font-bold text-green-700 mb-4 flex items-center gap-2 animate-float">
              <span className="animate-bounce delay-75">🌱</span> 
              Información Agrícola
            </h2>
            
            <div className="space-y-6">
              {/* Región */}
              <div>
                <label className="block mb-2 font-medium text-gray-700 text-base">
                  1. ¿En qué región se encuentra su cultivo? *
                </label>
                <select 
                  name="region" 
                  value={form.region} 
                  onChange={handleChange} 
                  required 
                  className="w-full px-4 py-3 text-base border-2 border-gray-300 rounded-lg focus:border-green-500 focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200"
                >
                  <option value="">Seleccione una región</option>
                  {regiones.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
                </select>
              </div>

              {/* Extensión */}
              <div>
                <label className="block mb-3 font-medium text-gray-700 text-base">
                  2. Extensión de su terreno:
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {extensiones.map(ext => (
                    <label key={ext.value} className="flex items-center p-3 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-green-500 transition-all duration-200">
                      <input 
                        type="radio" 
                        name="extension" 
                        value={ext.value} 
                        checked={form.extension === ext.value} 
                        onChange={handleChange} 
                        className="mr-3 text-green-500" 
                      />
                      <span className="text-base">{ext.label}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Cultivos */}
              <div>
                <label className="block mb-3 font-medium text-gray-700 text-base">
                  3. ¿Qué cultivos maneja? (Seleccione los que apliquen)
                  {form.cultivos.length > 0 && (
                    <span className="ml-2 bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold">
                      {form.cultivos.length} seleccionado{form.cultivos.length > 1 ? 's' : ''}
                    </span>
                  )}
                </label>
                <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                  {cultivos.map(c => {
                    const isSelected = form.cultivos.includes(c);
                    const iconMap = {
                      'Papa': '🥔', 'Maíz': '🌽', 'Quinua': '🌾', 
                      'Arroz': '🌾', 'Café': '☕', 'Cacao': '🍫'
                    };
                    return (
                      <label key={c} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${
                        isSelected 
                          ? 'bg-green-100 border-green-400 text-green-800' 
                          : 'bg-white border-gray-300 hover:border-green-400 hover:bg-green-50'
                      }`}>
                        <input 
                          type="checkbox" 
                          name="cultivos" 
                          value={c} 
                          checked={isSelected} 
                          onChange={handleChange} 
                          className="sr-only" 
                        />
                        <span className="text-lg mr-2">{iconMap[c as keyof typeof iconMap]}</span>
                        <span className="text-base font-medium">{c}</span>
                        {isSelected && (
                          <span className="ml-auto text-green-500">✓</span>
                        )}
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Problemas climáticos */}
              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  4. ¿Con qué frecuencia experimenta problemas climáticos?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {problemas.map(p => (
                    <label key={p.value} className="flex items-center p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="problemas_clima" 
                        value={p.value} 
                        checked={form.problemas_clima === p.value} 
                        onChange={handleChange} 
                        className="mr-3" 
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Altitud */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  5. ¿A qué altitud se encuentra su cultivo? (metros)
                </label>
                <input 
                  name="altitud" 
                  type="number" 
                  min="0" 
                  max="5000" 
                  value={form.altitud} 
                  onChange={handleChange} 
                  placeholder="Ej: 3200" 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500" 
                />
              </div>

              {/* Medio de alerta */}
              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  6. ¿Qué medio prefiere para recibir alertas?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {medios.map(m => (
                    <label key={m.value} className="flex items-center p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="medio_alerta" 
                        value={m.value} 
                        checked={form.medio_alerta === m.value} 
                        onChange={handleChange} 
                        className="mr-3" 
                      />
                      {m.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Experiencia */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  7. ¿Cuántos años de experiencia tiene en agricultura?
                </label>
                <select 
                  name="experiencia" 
                  value={form.experiencia} 
                  onChange={handleChange} 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500"
                >
                  <option value="">Seleccione su experiencia</option>
                  {experiencias.map(e => <option key={e.value} value={e.value}>{e.label}</option>)}
                </select>
              </div>

              {/* Predicción */}
              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  8. ¿Utiliza algún sistema de predicción climática?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  {prediccion.map(p => (
                    <label key={p.value} className="flex items-center p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="usa_prediccion" 
                        value={p.value} 
                        checked={form.usa_prediccion === p.value} 
                        onChange={handleChange} 
                        className="mr-3" 
                      />
                      {p.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Importancia */}
              <div>
                <label className="block mb-3 font-medium text-gray-700">
                  9. ¿Qué tan importante considera recibir recomendaciones personalizadas?
                </label>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  {importancia.map(i => (
                    <label key={i.value} className="flex items-center p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                      <input 
                        type="radio" 
                        name="importancia_recomendaciones" 
                        value={i.value} 
                        checked={form.importancia_recomendaciones === i.value} 
                        onChange={handleChange} 
                        className="mr-3" 
                      />
                      {i.label}
                    </label>
                  ))}
                </div>
              </div>

              {/* Comentarios */}
              <div>
                <label className="block mb-2 font-medium text-gray-700">
                  10. Comentarios adicionales (Opcional)
                </label>
                <textarea 
                  name="comentarios" 
                  value={form.comentarios} 
                  onChange={handleChange} 
                  rows={4} 
                  placeholder="Escriba sus sugerencias aquí..." 
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:border-green-500 focus:ring-1 focus:ring-green-500 resize-none" 
                />
              </div>
            </div>
          </div>

          {/* Botón Continuar Después - Mejora #5 */}
          <div className="text-center">
            <button
              type="button"
              onClick={() => alert('📱 Te enviaremos un recordatorio amigable para continuar cuando puedas. ¡Sin presión!')}
              className="mb-4 bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 text-blue-700 py-3 px-6 rounded-full font-semibold shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200 flex items-center gap-2 mx-auto"
            >
              <span className="text-lg">⏰</span>
              Continuar después
            </button>
          </div>

          {/* Botón de envío */}
          <div className="text-center">
            <button 
              type="submit" 
              disabled={progress < 50}
              className={`py-4 px-12 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${
                progress >= 50 
                  ? 'bg-green-500 hover:bg-green-600 text-white cursor-pointer hover:scale-105' 
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              {progress < 50 ? 'Complete más campos...' : 'Enviar Formulario'}
            </button>
            
            <p className="mt-3 text-sm text-gray-600">
              {progress < 50 ? 
                'Complete al menos el 50% del formulario' : 
                '¡Listo para enviar!'
              }
            </p>
          </div>
        </form>
      </div>
      </div>
      
      {/* Chatbot de Ayuda Flotante - Versión Simple que Funciona */}
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={() => {
            console.log('Botón de ayuda clickeado');
            setShowHelpModal(true);
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:shadow-xl transform hover:scale-110 transition-all duration-300"
          title="Ayuda y Consejos"
          type="button"
        >
          <span className="text-2xl">💡</span>
        </button>
      </div>

      {/* Modal de Ayuda - Versión Simplificada */}
      {showHelpModal && (
        <div 
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
          onClick={() => setShowHelpModal(false)}
        >
          <div 
            className="bg-white rounded-2xl max-w-md w-full mx-4 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="bg-blue-500 text-white p-6 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-xl font-bold">Asistente de Ayuda</h3>
                </div>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-white hover:text-gray-200 text-2xl font-bold leading-none"
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="bg-blue-50 rounded-lg p-4 mb-4 border border-blue-200">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{tips[currentTip]?.icon || '💡'}</span>
                  <h4 className="font-bold text-blue-700 text-lg">{tips[currentTip]?.title || 'Ayuda'}</h4>
                </div>
                <p className="text-gray-700 leading-relaxed">{tips[currentTip]?.message || 'Contenido de ayuda'}</p>
              </div>
              
              <div className="flex justify-between items-center mb-4">
                <button
                  onClick={() => setCurrentTip(currentTip > 0 ? currentTip - 1 : tips.length - 1)}
                  className="bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  <span>←</span> Anterior
                </button>
                
                <div className="flex gap-1">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${
                        index === currentTip ? 'bg-blue-500' : 'bg-gray-300'
                      }`}
                    />
                  ))}
                </div>
                
                <button
                  onClick={() => setCurrentTip(currentTip < tips.length - 1 ? currentTip + 1 : 0)}
                  className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg transition-all duration-200 flex items-center gap-2"
                >
                  Siguiente <span>→</span>
                </button>
              </div>
              
              <div className="text-center">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold transition-all duration-200"
                >
                  ¡Entendido! 👍
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
