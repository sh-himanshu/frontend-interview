import { createContext, useContext, useEffect, useState } from 'react';

interface ThemeProviderProps {
  children: React.ReactNode;
}

type Theme = 'light' | 'dark';

type ThemeContextValue = {
  theme: Theme;
  setTheme: (value: Theme) => void;
};

const ThemeContext = createContext<ThemeContextValue | null>(null);

const THEME_STORE_KEY = 'ui-theme';

const ThemeProvider = ({ children }: ThemeProviderProps) => {
  const [theme, setTheme] = useState<Theme>();

  useEffect(() => {
    const root = window.document.documentElement;
    if (typeof theme === 'undefined') {
      const savedTheme = localStorage.getItem(THEME_STORE_KEY);
      setTheme(savedTheme === 'dark' ? 'dark' : 'light');
    } else {
      root.classList.remove('light', 'dark');
      root.classList.add(theme);
      localStorage.setItem(THEME_STORE_KEY, theme);
    }
    return () => {};
  }, [theme]);

  return (
    <ThemeContext.Provider
      value={{
        theme: theme || 'light',
        setTheme,
      }}
    >
      {children}
    </ThemeContext.Provider>
  );
};

export default ThemeProvider;

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (context === null) throw new Error('useTheme must be used within a ThemeProvider');
  return context;
};
