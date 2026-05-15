'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
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
  ChevronLeft,
  ChevronRight,
  Command,
  Search,
} from 'lucide-react';

const navItems = [
  { href: '/dashboard', label: 'Dashboard', icon: Activity, shortcut: '⌘1' },
  { href: '/terminal', label: 'Terminal', icon: Terminal, shortcut: '⌘2' },
  { href: '/editor', label: 'Editor', icon: Code2, shortcut: '⌘3' },
  { href: '/monitor', label: 'System Monitor', icon: Activity, shortcut: '⌘4' },
  { href: '/memory', label: 'Memory Allocator', icon: Brain, shortcut: '⌘5' },
  { href: '/pipeline', label: 'Data Pipeline', icon: Workflow, shortcut: '⌘6' },
  { href: '/build', label: 'Build Pipeline', icon: Hammer, shortcut: '⌘7' },
  { href: '/analytics', label: 'Analytics', icon: BarChart3, shortcut: '⌘8' },
  { href: '/files', label: 'Files', icon: FolderTree, shortcut: '⌘9' },
  { href: '/settings', label: 'Settings', icon: Settings, shortcut: '⌘,' },
];

export function Sidebar() {
  const pathname = usePathname();
  const { sidebarOpen, toggleSidebar, setCommandPaletteOpen } = useUIStore();

  return (
    <>
      <motion.aside
        initial={false}
        animate={{ width: sidebarOpen ? 260 : 60 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="h-screen bg-surface-elevated border-r border-border flex flex-col relative z-40"
      >
        {/* Logo */}
        <div className="h-14 flex items-center px-4 border-b border-border">
          {sidebarOpen ? (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex items-center gap-3"
            >
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terminal-green to-terminal-cyan flex items-center justify-center">
                <Terminal size={16} className="text-black" />
              </div>
              <span className="font-display font-bold text-lg tracking-tight">
                Dev<span className="text-terminal-green">Førge</span>
              </span>
            </motion.div>
          ) : (
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-terminal-green to-terminal-cyan flex items-center justify-center mx-auto">
              <Terminal size={14} className="text-black" />
            </div>
          )}
        </div>

        {/* Search + Command Palette */}
        <button
          onClick={() => setCommandPaletteOpen(true)}
          className="mx-3 mt-3 mb-1 h-9 flex items-center gap-2 px-3 rounded-lg bg-surface border border-border text-muted-foreground hover:text-foreground hover:border-border-strong transition-all text-sm"
        >
          <Search size={14} />
          {sidebarOpen && (
            <>
              <span className="flex-1 text-left">Search...</span>
              <kbd className="text-xs bg-surface-elevated px-1.5 py-0.5 rounded border border-border">
                ⌘K
              </kbd>
            </>
          )}
        </button>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-2 px-2">
          {navItems.map((item, i) => {
            const isActive = pathname === item.href || (item.href !== '/dashboard' && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'flex items-center gap-3 px-3 h-10 rounded-lg mb-0.5 transition-all duration-150 group relative',
                  isActive
                    ? 'bg-terminal-green/10 text-terminal-green font-medium'
                    : 'text-muted-foreground hover:text-foreground hover:bg-surface'
                )}
              >
                <item.icon
                  size={18}
                  className={cn(
                    'flex-shrink-0 transition-colors',
                    isActive ? 'text-terminal-green' : 'text-muted-foreground group-hover:text-foreground'
                  )}
                />
                {sidebarOpen && (
                  <motion.span
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="text-sm flex-1"
                  >
                    {item.label}
                  </motion.span>
                )}
                {sidebarOpen && isActive && (
                  <motion.div
                    layoutId="sidebar-active"
                    className="absolute right-1 w-1 h-6 rounded-full bg-terminal-green"
                    transition={{ type: 'spring', stiffness: 500, damping: 35 }}
                  />
                )}
                {sidebarOpen && (
                  <kbd className="text-[10px] text-muted-foreground/50 hidden group-hover:inline-block">
                    {item.shortcut}
                  </kbd>
                )}
              </Link>
            );
          })}
        </nav>

        {/* Collapse button */}
        <div className="border-t border-border p-2">
          <button
            onClick={toggleSidebar}
            className="w-full h-9 flex items-center justify-center rounded-lg hover:bg-surface transition-colors text-muted-foreground hover:text-foreground"
          >
            {sidebarOpen ? <ChevronLeft size={16} /> : <ChevronRight size={16} />}
          </button>
        </div>
      </motion.aside>
    </>
  );
}
