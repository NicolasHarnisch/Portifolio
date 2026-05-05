/* eslint-disable react-refresh/only-export-components */
// src/contexts/LanguageContext.tsx
import React, { createContext, useState, useContext, ReactNode, useEffect, useMemo } from 'react';
import { translations } from '../locales/translations';

type Language = 'pt' | 'en';

interface LanguageContextType {
  language: Language;
  toggleLanguage: () => void;
  t: typeof translations.pt; // Pega a tipagem automática
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>('pt');

  const toggleLanguage = () => {
    setLanguage((prev) => (prev === 'pt' ? 'en' : 'pt'));
  };

  // Aqui pegamos o dicionário correto com base no idioma atual
  const t = translations[language];

  // Atualiza o atributo lang do HTML para Leitores de Tela e SEO
  useEffect(() => {
    document.documentElement.lang = language === 'pt' ? 'pt-BR' : 'en';
  }, [language]);

  const value = useMemo(
    () => ({ language, toggleLanguage, t }),
    [language, t]
  );

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};

// Hook personalizado para usar nos seus componentes
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage deve ser usado dentro de um LanguageProvider');
  }
  return context;
};