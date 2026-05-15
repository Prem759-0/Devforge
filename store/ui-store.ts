import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { Settings } from '@/types';

interface UIState {
  sidebarOpen: boolean;
  commandPaletteOpen: boolean;
  statusBarVisible: boolean;
  settings: Settings;
  toggleSidebar: () => void;
  setSidebarOpen: (open: boolean) => void;
  toggleCommandPalette: () => void;
  setCommandPaletteOpen: (open: boolean) => void;
  toggleStatusBar: () => void;
  updateSettings: (settings: Partial<Settings>) => void;
  resetSettings: () => void;
}

const defaultSettings: Settings = {
  theme: 'dark',
  fontSize: 14,
  fontFamily: 'JetBrains Mono',
  terminalFontSize: 13,
  tabSize: 2,
  showLineNumbers: true,
  showMinimap: true,
  wordWrap: false,
  autoSave: true,
  notifications: true,
  soundEffects: false,
  reducedMotion: false,
};

export const useUIStore = create<UIState>()(
  persist(
    (set) => ({
      sidebarOpen: true,
      commandPaletteOpen: false,
      statusBarVisible: true,
      settings: defaultSettings,
      toggleSidebar: () => set((s) => ({ sidebarOpen: !s.sidebarOpen })),
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      toggleCommandPalette: () => set((s) => ({ commandPaletteOpen: !s.commandPaletteOpen })),
      setCommandPaletteOpen: (open) => set({ commandPaletteOpen: open }),
      toggleStatusBar: () => set((s) => ({ statusBarVisible: !s.statusBarVisible })),
      updateSettings: (newSettings) => set((s) => ({ settings: { ...s.settings, ...newSettings } })),
      resetSettings: () => set({ settings: defaultSettings }),
    }),
    { name: 'devforge-ui' }
  )
);
