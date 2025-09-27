import { Filter, X, Search, Calendar, ArrowUpDown } from 'lucide-react';
import { Button } from '../ui/button';
import { Card, CardContent } from '../ui/card';
import { Input } from '../ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { Badge } from '../ui/badge';
import { Switch } from '../ui/switch';
import { Label } from '../ui/label';
import { AlertType, SeverityLevel } from '../../types';
import { ALERT_TYPES } from '../../utils/constants';

interface AlertFilterProps {
  filters: {
    type?: AlertType;
    severity?: SeverityLevel;
    showActive?: boolean;
    search?: string;
    sortBy?: 'date' | 'severity';
  };
  onFiltersChange: (filters: {
    type?: AlertType;
    severity?: SeverityLevel;
    showActive?: boolean;
    search?: string;
    sortBy?: 'date' | 'severity';
  }) => void;
  isVisible: boolean;
  onToggle: () => void;
}

export const AlertFilter = ({ filters, onFiltersChange, isVisible, onToggle }: AlertFilterProps) => {
  const hasActiveFilters = filters.type || filters.severity || filters.showActive !== undefined || filters.search;

  const clearFilters = () => {
    onFiltersChange({});
  };

  const updateFilter = (key: string, value: any) => {
    onFiltersChange({
      ...filters,
      [key]: value === 'all' ? undefined : value
    });
  };

  return (
    <>
      {/* Barra de búsqueda siempre visible */}
      <div className="mb-4 space-y-3">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
          <Input
            type="text"
            placeholder="🔍 Buscar alertas..."
            value={filters.search || ''}
            onChange={(e) => updateFilter('search', e.target.value || undefined)}
            className="pl-12 min-h-[48px] text-base touch-friendly"
          />
        </div>
        
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={onToggle}
              className="min-h-[44px] touch-friendly"
            >
              <Filter className="h-4 w-4 mr-2" />
              🔧 Filtros
              {hasActiveFilters && (
                <Badge variant="secondary" className="ml-2 px-1.5 py-0.5 text-xs">
                  {Object.values(filters).filter(v => v !== undefined && v !== '').length}
                </Badge>
              )}
            </Button>
            
            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearFilters}
                className="min-h-[44px] text-gray-500 hover:text-gray-700 touch-friendly"
              >
                <X className="h-4 w-4 mr-1" />
                Limpiar
              </Button>
            )}
          </div>

          {/* Selector de orden */}
          <Select
            value={filters.sortBy || 'date'}
            onValueChange={(value: string) => updateFilter('sortBy', value)}
          >
            <SelectTrigger className="w-48 min-h-[44px] touch-friendly">
              <ArrowUpDown className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="date">📅 Más recientes primero</SelectItem>
              <SelectItem value="severity">🚨 Por severidad</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {isVisible && (
        <Card className="mb-4">
          <CardContent className="p-4 space-y-4">
            <div className="space-y-4">
              <h3 className="font-medium text-gray-900">🔧 Filtros Avanzados</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {/* Filtro por tipo */}
              <div className="space-y-2">
                <Label className="font-medium">🌦️ Tipo de Alerta</Label>
                <Select
                  value={filters.type || 'all'}
                  onValueChange={(value: string) => updateFilter('type', value)}
                >
                  <SelectTrigger className="min-h-[48px] touch-friendly">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">📋 Todas</SelectItem>
                    <SelectItem value="frost">❄️ Heladas</SelectItem>
                    <SelectItem value="rain">🌧️ Lluvias</SelectItem>
                    <SelectItem value="wind">💨 Vientos</SelectItem>
                    <SelectItem value="hail">🧊 Granizo</SelectItem>
                    <SelectItem value="drought">☀️ Sequía</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por severidad */}
              <div className="space-y-2">
                <Label className="font-medium">🚨 Nivel de Severidad</Label>
                <Select
                  value={filters.severity || 'all'}
                  onValueChange={(value: string) => updateFilter('severity', value)}
                >
                  <SelectTrigger className="min-h-[48px] touch-friendly">
                    <SelectValue placeholder="Todas" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">📊 Todas</SelectItem>
                    <SelectItem value="alto">
                      <div className="flex items-center space-x-2">
                        <span>🔴</span>
                        <span>Altas</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="medio">
                      <div className="flex items-center space-x-2">
                        <span>🟡</span>
                        <span>Medias</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="bajo">
                      <div className="flex items-center space-x-2">
                        <span>🟢</span>
                        <span>Bajas</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>

              {/* Filtro por estado */}
              <div className="space-y-2">
                <Label className="font-medium">⚡ Estado de la Alerta</Label>
                <div className="flex items-center space-x-2 h-12 px-3 border rounded-lg touch-friendly">
                  <Switch
                    id="active-filter"
                    checked={filters.showActive === true}
                    onCheckedChange={(checked: boolean) =>
                      updateFilter('showActive', checked ? true : undefined)
                    }
                  />
                  <Label htmlFor="active-filter" className="text-sm">
                    🔥 Solo alertas activas
                  </Label>
                </div>
              </div>
            </div>
            </div>

            {/* Información offline */}
            <div className="pt-4 border-t bg-blue-50 rounded-lg p-3">
              <p className="text-sm text-blue-800">
                💾 <strong>Información offline:</strong> Mostrando alertas almacenadas localmente
              </p>
            </div>

            {/* Resumen de filtros activos */}
            {hasActiveFilters && (
              <div className="pt-2 border-t">
                <p className="text-sm font-medium text-gray-700 mb-2">🎯 Filtros aplicados:</p>
                <div className="flex flex-wrap gap-2">
                  {filters.search && (
                    <Badge variant="secondary" className="text-xs">
                      🔍 Búsqueda: "{filters.search}"
                    </Badge>
                  )}
                  {filters.type && (
                    <Badge variant="secondary" className="text-xs">
                      Tipo: {ALERT_TYPES[filters.type] || filters.type}
                    </Badge>
                  )}
                  {filters.severity && (
                    <Badge variant="secondary" className="text-xs">
                      Severidad: {filters.severity.charAt(0).toUpperCase() + filters.severity.slice(1)}
                    </Badge>
                  )}
                  {filters.showActive && (
                    <Badge variant="secondary" className="text-xs">
                      Solo activas
                    </Badge>
                  )}
                </div>
              </div>
            )}
          </CardContent>
        </Card>
      )}
    </>
  );
};