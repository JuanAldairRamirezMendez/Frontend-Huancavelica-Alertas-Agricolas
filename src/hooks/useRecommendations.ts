import { useState, useEffect } from 'react';
import { useCrops } from './useCrops';
import { useAlerts } from './useAlerts';
import { useWeather } from './useWeather';

export interface Recommendation {
  id: string;
  title: string;
  description: string;
  type: 'alerta' | 'clima' | 'cultivo' | 'riego' | 'general';
  priority: 'alto' | 'medio' | 'bajo';
  actions: string[];
  relatedCrop?: string;
  relatedAlert?: string;
  isRead: boolean;
  createdAt: Date;
  validUntil?: Date;
}

export const useRecommendations = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const { crops } = useCrops();
  const { activeAlerts } = useAlerts();
  const { weatherData } = useWeather();

  // Generar recomendaciones automáticas basadas en el contexto
  const generateRecommendations = () => {
    const newRecommendations: Recommendation[] = [];

    // Recomendaciones basadas en alertas activas
    activeAlerts.forEach(alert => {
      const cropRecommendations = crops
        .filter(crop => {
          // Filtrar cultivos que podrían verse afectados por esta alerta
          return true; // Simplificado por ahora
        })
        .map(crop => {
          let actions: string[] = [];
          let priority: 'alto' | 'medio' | 'bajo' = alert.severity;

          switch (alert.type) {
            case 'helada':
              actions = [
                'Aplicar riego por aspersión durante la madrugada',
                'Cubrir cultivos jóvenes con mantas térmicas',
                'Revisar sistemas de calefacción si están disponibles',
                'Monitorear temperaturas durante la noche'
              ];
              break;
            case 'lluvia_intensa':
              actions = [
                'Verificar y limpiar sistemas de drenaje',
                'Evitar aplicaciones de fertilizantes o pesticidas',
                'Proteger plantas jóvenes con coberturas',
                'Revisar estructuras de soporte de cultivos'
              ];
              break;
            case 'sequia':
              actions = [
                'Implementar riego eficiente (goteo o microaspersión)',
                'Aplicar mulch para conservar humedad',
                'Revisar y optimizar programación de riego',
                'Considerar cultivos resistentes a sequía'
              ];
              break;
            case 'granizo':
              actions = [
                'Instalar mallas antigranizo si es posible',
                'Refugiar cultivos en invernaderos móviles',
                'Preparar seguros agrícolas',
                'Monitorear pronósticos cada 2 horas'
              ];
              break;
            case 'viento_fuerte':
              actions = [
                'Reforzar tutores y estructuras de soporte',
                'Podar ramas que puedan quebrar',
                'Proteger cultivos con barreras cortaviento',
                'Asegurar elementos sueltos en el campo'
              ];
              break;
          }

          return {
            id: `alert-${alert.id}-${crop.id}-${Date.now()}`,
            title: `🚨 Protección para ${crop.name} - ${alert.title}`,
            description: `Tu cultivo de ${crop.name} en ${crop.location} está en riesgo por ${alert.description}. Toma medidas preventivas inmediatas.`,
            type: 'alerta' as const,
            priority,
            actions,
            relatedCrop: crop.name,
            relatedAlert: alert.id,
            isRead: false,
            createdAt: new Date(),
            validUntil: alert.validUntil
          };
        });

      newRecommendations.push(...cropRecommendations);
    });

    // Recomendaciones generales basadas en clima
    if (weatherData) {
      // Recomendación por alta humedad
      if (weatherData.humidity > 80) {
        newRecommendations.push({
          id: `humidity-${Date.now()}`,
          title: '💧 Alta Humedad Detectada',
          description: `La humedad actual es del ${weatherData.humidity}%. Esto puede favorecer el desarrollo de enfermedades fúngicas en tus cultivos.`,
          type: 'clima',
          priority: 'medio',
          actions: [
            'Mejorar ventilación en cultivos bajo cubierta',
            'Aplicar fungicidas preventivos si es necesario',
            'Evitar riego en las próximas horas',
            'Monitorear signos de enfermedades fúngicas'
          ],
          isRead: false,
          createdAt: new Date()
        });
      }

      // Recomendación por viento fuerte
      if (weatherData.windSpeed > 25) {
        newRecommendations.push({
          id: `wind-${Date.now()}`,
          title: '💨 Vientos Fuertes',
          description: `Se detectan vientos de ${weatherData.windSpeed} km/h. Esto puede afectar tus cultivos y estructuras.`,
          type: 'clima',
          priority: 'medio',
          actions: [
            'Revisar y reforzar estructuras de soporte',
            'Postponer aplicaciones de pesticidas',
            'Asegurar herramientas y equipos',
            'Monitorear daños en cultivos altos'
          ],
          isRead: false,
          createdAt: new Date()
        });
      }
    }

    // Recomendaciones específicas por cultivo y época
    crops.forEach(crop => {
      const now = new Date();
      
      // Recomendaciones basadas en el estado del cultivo
      if (crop.plantingDate) {
        const daysFromPlanting = Math.floor((now.getTime() - crop.plantingDate.getTime()) / (1000 * 60 * 60 * 24));
        
        // Recomendaciones para diferentes etapas del cultivo
        if (daysFromPlanting >= 0 && daysFromPlanting <= 30) {
          // Etapa inicial
          newRecommendations.push({
            id: `early-stage-${crop.id}-${Date.now()}`,
            title: `🌱 Cuidados Iniciales - ${crop.name}`,
            description: `Tu cultivo de ${crop.name} está en etapa inicial (${daysFromPlanting} días desde siembra). Es crucial mantener condiciones óptimas.`,
            type: 'cultivo',
            priority: 'medio',
            actions: [
              'Mantener humedad constante del suelo',
              'Proteger de vientos fuertes',
              'Aplicar fertilizante de arranque si no se hizo',
              'Monitorear plagas iniciales'
            ],
            relatedCrop: crop.name,
            isRead: false,
            createdAt: new Date()
          });
        }

        // Recomendaciones específicas por tipo de cultivo
        if (crop.type === 'papa' && daysFromPlanting >= 45 && daysFromPlanting <= 60) {
          newRecommendations.push({
            id: `potato-hilling-${crop.id}-${Date.now()}`,
            title: `🥔 Tiempo de Aporque - ${crop.name}`,
            description: `Tu cultivo de papa está listo para el aporque. Esta práctica es esencial para un buen desarrollo.`,
            type: 'cultivo',
            priority: 'alto',
            actions: [
              'Realizar aporque cuando las plantas tengan 15-20 cm',
              'Aplicar fertilizante antes del aporque',
              'Revisar presencia de gusano blanco',
              'Mantener suelo húmedo pero no encharcado'
            ],
            relatedCrop: crop.name,
            isRead: false,
            createdAt: new Date()
          });
        }
      }
    });

    // Recomendaciones generales de la temporada
    const month = new Date().getMonth();
    if (month >= 3 && month <= 5) { // Abril a Junio - época de siembra
      newRecommendations.push({
        id: `season-planting-${Date.now()}`,
        title: '🌾 Temporada de Siembra',
        description: 'Estamos en época óptima de siembra para muchos cultivos. Asegúrate de estar preparado.',
        type: 'general',
        priority: 'bajo',
        actions: [
          'Verificar calidad de semillas',
          'Preparar terrenos para siembra',
          'Revisar sistemas de riego',
          'Planificar calendario de cultivos'
        ],
        isRead: false,
        createdAt: new Date()
      });
    }

    return newRecommendations;
  };

  // Cargar y generar recomendaciones
  useEffect(() => {
    const loadRecommendations = () => {
      try {
        const saved = localStorage.getItem('recommendations');
        let existingRecommendations: Recommendation[] = [];
        
        if (saved) {
          existingRecommendations = JSON.parse(saved).map((rec: any) => ({
            ...rec,
            createdAt: new Date(rec.createdAt),
            validUntil: rec.validUntil ? new Date(rec.validUntil) : undefined
          }));
        }

        // Filtrar recomendaciones expiradas
        const validRecommendations = existingRecommendations.filter(rec => 
          !rec.validUntil || rec.validUntil > new Date()
        );

        // Generar nuevas recomendaciones
        const newRecommendations = generateRecommendations();
        
        // Evitar duplicados basándose en title y relatedCrop
        const filteredNew = newRecommendations.filter(newRec => 
          !validRecommendations.some(existing => 
            existing.title === newRec.title && 
            existing.relatedCrop === newRec.relatedCrop &&
            Math.abs(existing.createdAt.getTime() - newRec.createdAt.getTime()) < 24 * 60 * 60 * 1000 // Menos de 24 horas
          )
        );

        const allRecommendations = [...validRecommendations, ...filteredNew]
          .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

        setRecommendations(allRecommendations);
        localStorage.setItem('recommendations', JSON.stringify(allRecommendations));
      } catch (error) {
        console.error('Error loading recommendations:', error);
        setRecommendations([]);
      }
    };

    // Solo generar si tenemos datos de cultivos o alertas
    if (crops.length > 0 || activeAlerts.length > 0) {
      loadRecommendations();
    }
  }, [crops, activeAlerts, weatherData]);

  const markAsRead = (recommendationId: string) => {
    const updated = recommendations.map(rec => 
      rec.id === recommendationId ? { ...rec, isRead: true } : rec
    );
    setRecommendations(updated);
    localStorage.setItem('recommendations', JSON.stringify(updated));
  };

  const dismissRecommendation = (recommendationId: string) => {
    const updated = recommendations.filter(rec => rec.id !== recommendationId);
    setRecommendations(updated);
    localStorage.setItem('recommendations', JSON.stringify(updated));
  };

  const markAllAsRead = () => {
    const updated = recommendations.map(rec => ({ ...rec, isRead: true }));
    setRecommendations(updated);
    localStorage.setItem('recommendations', JSON.stringify(updated));
  };

  const getUnreadCount = () => {
    return recommendations.filter(rec => !rec.isRead).length;
  };

  const getPriorityRecommendations = () => {
    return recommendations.filter(rec => rec.priority === 'alto' && !rec.isRead);
  };

  return {
    recommendations,
    markAsRead,
    dismissRecommendation,
    markAllAsRead,
    getUnreadCount,
    getPriorityRecommendations
  };
};