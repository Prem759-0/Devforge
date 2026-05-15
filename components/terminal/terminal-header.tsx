'use client';

import React from 'react';
import { cn } from '@/lib/utils';
import type { TerminalTab } from '@/types';

interface TerminalHeaderProps {
  tabs: TerminalTab[];
  activeTabId: string | null;
  onTabClick: (id: string) => void;
  onTabClose: (id: string) => void;
  onNewTab: () => void;
  isFullscreen: boolean;
  onToggleFullscreen: () => void;
}

export function TerminalHeader({
  tabs,
  activeTabId,
  onTabClick,
  onTabClose,
  onNewTab,
  isFullscreen,
  onToggleFullscreen,
}: TerminalHeaderProps) {
  return (
    <div className="flex items-center justify-between bg-surface-elevated border-b border-border px-2 h-9">
      <div className="flex items-center gap-1 overflow-x-auto">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => onTabClick(tab.id)}
            className={cn(
              'px-3 h-7 text-xs font-mono rounded-t-md flex items-center gap-2 transition-colors whitespace-nowrap',
              tab.id === activeTabId
                ? 'bg-surface text-terminal-green border-t border-x border-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.name}
            <span
              onClick={(e) => {
                e.stopPropagation();
                onTabClose(tab.id);
              }}
              className="ml-1 hover:text-terminal-red cursor-pointer text-lg leading-none"
            >
              ×
            </span>
          </button>
        ))}
        <button
          onClick={onNewTab}
          className="px-2 h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          +
        </button>
      </div>
      <button
        onClick={onToggleFullscreen}
        className="px-2 text-muted-foreground hover:text-foreground"
      >
        {isFullscreen ? '🗕' : '🗖'}
      </button>
    </div>
  );
}
