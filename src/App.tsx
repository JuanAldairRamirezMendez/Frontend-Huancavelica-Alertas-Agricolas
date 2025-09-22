import React, { useState } from 'react';
import './App.css';
import {
  provincia,
  extensiones,
  cultivos,
  problemas,
  medios,
  experiencias,
  prediccion,
  importancia
} from './constantes';

type FormData = {
  nombre: string;
  dni: string;
  telefono: string;
  email: string;
  provincia: string;
  extension: string;
  cultivos: string[];
  problemas_clima: string;
  altitud: string;
  medio_alerta: string[];
  experiencia: string;
  usa_prediccion: string;
  importancia_recomendaciones: string;
  comentarios: string;
};

function App() {
  const [form, setForm] = useState<FormData>({
    nombre: '', dni: '', telefono: '', email: '', provincia: '', extension: '',
    cultivos: [], problemas_clima: '', altitud: '', medio_alerta: [],
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
    const fields = [
      'nombre', 'dni', 'telefono', 'email', 'provincia', 'extension',
      'problemas_clima', 'altitud', 'experiencia', 'usa_prediccion',
      'importancia_recomendaciones'
      // NO incluyas 'cultivos' aquí
    ];
    let filled = fields.filter(field => {
      if (Array.isArray(form[field as keyof FormData])) {
        return (form[field as keyof FormData] as string[]).length > 0;
      }
      return form[field as keyof FormData] !== '';
    }).length;

    // Suma 1 si hay al menos un medio de alerta seleccionado (obligatorio)
    if (form.medio_alerta.length > 0) filled++;

    // Total de campos a completar (NO incluye cultivos)
    const total = fields.length + 1;

    return Math.round((filled / total) * 100);
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

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { name, value, type } = e.target;
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked;
      if (name === 'cultivos' || name === 'medio_alerta') {
        setForm(prev => ({
          ...prev,
          [name]: checked
            ? [...(prev[name as keyof FormData] as string[]), value]
            : (prev[name as keyof FormData] as string[]).filter(v => v !== value)
        }));
      }
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
    <div className="fixed inset-0 w-screen h-screen overflow-auto bg-gradient-to-br from-green-300 via-blue-200 to-purple-300">
      <div className="w-full min-h-screen px-2 py-4 sm:py-8 sm:px-4 lg:px-8">
        <div className="max-w-4xl p-4 mx-auto shadow-xl bg-white/95 backdrop-blur-sm rounded-xl sm:rounded-2xl lg:rounded-3xl sm:p-6 lg:p-10">

          {/* Encabezado con animaciones */}
          <div className="mb-6 text-center sm:mb-8 animate-fade-in">
            <h1 className="flex items-center justify-center gap-2 mb-3 text-3xl font-bold text-green-700 sm:text-4xl lg:text-5xl">
              🌾Plataforma de Alertas Tempranas para Agricultores de Huancavelica🌾
            </h1>
            <p className="mb-4 text-base font-medium text-gray-600 sm:text-lg lg:text-xl">
              Formulario de Registro de Agricultores
            </p>
            {/* Mensaje de bienvenida con animación */}
            {showWelcomeAnimation && (
              <div className="p-4 mb-4 border border-green-200 rounded-lg animate-fade-in bg-gradient-to-r from-green-100 to-blue-100 animate-glow">
                <div className="flex items-center justify-center gap-2 text-green-700">
                  <span className="text-2xl animate-bounce">👋</span>
                  <p className="font-semibold">¡Bienvenido! Vamos paso a paso, sin prisa</p>
                  <span className="text-2xl delay-150 animate-bounce">😊</span>
                </div>
              </div>
            )}

            {/* Barra de progreso con animaciones */}
            {/* Barra de progreso con animaciones */}
            <div className="max-w-md mx-auto mb-6 delay-500 animate-fade-in">
              <div className="flex justify-between mb-2 text-sm font-medium text-gray-600">
                <span>Progreso</span>
                <span className="font-bold text-green-600 animate-bounce">{progress}%</span>
              </div>
              <div className="w-full h-3 overflow-hidden bg-gray-200 rounded-full">
                <div
                  className="h-3 transition-all duration-1000 ease-out rounded-full bg-gradient-to-r from-green-400 to-green-500 animate-shimmer"
                  style={{ width: `${progress}%` }}
                />
              </div>
              <div className="flex justify-center mt-3">
                {progress === 100 && (
                  <div className="px-4 py-2 text-green-600 bg-green-100 border border-green-300 rounded-full animate-bounce">
                    <span className="flex items-center gap-2 text-sm font-bold">
                      <span className="animate-spin">✨</span>
                      ¡Formulario completado!
                      <span className="animate-spin">✨</span>
                    </span>
                  </div>
                )}
                {progress > 0 && progress < 30 && (
                  <div className="px-3 py-2 text-blue-600 border border-blue-200 rounded-full animate-fade-in bg-blue-50">
                    <span className="flex items-center gap-2 text-xs font-medium">
                      <span className="animate-pulse">🌱</span>
                      ¡Excelente inicio! Siga a su ritmo
                    </span>
                  </div>
                )}
                {progress >= 30 && progress < 60 && (
                  <div className="px-3 py-2 text-yellow-600 border border-yellow-200 rounded-full animate-fade-in bg-yellow-50">
                    <span className="flex items-center gap-2 text-xs font-medium">
                      <span className="animate-pulse">🌿</span>
                      ¡Muy buen progreso! Va por buen camino
                    </span>
                  </div>
                )}
                {progress >= 60 && progress < 100 && (
                  <div className="px-3 py-2 text-green-600 border border-green-200 rounded-full animate-fade-in bg-green-50">
                    <span className="flex items-center gap-2 text-xs font-medium">
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
            <div className="p-6 transition-all duration-300 delay-700 border border-blue-200 bg-blue-50 rounded-xl animate-fade-in hover:shadow-lg">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-blue-700 animate-float">
                <span className="animate-bounce">👤</span>
                Datos Personales
              </h2>
              <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-700">
                    Nombre completo *
                    {form.nombre && (
                      <span className={`ml-2 text-green-500 animate-bounce ${showSuccessAnimation === 'nombre' ? 'animate-pulse' : ''}`}>
                        ✓
                      </span>
                    )}
                  </label>
                  {showSuccessAnimation === 'nombre' && (
                    <div className="absolute text-2xl text-green-500 -top-2 -right-2 animate-bounce">
                      🎉
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="p-2 text-xs text-gray-500 border-l-4 border-blue-300 rounded bg-blue-50">
                      💡 <strong>Instrucción:</strong> Escriba su nombre completo como aparece en su DNI
                    </p>
                    <input
                      name="nombre"
                      value={form.nombre}
                      onChange={handleChange}
                      required
                      className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 ${form.nombre
                        ? 'border-green-300 focus:border-green-500 bg-green-50/30'
                        : 'border-gray-300 focus:border-green-500 hover:border-green-300'
                        }`}
                      placeholder="Ejemplo: Juan Carlos Pérez López"
                    />
                    {form.nombre.length > 0 && form.nombre.length < 3 && (
                      <p className="flex items-center gap-1 text-xs text-amber-600">
                        <span>⚠️</span> Por favor, ingrese su nombre completo
                      </p>
                    )}
                  </div>
                </div>

                <div className="relative">
                  <label className="block mb-2 text-base font-medium text-gray-700">
                    DNI *
                    {form.dni.length === 8 && (
                      <span className={`ml-2 text-green-500 animate-bounce ${showSuccessAnimation === 'dni' ? 'animate-pulse' : ''}`}>
                        ✓
                      </span>
                    )}
                  </label>
                  {showSuccessAnimation === 'dni' && (
                    <div className="absolute text-2xl text-green-500 -top-2 -right-2 animate-bounce">
                      🎊
                    </div>
                  )}
                  <div className="space-y-2">
                    <p className="p-2 text-xs text-gray-500 border-l-4 border-blue-300 rounded bg-blue-50">
                      💡 <strong>Instrucción:</strong> Ingrese solo los 8 números de su DNI (sin puntos ni guiones)
                    </p>
                    <input
                      name="dni"
                      value={form.dni}
                      onChange={e => {
                        const val = e.target.value.replace(/[^0-9]/g, '').substring(0, 8);
                        setForm(prev => ({ ...prev, dni: val }));
                      }}
                      required
                      maxLength={8}
                      className={`w-full px-4 py-3 text-base border-2 rounded-lg focus:ring-2 focus:ring-green-200 outline-none transition-all duration-200 font-mono text-center tracking-widest ${form.dni.length === 8
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
                        <p className="flex items-center gap-1 text-amber-600">
                          <span>⚠️</span> Faltan {8 - form.dni.length} dígitos
                        </p>
                      )}
                      {form.dni.length === 8 && (
                        <p className="flex items-center gap-1 text-green-600">
                          <span>✅</span> DNI completo
                        </p>
                      )}
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">
                    Teléfono *
                    {form.telefono && /^\+51\s?\d{3}\s?\d{3}\s?\d{3}$/.test(form.telefono) && (
                      <span className="ml-2 text-green-500 animate-bounce">✓</span>
                    )}
                  </label>
                  <input
                    name="telefono"
                    value={form.telefono}
                    onChange={e => {
                      // Permite un "+" solo al inicio, seguido de números, máximo 12 caracteres
                      let val = e.target.value.replace(/(?!^\+)[^\d]/g, '').substring(0, 12);
                      if (e.target.value.startsWith('+')) {
                        val = '+' + val.replace(/^\+/, '');
                      }
                      setForm(prev => ({ ...prev, telefono: val }));
                    }}
                    required
                    maxLength={13}
                    className={`w-full px-4 py-3 text-base transition-all duration-200 border-2 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${form.telefono.length >= 8
                      ? 'border-green-300 focus:border-green-500 bg-green-50/30'
                      : 'border-gray-300 focus:border-green-500 hover:border-green-300'
                      }`}
                    placeholder="+51 999 888 777"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">
                    Email *
                    {form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                      <span className="ml-2 text-green-500 animate-bounce">✓</span>
                    )}
                  </label>
                  <input
                    name="email"
                    type="email"
                    value={form.email}
                    onChange={handleChange}
                    required
                    className={`w-full px-4 py-3 text-base transition-all duration-200 border-2 rou                    <select
                      name="ubicacionesHuancavelica"
                      value={form.provincia}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-3 text-base transition-all duration-200 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                    >
                      <option value="">Seleccione una opción</option>
                      {provincia.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
                    </select>nded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200 ${form.email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)
                        ? 'border-green-300 focus:border-green-500 bg-green-50/30'
                        : 'border-gray-300 focus:border-green-500 hover:border-green-300'
                      }`}
                    placeholder="ejemplo@correo.com"
                  />
                  {form.email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && (
                    <p className="flex items-center gap-1 mt-1 text-xs text-amber-600">
                      <span>⚠️</span> Ingrese un correo válido, por ejemplo: <b>ejemplo@correo.com</b>
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Información Agrícola con animaciones */}
            <div className="p-6 transition-all duration-300 delay-1000 border border-green-200 bg-green-50 rounded-xl animate-fade-in hover:shadow-lg">
              <h2 className="flex items-center gap-2 mb-4 text-xl font-bold text-green-700 animate-float">
                <span className="delay-75 animate-bounce">🌱</span>
                Información Agrícola
              </h2>

              <div className="space-y-6">
                {/* provincia */}
                <div>
                  <label className="block mb-2 text-base font-medium text-gray-700">
                    1. ¿En qué provincia se encuentra su cultivo? *
                  </label>
                  <select
                    name="provincia"
                    value={form.provincia}
                    onChange={handleChange}
                    required
                    className="w-full px-4 py-3 text-base transition-all duration-200 border-2 border-gray-300 rounded-lg outline-none focus:border-green-500 focus:ring-2 focus:ring-green-200"
                  >
                    <option value="">Seleccione una opción</option>
                    {provincia.map(r => <option key={r} value={r.toLowerCase()}>{r}</option>)}
                  </select>
                </div>

                {/* Extensión */}
                <div>
                  <label className="block mb-3 text-base font-medium text-gray-700">
                    2. Extensión de su terreno:
                  </label>
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {extensiones.map(ext => (
                      <label key={ext.value} className="flex items-center p-3 transition-all duration-200 bg-white border-2 border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50 hover:border-green-500">
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
                  <label className="block mb-3 text-base font-medium text-gray-700">
                    3. ¿Qué cultivos maneja? (Seleccione los que apliquen)
                    {form.cultivos.length > 0 && (
                      <span className="px-2 py-1 ml-2 text-xs font-bold text-green-700 bg-green-100 rounded-full">
                        {form.cultivos.length} seleccionado{form.cultivos.length > 1 ? 's' : ''}
                      </span>
                    )}
                  </label>
                  <div className="grid grid-cols-2 gap-3 md:grid-cols-3">
                    {cultivos.map(c => {
                      const isSelected = form.cultivos.includes(c);
                      const iconMap = {
                        'Papa': '🥔', 'Maíz': '🌽', 'Quinua': '🌾',
                        'Arroz': '🌾', 'Café': '☕', 'Cacao': '🍫'
                      };
                      return (
                        <label key={c} className={`flex items-center p-3 rounded-lg cursor-pointer transition-all duration-200 border-2 ${isSelected
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
                          <span className="mr-2 text-lg">{iconMap[c as keyof typeof iconMap]}</span>
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
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    {medios.map(m => (
                      <label key={m.value} className="flex items-center p-3 bg-white border border-gray-300 rounded-lg cursor-pointer hover:bg-gray-50">
                        <input
                          type="checkbox"
                          name="medio_alerta"
                          value={m.value}
                          checked={form.medio_alerta.includes(m.value)}
                          onChange={handleChange}
                          className="mr-3"
                        />
                        {m.label}
                      </label>
                    ))}
                  </div>
                  {/* Mensaje de advertencia si no se selecciona ningún medio */}
                  {form.medio_alerta.length === 0 && (
                    <p className="mt-2 text-xs text-amber-600">
                      <span>⚠️</span> Seleccione al menos un medio para recibir alertas.
                    </p>
                  )}
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
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-3">
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
                  <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg resize-none focus:border-green-500 focus:ring-1 focus:ring-green-500"
                  />
                </div>
              </div>
            </div>

            {/* Botón Continuar Después - Mejora #5 */}
            <div className="text-center">
              <button
                type="button"
                onClick={() => alert('📱 Te enviaremos un recordatorio amigable para continuar cuando puedas. ¡Sin presión!')}
                className="flex items-center gap-2 px-6 py-3 mx-auto mb-4 font-semibold text-blue-700 transition-all duration-200 transform rounded-full shadow-md bg-gradient-to-r from-blue-100 to-indigo-100 hover:from-blue-200 hover:to-indigo-200 hover:shadow-lg hover:scale-105"
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
                className={`py-4 px-12 rounded-full text-lg font-bold shadow-lg transition-all duration-300 ${progress >= 50
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
      <div className="fixed z-50 bottom-6 right-6">
        <button
          onClick={() => {
            console.log('Botón de ayuda clickeado');
            setShowHelpModal(true);
          }}
          className="flex items-center justify-center w-16 h-16 text-white transition-all duration-300 transform bg-blue-500 rounded-full shadow-lg hover:bg-blue-600 hover:shadow-xl hover:scale-110"
          title="Ayuda y Consejos"
          type="button"
        >
          <span className="text-2xl">💡</span>
        </button>
      </div>

      {/* Modal de Ayuda - Versión Simplificada */}
      {showHelpModal && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black bg-opacity-50"
          onClick={() => setShowHelpModal(false)}
        >
          <div
            className="w-full max-w-md mx-4 bg-white shadow-2xl rounded-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="p-6 text-white bg-blue-500 rounded-t-2xl">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">🤖</span>
                  <h3 className="text-xl font-bold">Asistente de Ayuda</h3>
                </div>
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="text-2xl font-bold leading-none text-white hover:text-gray-200"
                  type="button"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              <div className="p-4 mb-4 border border-blue-200 rounded-lg bg-blue-50">
                <div className="flex items-center gap-3 mb-3">
                  <span className="text-3xl">{tips[currentTip]?.icon || '💡'}</span>
                  <h4 className="text-lg font-bold text-blue-700">{tips[currentTip]?.title || 'Ayuda'}</h4>
                </div>
                <p className="leading-relaxed text-gray-700">{tips[currentTip]?.message || 'Contenido de ayuda'}</p>
              </div>

              <div className="flex items-center justify-between mb-4">
                <button
                  onClick={() => setCurrentTip(currentTip > 0 ? currentTip - 1 : tips.length - 1)}
                  className="flex items-center gap-2 px-4 py-2 text-gray-700 transition-all duration-200 bg-gray-100 rounded-lg hover:bg-gray-200"
                >
                  <span>←</span> Anterior
                </button>

                <div className="flex gap-1">
                  {tips.map((_, index) => (
                    <div
                      key={index}
                      className={`w-2 h-2 rounded-full transition-all duration-200 ${index === currentTip ? 'bg-blue-500' : 'bg-gray-300'
                        }`}
                    />
                  ))}
                </div>

                <button
                  onClick={() => setCurrentTip(currentTip < tips.length - 1 ? currentTip + 1 : 0)}
                  className="flex items-center gap-2 px-4 py-2 text-white transition-all duration-200 bg-blue-500 rounded-lg hover:bg-blue-600"
                >
                  Siguiente <span>→</span>
                </button>
              </div>

              <div className="text-center">
                <button
                  onClick={() => setShowHelpModal(false)}
                  className="px-6 py-2 font-semibold text-white transition-all duration-200 bg-green-500 rounded-lg hover:bg-green-600"
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
