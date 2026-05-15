'use client';

import React, { createContext, useContext, useEffect, useCallback, useRef } from 'react';
import { useUIStore } from '@/store/ui-store';
import { useRouter, usePathname } from 'next/navigation';

interface KeyboardContextType {
  registerShortcut: (keys: string, callback: () => void) => void;
}

const KeyboardContext = createContext<KeyboardContextType>({
  registerShortcut: () => {},
});

export function useKeyboard() {
  return useContext(KeyboardContext);
}

export function KeyboardProvider({ children }: { children: React.ReactNode }) {
  const router = useRouter();
  const pathname = usePathname();
  const { setCommandPaletteOpen, toggleSidebar } = useUIStore();
  const shortcutsRef = useRef<Map<string, () => void>>(new Map());

  const registerShortcut = useCallback((keys: string, callback: () => void) => {
    shortcutsRef.current.set(keys, callback);
    return () => {
      shortcutsRef.current.delete(keys);
    };
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const meta = e.metaKey || e.ctrlKey;

      // Command palette: ⌘K
      if (meta && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(true);
        return;
      }
      // Toggle sidebar: ⌘B
      if (meta && e.key === 'b') {
        e.preventDefault();
        toggleSidebar();
        return;
      }
      // Settings: ⌘,
      if (meta && e.key === ',') {
        e.preventDefault();
        router.push('/settings');
        return;
      }
      // Navigation with ⌘1-9
      const navMap: Record<string, string> = {
        '1': '/dashboard',
        '2': '/terminal',
        '3': '/editor',
        '4': '/monitor',
        '5': '/memory',
        '6': '/pipeline',
        '7': '/build',
        '8': '/analytics',
        '9': '/files',
      };
      if (meta && navMap[e.key]) {
        e.preventDefault();
        router.push(navMap[e.key]!);
        return;
      }

      // Custom registered shortcuts
      const combo = `${meta ? 'cmd+' : ''}${e.altKey ? 'alt+' : ''}${e.shiftKey ? 'shift+' : ''}${e.key}`;
      const handler = shortcutsRef.current.get(combo);
      if (handler) {
        e.preventDefault();
        handler();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [router, setCommandPaletteOpen, toggleSidebar]);

  return (
    <KeyboardContext.Provider value={{ registerShortcut }}>
      {children}
    </KeyboardContext.Provider>
  );
}
