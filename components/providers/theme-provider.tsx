'use client';

import React, { createContext, useContext, useEffect } from 'react';
import { useUIStore } from '@/store/ui-store';
import { themes, type ThemeId } from '@/styles/themes';

const ThemeContext = createContext<{ theme: ThemeId }>({ theme: 'dark' });

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const theme = useUIStore((s) => s.settings.theme);

  useEffect(() => {
    const root = document.documentElement;
    root.classList.remove('light', 'dark', 'high-contrast', 'cyberpunk', 'forest');
    if (theme === 'light') root.classList.add('light');
    else if (theme === 'high-contrast') root.classList.add('high-contrast');
    else if (theme === 'cyberpunk') root.classList.add('cyberpunk');
    else if (theme === 'forest') root.classList.add('forest');
    else root.classList.add('dark');

    const themeConfig = themes[theme as ThemeId] || themes.dark;
    Object.entries(themeConfig.colors).forEach(([key, value]) => {
      root.style.setProperty(`--${key.replace(/([A-Z])/g, '-$1').toLowerCase()}`, value);
    });
  }, [theme]);

  return <ThemeContext.Provider value={{ theme }}>{children}</ThemeContext.Provider>;
}

export const useTheme = () => useContext(ThemeContext);
