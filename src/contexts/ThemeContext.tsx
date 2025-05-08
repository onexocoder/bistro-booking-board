
import React, { createContext, useContext, useState, useEffect } from 'react';
import { RestaurantTheme } from '@/types';

interface ThemeContextType {
  theme: RestaurantTheme;
  updateTheme: (newTheme: Partial<RestaurantTheme>) => void;
  resetTheme: () => void;
}

const defaultTheme: RestaurantTheme = {
  primaryColor: '#8B0000', // Bordô
  secondaryColor: '#4E3524', // Marrom
  accentColor: '#F5F5DC', // Creme
  fontFamily: {
    headings: 'Playfair Display',
    body: 'Lato',
  }
};

const ThemeContext = createContext<ThemeContextType>({
  theme: defaultTheme,
  updateTheme: () => {},
  resetTheme: () => {},
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [theme, setTheme] = useState<RestaurantTheme>(() => {
    const savedTheme = localStorage.getItem('restaurantTheme');
    return savedTheme ? JSON.parse(savedTheme) : defaultTheme;
  });

  useEffect(() => {
    localStorage.setItem('restaurantTheme', JSON.stringify(theme));
    
    // Aplicar variáveis CSS personalizadas
    document.documentElement.style.setProperty('--theme-primary', theme.primaryColor);
    document.documentElement.style.setProperty('--theme-secondary', theme.secondaryColor);
    document.documentElement.style.setProperty('--theme-accent', theme.accentColor);
    
    // Aplicar fontes personalizadas
    if (theme.fontFamily.headings !== defaultTheme.fontFamily.headings) {
      document.documentElement.style.setProperty('--font-headings', theme.fontFamily.headings);
    }
    
    if (theme.fontFamily.body !== defaultTheme.fontFamily.body) {
      document.documentElement.style.setProperty('--font-body', theme.fontFamily.body);
    }
  }, [theme]);

  const updateTheme = (newTheme: Partial<RestaurantTheme>) => {
    setTheme(prev => ({ ...prev, ...newTheme }));
  };

  const resetTheme = () => {
    setTheme(defaultTheme);
  };

  return (
    <ThemeContext.Provider value={{ theme, updateTheme, resetTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};
