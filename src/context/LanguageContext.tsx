import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type LangKey = 'qu' | 'es' | 'en';

export const LANGS: Record<LangKey, {
  name: string;
  flag: string;
}> = {
  qu: { name: 'Quechua Chanka', flag: '🏔️' },
  es: { name: 'Español', flag: '🇵🇪' },
  en: { name: 'English (US)', flag: '🇺🇸' },
};

interface LanguageContextProps {
  language: LangKey;
  setLanguage: (lang: LangKey) => void;
}

const LanguageContext = createContext<LanguageContextProps | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguageState] = useState<LangKey>(() => {
    const lang = localStorage.getItem('climaAlert_lang');
    return (lang === 'qu' || lang === 'es' || lang === 'en') ? lang : 'es';
  });

  useEffect(() => {
    localStorage.setItem('climaAlert_lang', language);
  }, [language]);

  // Permite sincronizar el idioma si cambia en otra pestaña
  useEffect(() => {
    const onStorage = () => {
      const lang = localStorage.getItem('climaAlert_lang');
      if (lang === 'qu' || lang === 'es' || lang === 'en') {
        setLanguageState(lang);
      }
    };
    window.addEventListener('storage', onStorage);
    return () => window.removeEventListener('storage', onStorage);
  }, []);

  const setLanguage = (lang: LangKey) => {
    setLanguageState(lang);
    localStorage.setItem('climaAlert_lang', lang);
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) throw new Error('useLanguage must be used within a LanguageProvider');
  return context;
};
