export const themes = {
  dark: {
    name: 'Dark',
    id: 'dark',
    colors: {
      background: 'hsl(220 15% 6%)',
      surface: 'hsl(220 15% 9%)',
      surfaceElevated: 'hsl(220 15% 12%)',
      terminalGreen: '#00FF41',
      terminalCyan: '#00E5FF',
      terminalPurple: '#BD00FF',
      terminalYellow: '#FFD600',
      terminalRed: '#FF1744',
    },
  },
  light: {
    name: 'Light',
    id: 'light',
    colors: {
      background: 'hsl(0 0% 98%)',
      surface: 'hsl(0 0% 100%)',
      surfaceElevated: 'hsl(220 15% 94%)',
      terminalGreen: '#00A030',
      terminalCyan: '#0088AA',
      terminalPurple: '#7B00CC',
      terminalYellow: '#CC9900',
      terminalRed: '#CC1030',
    },
  },
  cyberpunk: {
    name: 'Cyberpunk',
    id: 'cyberpunk',
    colors: {
      background: '#0a0014',
      surface: '#110022',
      surfaceElevated: '#1a0033',
      terminalGreen: '#00ff88',
      terminalCyan: '#00ddff',
      terminalPurple: '#ff00ff',
      terminalYellow: '#ffff00',
      terminalRed: '#ff2244',
    },
  },
  forest: {
    name: 'Forest',
    id: 'forest',
    colors: {
      background: '#0a1a0a',
      surface: '#0f240f',
      surfaceElevated: '#152e15',
      terminalGreen: '#8fff8f',
      terminalCyan: '#7fcccc',
      terminalPurple: '#bf7fbf',
      terminalYellow: '#cccc7f',
      terminalRed: '#cc7f7f',
    },
  },
  highContrast: {
    name: 'High Contrast',
    id: 'high-contrast',
    colors: {
      background: '#000000',
      surface: '#0a0a0a',
      surfaceElevated: '#141414',
      terminalGreen: '#ffff00',
      terminalCyan: '#00ffff',
      terminalPurple: '#ff88ff',
      terminalYellow: '#ffff00',
      terminalRed: '#ff4444',
    },
  },
} as const;

export type ThemeId = keyof typeof themes;
