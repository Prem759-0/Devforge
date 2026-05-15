'use client';

import { useEffect, useCallback } from 'react';

type KeyCombo = {
  key: string;
  ctrl?: boolean;
  meta?: boolean;
  shift?: boolean;
  alt?: boolean;
};

export function useKeyboardShortcut(combo: KeyCombo, callback: () => void, enabled = true) {
  const handler = useCallback(
    (e: KeyboardEvent) => {
      if (!enabled) return;
      const matches =
        e.key.toLowerCase() === combo.key.toLowerCase() &&
        !!e.ctrlKey === !!combo.ctrl &&
        !!e.metaKey === !!combo.meta &&
        !!e.shiftKey === !!combo.shift &&
        !!e.altKey === !!combo.alt;
      if (matches) {
        e.preventDefault();
        callback();
      }
    },
    [combo, callback, enabled]
  );

  useEffect(() => {
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handler]);
}
