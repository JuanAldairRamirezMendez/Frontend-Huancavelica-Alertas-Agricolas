import { useState, useEffect } from 'react';
import { User, AuthFormData, ConsentData } from '../types';

const STORAGE_KEY = 'climaAlert_user';

// Hook para manejo de autenticación
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Cargar usuario desde localStorage al inicializar
    const savedUser = localStorage.getItem(STORAGE_KEY);
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem(STORAGE_KEY);
      }
    }
    setIsLoading(false);
  }, []);

  const login = async (formData: AuthFormData): Promise<{ success: boolean; error?: string }> => {
    setIsLoading(true);
    // Validación DEMO: compara con datos guardados en registro
    const demoUserRaw = localStorage.getItem('demoUser');
    if (demoUserRaw) {
      try {
        const demoUser = JSON.parse(demoUserRaw);
        if (
          demoUser.telefono === formData.phone &&
          demoUser.contraseña === formData.password
        ) {
          const newUser: User = {
            id: 'user_' + Date.now(),
            phone: formData.phone,
            name: `Usuario ${formData.phone}`,
            location: 'Huancavelica Centro',
            isAuthenticated: true,
            notifications: {
              sms: true,
              telegram: false,
              email: false
            }
          };
          setUser(newUser);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(newUser));
          setIsLoading(false);
          return { success: true };
        } else {
          setIsLoading(false);
          return { success: false, error: 'Teléfono o contraseña incorrectos.' };
        }
      } catch (e) {
        setIsLoading(false);
        return { success: false, error: 'Error de datos de usuario demo.' };
      }
    }
    // Si no hay usuario demo registrado
    setIsLoading(false);
    return { success: false, error: 'No existe usuario registrado. Regístrese primero.' };
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem(STORAGE_KEY);
  };

  const updateConsents = (consents: ConsentData) => {
    if (!user) return;
    
    const updatedUser = {
      ...user,
      notifications: consents
    };
    
    setUser(updatedUser);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedUser));
  };

  return {
    user,
    isLoading,
    isAuthenticated: !!user?.isAuthenticated,
    login,
    logout,
    updateConsents
  };
};