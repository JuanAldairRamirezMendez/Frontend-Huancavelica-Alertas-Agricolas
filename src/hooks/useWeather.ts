import { useState, useEffect } from 'react';
import { WeatherData } from '../types';


export const useWeather = () => {
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [lastUpdated, setLastUpdated] = useState<Date | null>(null);

  useEffect(() => {
    const loadWeatherData = () => {
      setIsLoading(true);
      // Demo: datos simulados
      setWeatherData({
        temperature: 18.5,
        humidity: 65,
        windSpeed: 12,
        rainfall: 3.2,
        lastUpdated: new Date(),
        location: 'Huancavelica Centro'
      });
      setLastUpdated(new Date());
      setIsLoading(false);
    };

    loadWeatherData();

    // Simular actualización cada 15 minutos como especifica RNF22
    const interval = setInterval(() => {
      loadWeatherData();
    }, 15 * 60 * 1000);

    return () => clearInterval(interval);
  }, []);

  const refreshWeather = () => {
    if (!isLoading) {
      setIsLoading(true);
      // Demo: refrescar con variación
      setTimeout(() => {
        setWeatherData(prev => prev ? {
          ...prev,
          temperature: prev.temperature + (Math.random() - 0.5) * 2,
          humidity: Math.max(0, Math.min(100, prev.humidity + (Math.random() - 0.5) * 10)),
          windSpeed: Math.max(0, prev.windSpeed + (Math.random() - 0.5) * 5),
          rainfall: Math.max(0, prev.rainfall + (Math.random() - 0.5) * 1),
          lastUpdated: new Date()
        } : null);
        setLastUpdated(new Date());
        setIsLoading(false);
      }, 200);
    }
  };

  return {
    weatherData,
    isLoading,
    lastUpdated,
    refreshWeather
  };
};