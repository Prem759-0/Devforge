import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { TerminalTab, TerminalCommand } from '@/types';
import { generateId, formatTimestamp } from '@/lib/utils';

interface TerminalState {
  tabs: TerminalTab[];
  activeTabId: string | null;
  addTab: (name?: string) => string;
  removeTab: (id: string) => void;
  setActiveTab: (id: string) => void;
  addCommand: (tabId: string, input: string, output: string, type: TerminalCommand['type']) => void;
  clearTab: (tabId: string) => void;
  updateWorkingDirectory: (tabId: string, dir: string) => void;
  getActiveTab: () => TerminalTab | undefined;
}

const createTab = (name = 'Terminal'): TerminalTab => ({
  id: generateId(),
  name,
  commands: [],
  workingDirectory: '~/devforge',
  isActive: false,
});

const initialTab = createTab('Terminal 1');
initialTab.isActive = true;

export const useTerminalStore = create<TerminalState>()(
  persist(
    (set, get) => ({
      tabs: [initialTab],
      activeTabId: initialTab.id,
      addTab: (name) => {
        const tab = createTab(name || `Terminal ${get().tabs.length + 1}`);
        set((s) => ({
          tabs: [...s.tabs.map((t) => ({ ...t, isActive: false })), { ...tab, isActive: true }],
          activeTabId: tab.id,
        }));
        return tab.id;
      },
      removeTab: (id) => {
        set((s) => {
          const remaining = s.tabs.filter((t) => t.id !== id);
          if (remaining.length === 0) {
            const newTab = createTab();
            return { tabs: [newTab], activeTabId: newTab.id };
          }
          const newActiveId = s.activeTabId === id ? remaining[0]!.id : s.activeTabId;
          return {
            tabs: remaining.map((t) => ({ ...t, isActive: t.id === newActiveId })),
            activeTabId: newActiveId,
          };
        });
      },
      setActiveTab: (id) =>
        set((s) => ({
          tabs: s.tabs.map((t) => ({ ...t, isActive: t.id === id })),
          activeTabId: id,
        })),
      addCommand: (tabId, input, output, type) =>
        set((s) => ({
          tabs: s.tabs.map((t) =>
            t.id === tabId
              ? { ...t, commands: [...t.commands, { id: generateId(), input, output, timestamp: new Date(), type, workingDirectory: t.workingDirectory }] }
              : t
          ),
        })),
      clearTab: (tabId) =>
        set((s) => ({
          tabs: s.tabs.map((t) => (t.id === tabId ? { ...t, commands: [] } : t)),
        })),
      updateWorkingDirectory: (tabId, dir) =>
        set((s) => ({
          tabs: s.tabs.map((t) => (t.id === tabId ? { ...t, workingDirectory: dir } : t)),
        })),
      getActiveTab: () => {
        const state = get();
        return state.tabs.find((t) => t.id === state.activeTabId);
      },
    }),
    { name: 'devforge-terminal' }
  )
);
