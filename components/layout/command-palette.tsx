'use client';

import React, { useEffect, useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { useUIStore } from '@/store/ui-store';
import {
  Terminal,
  Code2,
  Activity,
  Brain,
  Workflow,
  Hammer,
  BarChart3,
  Settings,
  FolderTree,
  Search,
  Sun,
  Moon,
  Contrast,
  Zap,
} from 'lucide-react';

interface CommandItem {
  id: string;
  label: string;
  description: string;
  icon: React.ElementType;
  category: string;
  action: () => void;
  shortcut?: string;
}

export function CommandPalette() {
  const router = useRouter();
  const { commandPaletteOpen, setCommandPaletteOpen, settings, updateSettings } = useUIStore();
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const commands: CommandItem[] = [
    { id: 'dashboard', label: 'Go to Dashboard', description: 'View project overview', icon: Activity, category: 'Navigation', action: () => router.push('/dashboard'), shortcut: '⌘1' },
    { id: 'terminal', label: 'Open Terminal', description: 'Interactive terminal emulator', icon: Terminal, category: 'Navigation', action: () => router.push('/terminal'), shortcut: '⌘2' },
    { id: 'editor', label: 'Open Editor', description: 'Code editor with syntax highlighting', icon: Code2, category: 'Navigation', action: () => router.push('/editor'), shortcut: '⌘3' },
    { id: 'monitor', label: 'System Monitor', description: 'Real-time system resource monitoring', icon: Activity, category: 'Navigation', action: () => router.push('/monitor'), shortcut: '⌘4' },
    { id: 'memory', label: 'Memory Allocator', description: 'C++ memory allocation simulator', icon: Brain, category: 'Navigation', action: () => router.push('/memory'), shortcut: '⌘5' },
    { id: 'pipeline', label: 'Data Pipeline', description: 'Python data pipeline builder', icon: Workflow, category: 'Navigation', action: () => router.push('/pipeline'), shortcut: '⌘6' },
    { id: 'build', label: 'Build Pipeline', description: 'CI/CD build orchestrator', icon: Hammer, category: 'Navigation', action: () => router.push('/build'), shortcut: '⌘7' },
    { id: 'analytics', label: 'Analytics', description: 'Project metrics and insights', icon: BarChart3, category: 'Navigation', action: () => router.push('/analytics'), shortcut: '⌘8' },
    { id: 'files', label: 'File Explorer', description: 'Browse project files', icon: FolderTree, category: 'Navigation', action: () => router.push('/files'), shortcut: '⌘9' },
    { id: 'settings', label: 'Settings', description: 'Configure DevFørge', icon: Settings, category: 'Navigation', action: () => router.push('/settings'), shortcut: '⌘,' },
    { id: 'theme-dark', label: 'Dark Theme', description: 'Switch to dark theme', icon: Moon, category: 'Theme', action: () => updateSettings({ theme: 'dark' }) },
    { id: 'theme-light', label: 'Light Theme', description: 'Switch to light theme', icon: Sun, category: 'Theme', action: () => updateSettings({ theme: 'light' }) },
    { id: 'theme-high', label: 'High Contrast', description: 'Switch to high contrast', icon: Contrast, category: 'Theme', action: () => updateSettings({ theme: 'high-contrast' }) },
    { id: 'theme-cyber', label: 'Cyberpunk Theme', description: 'Switch to cyberpunk theme', icon: Zap, category: 'Theme', action: () => updateSettings({ theme: 'cyberpunk' }) },
  ];

  const filtered = query
    ? commands.filter(
        (c) =>
          c.label.toLowerCase().includes(query.toLowerCase()) ||
          c.description.toLowerCase().includes(query.toLowerCase()) ||
          c.category.toLowerCase().includes(query.toLowerCase())
      )
    : commands;

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setCommandPaletteOpen(!commandPaletteOpen);
      }
      if (e.key === 'Escape' && commandPaletteOpen) {
        setCommandPaletteOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [commandPaletteOpen, setCommandPaletteOpen]);

  const handleSelect = useCallback(
    (index: number) => {
      const cmd = filtered[index];
      if (cmd) {
        cmd.action();
        setCommandPaletteOpen(false);
        setQuery('');
      }
    },
    [filtered, setCommandPaletteOpen]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev + 1) % filtered.length);
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev - 1 + filtered.length) % filtered.length);
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSelect(selectedIndex);
    } else if (e.key === 'Escape') {
      setCommandPaletteOpen(false);
    }
  };

  return (
    <AnimatePresence>
      {commandPaletteOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50"
            onClick={() => setCommandPaletteOpen(false)}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -20 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-[15%] left-1/2 -translate-x-1/2 w-full max-w-xl z-50"
          >
            <div className="glass-panel overflow-hidden shadow-2xl shadow-terminal-green/5">
              <div className="flex items-center gap-3 px-4 h-14 border-b border-border">
                <Search size={16} className="text-muted-foreground flex-shrink-0" />
                <input
                  autoFocus
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={handleKeyDown}
                  placeholder="Type a command or search..."
                  className="flex-1 bg-transparent border-none outline-none text-foreground placeholder:text-muted-foreground/50 font-mono text-sm"
                />
                <kbd className="text-xs text-muted-foreground bg-surface px-2 py-0.5 rounded border border-border">
                  esc
                </kbd>
              </div>
              <div className="max-h-80 overflow-y-auto p-2">
                {filtered.length === 0 ? (
                  <div className="text-center py-8 text-muted-foreground text-sm">
                    No results found
                  </div>
                ) : (
                  filtered.map((cmd, i) => (
                    <motion.button
                      key={cmd.id}
                      initial={{ opacity: 0, x: -8 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.02 }}
                      onClick={() => handleSelect(i)}
                      className={`w-full flex items-center gap-3 px-3 h-12 rounded-lg text-left transition-colors ${
                        i === selectedIndex
                          ? 'bg-terminal-green/10 text-terminal-green'
                          : 'text-foreground hover:bg-surface'
                      }`}
                    >
                      <cmd.icon size={16} className="flex-shrink-0" />
                      <div className="flex-1 min-w-0">
                        <div className="text-sm font-medium">{cmd.label}</div>
                        <div className="text-xs text-muted-foreground truncate">{cmd.description}</div>
                      </div>
                      <span className="text-[10px] text-muted-foreground bg-surface px-1.5 py-0.5 rounded">
                        {cmd.category}
                      </span>
                      {cmd.shortcut && (
                        <kbd className="text-[10px] text-muted-foreground ml-1">{cmd.shortcut}</kbd>
                      )}
                    </motion.button>
                  ))
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
