import { createContext, useContext, useEffect, useState } from 'react';

const Theme = {
  DARK: 'dark',
  LIGHT: 'light',
  SYSTEM: 'system',
};

const ThemeProviderContext = createContext({
  theme: Theme.SYSTEM,
  setTheme: () => {},
});

function ThemeProvider({
  children,
  defaultTheme = Theme.SYSTEM,
  storageKey = 'vite-ui-theme',
  ...props
}) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem(storageKey);
    return storedTheme || defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');

    if (theme === Theme.SYSTEM) {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? Theme.DARK
        : Theme.LIGHT;

      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  const value = {
    theme,
    setTheme: (newTheme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

function useTheme() {
  const context = useContext(ThemeProviderContext);

  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }

  return context;
}

export {
  ThemeProvider,
  useTheme,
  Theme,
};