import { X, Share2, MapPin, Clock, Thermometer, Wind, Droplets, Wifi, WifiOff, MessageCircle, Send } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';
import { Badge } from '../ui/badge';
import { Separator } from '../ui/separator';
import { Alert as AlertBanner, AlertDescription } from '../ui/alert';
import { Alert } from '../../types';
import { SEVERITY_COLORS, ALERT_TYPES } from '../../utils/constants';
import { useState } from 'react';

interface AlertDetailProps {
  alert: Alert;
  onClose: () => void;
  onShare: (alert: Alert) => void;
}

export const AlertDetail = ({ alert, onClose, onShare }: AlertDetailProps) => {
  const [isOnline] = useState(navigator.onLine);

  const getSeverityColor = (severity: string) => {
    return SEVERITY_COLORS[severity as keyof typeof SEVERITY_COLORS] || '#6B7280';
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'alto': return '🔴';
      case 'medio': return '🟡';
      case 'bajo': return '🟢';
      default: return '⚪';
    }
  };

  const getAlertTypeIcon = (type: string) => {
    switch (type) {
      case 'frost': return '❄️';
      case 'rain': return '🌧️';
      case 'wind': return '💨';
      case 'hail': return '🧊';
      case 'drought': return '☀️';
      default: return '⚠️';
    }
  };

  const formatDateTime = (date: Date) => {
    return date.toLocaleString('es-PE', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
      <Card className="w-full max-w-lg max-h-[90vh] overflow-y-auto">
        <CardHeader className="pb-4">
          <div className="flex items-start justify-between">
            <div className="flex-1">
              <div className="flex items-center space-x-2 mb-3">
                <div className="text-3xl">{getAlertTypeIcon(alert.type)}</div>
                <div className="text-2xl">{getSeverityIcon(alert.severity)}</div>
                <Badge
                  className="text-white font-medium"
                  style={{ backgroundColor: getSeverityColor(alert.severity) }}
                >
                  {alert.severity.toUpperCase()}
                </Badge>
                {alert.isActive && (
                  <Badge variant="outline" className="text-green-700 border-green-300">
                    <div className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></div>
                    Activa
                  </Badge>
                )}
              </div>
              <CardTitle className="text-xl mb-2">
                {getAlertTypeIcon(alert.type)} {alert.title}
              </CardTitle>
              <p className="text-sm text-muted-foreground mb-2">
                {ALERT_TYPES[alert.type]}
              </p>
              <div className="text-sm text-gray-600">
                📅 {formatDateTime(alert.createdAt)}
              </div>
            </div>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={onClose}
              className="min-h-[44px] min-w-[44px] p-2 -mt-2 -mr-2 touch-friendly"
              aria-label="Cerrar detalle"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          {/* Estado offline */}
          {!isOnline && (
            <AlertBanner>
              <AlertDescription className="flex items-center gap-2">
                <WifiOff className="h-4 w-4" />
                💾 Información almacenada localmente - Actualizar cuando tengas conexión
              </AlertDescription>
            </AlertBanner>
          )}

          {/* Información principal */}
          <div className="bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              📋 Información Detallada
            </h3>
            <div className="space-y-2 text-sm">
              <p><strong>Zona afectada específica:</strong> {alert.affectedAreas?.join(', ')}</p>
              <p><strong>Duración estimada:</strong> 4 horas</p>
              <p><strong>Intensidad:</strong> {alert.severity === 'alto' ? 'Muy intensa' : alert.severity === 'medio' ? 'Moderada' : 'Leve'}</p>
            </div>
          </div>

          {/* Descripción */}
          <div>
            <h3 className="font-medium mb-2">📝 Descripción</h3>
            <p className="text-gray-700">{alert.description}</p>
          </div>

          <Separator />

          {/* Datos meteorológicos */}
          {alert.weatherData && (
            <>
              <div>
                <h3 className="font-medium mb-3">🌤️ Condiciones Meteorológicas</h3>
                <div className="grid grid-cols-1 gap-3">
                  {alert.weatherData.temperature !== undefined && (
                    <div className="flex items-center space-x-3 p-4 bg-blue-50 rounded-lg border border-blue-200">
                      <div className="text-2xl">🌡️</div>
                      <div>
                        <p className="text-sm font-medium text-blue-900">Temperatura mínima</p>
                        <p className="font-bold text-blue-600 text-lg">
                          {alert.weatherData.temperature}°C
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {alert.weatherData.windSpeed !== undefined && (
                    <div className="flex items-center space-x-3 p-4 bg-green-50 rounded-lg border border-green-200">
                      <div className="text-2xl">💨</div>
                      <div>
                        <p className="text-sm font-medium text-green-900">Velocidad del viento</p>
                        <p className="font-bold text-green-600 text-lg">
                          {alert.weatherData.windSpeed} km/h
                        </p>
                      </div>
                    </div>
                  )}
                  
                  {alert.weatherData.rainfall !== undefined && (
                    <div className="flex items-center space-x-3 p-4 bg-purple-50 rounded-lg border border-purple-200">
                      <div className="text-2xl">🌧️</div>
                      <div>
                        <p className="text-sm font-medium text-purple-900">Precipitación acumulada</p>
                        <p className="font-bold text-purple-600 text-lg">
                          {alert.weatherData.rainfall} mm
                        </p>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <Separator />
            </>
          )}

          {/* Recomendaciones específicas */}
          <div className="bg-yellow-50 rounded-lg p-4 border border-yellow-200">
            <h3 className="font-medium mb-3 flex items-center gap-2">
              💡 Recomendaciones Específicas
            </h3>
            <ul className="space-y-3">
              {alert.recommendations.map((recommendation, index) => (
                <li key={index} className="flex items-start space-x-3">
                  <div className="w-6 h-6 bg-yellow-500 text-white rounded-full flex items-center justify-center text-xs font-medium flex-shrink-0 mt-0.5">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 font-medium">{recommendation}</p>
                </li>
              ))}
            </ul>
          </div>

          <Separator />

          {/* Información adicional */}
          <div className="space-y-4">
            <div className="bg-gray-50 rounded-lg p-4">
              <div className="flex items-start space-x-3 mb-3">
                <Clock className="h-5 w-5 mt-0.5 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">📅 Fechas importantes</p>
                  <p className="text-gray-600 mt-1"><strong>Creada:</strong> {formatDateTime(alert.createdAt)}</p>
                  <p className="text-gray-600"><strong>Válida hasta:</strong> {formatDateTime(alert.validUntil)}</p>
                </div>
              </div>

              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 mt-0.5 text-gray-600" />
                <div className="text-sm">
                  <p className="font-medium text-gray-900">📍 Zonas afectadas</p>
                  <p className="text-gray-600 mt-1">{alert.affectedAreas.join(', ')}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Botones de compartir */}
          <div className="space-y-3">
            <h3 className="font-medium flex items-center gap-2">
              📤 Compartir esta alerta
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Comparte esta información importante con otros agricultores
            </p>
            
            <div className="grid grid-cols-1 gap-3">
              <Button className="w-full min-h-[48px] touch-friendly bg-green-600 hover:bg-green-700">
                <MessageCircle className="h-5 w-5 mr-2" />
                📱 Compartir por WhatsApp
              </Button>
              
              <Button variant="outline" className="w-full min-h-[48px] touch-friendly">
                <Send className="h-5 w-5 mr-2" />
                📧 Compartir por Telegram
              </Button>
              
              <Button variant="outline" className="w-full min-h-[48px] touch-friendly">
                <Share2 className="h-5 w-5 mr-2" />
                📞 Compartir por SMS
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};