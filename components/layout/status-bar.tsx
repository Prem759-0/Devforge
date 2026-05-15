'use client';

import React from 'react';
import { useUIStore } from '@/store/ui-store';
import { useSystemStore } from '@/store/terminal-store'; // we'll use terminal store for a simple status; alternatively create a small global store
import { useBuildStore } from '@/store/build-store';
import { Activity, GitBranch, Clock, Cpu } from 'lucide-react';
import { motion } from 'framer-motion';

export function StatusBar() {
  const { statusBarVisible, sidebarOpen, toggleSidebar, settings } = useUIStore();
  const builds = useBuildStore?.((s) => s.builds) || []; // safe access
  const latestBuild = builds[0];
  const buildStatus = latestBuild?.status || 'idle';

  const statusColor = {
    running: 'text-terminal-yellow',
    success: 'text-terminal-green',
    failed: 'text-terminal-red',
    idle: 'text-muted-foreground',
  }[buildStatus] || 'text-muted-foreground';

  if (!statusBarVisible) return null;

  return (
    <motion.footer
      initial={{ y: 10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      className="h-7 bg-surface-elevated border-t border-border flex items-center justify-between px-3 text-[11px] font-mono text-muted-foreground select-none z-50"
    >
      <div className="flex items-center gap-4">
        <button
          onClick={toggleSidebar}
          className="hover:text-foreground transition-colors flex items-center gap-1"
        >
          <Activity size={12} />
          <span>{sidebarOpen ? 'Hide' : 'Show'} Sidebar</span>
        </button>
        <span className="flex items-center gap-1">
          <GitBranch size={10} />
          main
        </span>
      </div>

      <div className="flex items-center gap-4">
        <span className="flex items-center gap-1">
          <Clock size={10} />
          {new Date().toLocaleTimeString('en-US', { hour12: false })}
        </span>
        <span className={`flex items-center gap-1 ${statusColor}`}>
          <span className="w-2 h-2 rounded-full bg-current" />
          Build: {buildStatus.toUpperCase()}
        </span>
        <span className="flex items-center gap-1">
          <Cpu size={10} />
          {settings.theme.toUpperCase()}
        </span>
        <span>{`Ln 1, Col 1`}</span>
        <span className="text-terminal-green">UTF-8</span>
      </div>
    </motion.footer>
  );
}
