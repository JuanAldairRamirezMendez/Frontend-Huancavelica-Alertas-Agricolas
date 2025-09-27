import { useState } from 'react';
import { AlertCard } from '../dashboard/AlertCard';
import { useLanguage } from '../../context/LanguageContext';
import { AlertFilter } from './AlertFilter';
import { Button } from '../ui/button';
import { Alert, AlertDescription } from '../ui/alert';
import { RefreshCw, Wifi } from 'lucide-react';
import { useAlerts } from '../../hooks/useAlerts';
import { Alert as AlertType } from '../../types';

type AlertFilters = {
  type?: import('../../types').AlertType;
  severity?: import('../../types').SeverityLevel;
  showActive?: boolean;
  search?: string;
  sortBy?: 'date' | 'severity';
};

interface AlertsHistoryScreenProps {
  onAlertClick: (alert: AlertType) => void;
}

export function AlertsHistoryScreen({ onAlertClick }: AlertsHistoryScreenProps) {
  const { language } = useLanguage();
  const { alerts, isLoading, filters, setFilters } = useAlerts();
  const typedFilters = filters as AlertFilters;
  const [showFilters, setShowFilters] = useState(false);
  const [isOnline] = useState(navigator.onLine);

  // Aplicar filtros a las alertas
  const filteredAlerts = alerts.filter(alert => {
    // Filtro por búsqueda
    if (typedFilters.search) {
      const searchTerm = typedFilters.search.toLowerCase();
      const matches = 
        alert.type.toLowerCase().includes(searchTerm) ||
        alert.description.toLowerCase().includes(searchTerm) ||
        (alert.affectedAreas && alert.affectedAreas.some(area => area.toLowerCase().includes(searchTerm)));
      if (!matches) return false;
    }
    // Filtro por tipo
    if (typedFilters.type && alert.type !== typedFilters.type) return false;
    // Filtro por severidad
    if (typedFilters.severity && alert.severity !== typedFilters.severity) return false;
    // Filtro por estado activo
    if (typedFilters.showActive && !alert.isActive) return false;
    return true;
  });

  // Ordenar alertas
  const sortedAlerts = [...filteredAlerts].sort((a, b) => {
    if (typedFilters.sortBy === 'severity') {
      const severityOrder = { alto: 3, medio: 2, bajo: 1 };
      return severityOrder[b.severity] - severityOrder[a.severity];
    }
    // Por defecto ordenar por fecha (más recientes primero)
    return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  });

  const handleTryRefresh = () => {
    // En una aplicación real, aquí se intentaría refrescar los datos
    console.log('Intentando refrescar datos...');
  };

  return (
    <div className="space-y-6">
      {/* Título de la sección */}
      <div className="text-center mb-6">
        <h1 className="text-2xl font-medium text-gray-900 mb-2">
          📋 {language === 'qu' ? 'Kallpachaykuna willakuy' : language === 'en' ? 'Alerts History' : 'Lista de Alertas Históricas'}
        </h1>
        <p className="text-gray-600">
          {language === 'qu' ? 'Kallpachaykuna tukuy llaqta' : language === 'en' ? 'Complete climate alert history for your region' : 'Historial completo de alertas climáticas para tu región'}
        </p>
      </div>

      {/* Componente de filtros */}
      <AlertFilter
        filters={filters}
        onFiltersChange={setFilters}
        isVisible={showFilters}
        onToggle={() => setShowFilters(!showFilters)}
      />

      {/* Información de estado offline */}
      {!isOnline && (
        <Alert>
          <AlertDescription className="flex items-center justify-between">
            <span>
              💾 <strong>Modo offline:</strong> Mostrando {alerts.length} alertas almacenadas localmente
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleTryRefresh}
              className="min-h-[40px] touch-friendly"
            >
              <RefreshCw className="h-4 w-4 mr-2" />
              Intentar cargar más
            </Button>
          </AlertDescription>
        </Alert>
      )}

      {/* Estado de carga */}
      {isLoading && (
        <div className="text-center py-8">
          <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Cargando alertas...</p>
        </div>
      )}

      {/* Resultados de búsqueda */}
      {!isLoading && (
        <div className="mb-4">
          <div className="flex items-center justify-between text-sm text-gray-600">
            <span>
              📊 Mostrando {sortedAlerts.length} de {alerts.length} alertas
              {typedFilters.search && ` para "${typedFilters.search}"`}
            </span>
            {isOnline && (
              <div className="flex items-center gap-1 text-green-600">
                <Wifi className="h-4 w-4" />
                <span>Online</span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Lista de alertas */}
      {!isLoading && sortedAlerts.length > 0 ? (
        <div className="space-y-4">
          {sortedAlerts.map((alert) => (
            <AlertCard
              key={alert.id}
              alert={alert}
              onClick={() => onAlertClick(alert)}
            />
          ))}
        </div>
      ) : !isLoading && sortedAlerts.length === 0 ? (
        <div className="text-center py-12">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <span className="text-2xl">🔍</span>
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            No se encontraron alertas
          </h3>
          <p className="text-gray-600 mb-4">
            {typedFilters.search || typedFilters.type || typedFilters.severity || typedFilters.showActive
              ? 'No hay alertas que coincidan con los filtros aplicados.'
              : 'No hay alertas disponibles en este momento.'
            }
          </p>
          {(typedFilters.search || typedFilters.type || typedFilters.severity || typedFilters.showActive) && (
            <Button
              variant="outline"
              onClick={() => setFilters({})}
              className="min-h-[44px] touch-friendly"
            >
              🧹 Limpiar todos los filtros
            </Button>
          )}
        </div>
      ) : null}

      {/* Botón cargar más (si hay conexión) */}
      {isOnline && sortedAlerts.length > 0 && sortedAlerts.length >= 25 && (
        <div className="text-center pt-6">
          <Button
            variant="outline"
            onClick={handleTryRefresh}
            className="min-h-[48px] touch-friendly"
          >
            <RefreshCw className="h-5 w-5 mr-2" />
            📡 Cargar más alertas
          </Button>
        </div>
      )}

      {/* Información adicional */}
      <div className="pt-6 border-t border-gray-200">
        <div className="bg-gray-50 rounded-lg p-4">
          <h3 className="font-medium text-gray-900 mb-2">ℹ️ Información importante</h3>
          <ul className="text-sm text-gray-600 space-y-1">
            <li>• Las alertas se actualizan automáticamente cada 15 minutos</li>
            <li>• En modo offline puedes acceder a las últimas 30 días de alertas</li>
            <li>• Toca cualquier alerta para ver detalles completos</li>
            <li>• Usa los filtros para encontrar alertas específicas rápidamente</li>
          </ul>
        </div>
      </div>
    </div>
  );
}