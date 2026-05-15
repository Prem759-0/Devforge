'use client';

import React, { useRef, useEffect, useCallback, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTerminalStore } from '@/store/terminal-store';
import { executeCommand } from '@/data/commands';
import { cn, formatTimestamp } from '@/lib/utils';

export function TerminalEmulator() {
  const {
    tabs,
    activeTabId,
    setActiveTab,
    addTab,
    removeTab,
    addCommand,
    clearTab,
    updateWorkingDirectory,
    getActiveTab,
  } = useTerminalStore();

  const [input, setInput] = useState('');
  const [historyIndex, setHistoryIndex] = useState(-1);
  const inputRef = useRef<HTMLInputElement>(null);
  const outputRef = useRef<HTMLDivElement>(null);

  const activeTab = getActiveTab();
  const commandHistory = activeTab?.commands.filter((c) => c.input).map((c) => c.input) || [];

  useEffect(() => {
    if (outputRef.current) {
      outputRef.current.scrollTop = outputRef.current.scrollHeight;
    }
  }, [activeTab?.commands]);

  useEffect(() => {
    inputRef.current?.focus();
  }, [activeTabId]);

  const handleCommand = useCallback(
    async (cmd: string) => {
      if (!activeTabId || !cmd.trim()) return;
      const result = await executeCommand(cmd, activeTab?.workingDirectory || '~/devforge');
      if (result.output === '__CLEAR__') {
        clearTab(activeTabId);
        return;
      }
      addCommand(activeTabId, cmd, result.output, result.type);
      if (cmd.startsWith('cd ')) {
        const newDir = cmd.substring(3).trim();
        updateWorkingDirectory(activeTabId, newDir);
      }
      setHistoryIndex(-1);
    },
    [activeTabId, activeTab?.workingDirectory, addCommand, clearTab, updateWorkingDirectory]
  );

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input);
      setInput('');
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (commandHistory.length > 0) {
        const newIndex = historyIndex < commandHistory.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1;
        setHistoryIndex(newIndex);
        setInput(commandHistory[commandHistory.length - 1 - newIndex] || '');
      } else {
        setHistoryIndex(-1);
        setInput('');
      }
    } else if (e.key === 'l' && e.ctrlKey) {
      e.preventDefault();
      clearTab(activeTabId!);
    }
  };

  return (
    <div className="flex flex-col h-full bg-surface border border-border rounded-xl overflow-hidden">
      {/* Tab bar */}
      <div className="flex items-center bg-surface-elevated border-b border-border px-2 gap-1 h-9">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={cn(
              'px-3 h-7 text-xs font-mono rounded-t-md flex items-center gap-2 transition-colors',
              tab.id === activeTabId
                ? 'bg-surface text-terminal-green border-t border-x border-border'
                : 'text-muted-foreground hover:text-foreground'
            )}
          >
            {tab.name}
            <span
              onClick={(e) => {
                e.stopPropagation();
                removeTab(tab.id);
              }}
              className="ml-1 hover:text-terminal-red cursor-pointer"
            >
              ×
            </span>
          </button>
        ))}
        <button
          onClick={() => addTab()}
          className="px-2 h-7 text-xs text-muted-foreground hover:text-foreground"
        >
          +
        </button>
      </div>

      {/* Output */}
      <div ref={outputRef} className="flex-1 overflow-y-auto p-4 font-mono text-sm leading-relaxed cursor-text" onClick={() => inputRef.current?.focus()}>
        <AnimatePresence mode="popLayout">
          {activeTab?.commands.map((cmd) => (
            <motion.div
              key={cmd.id}
              initial={{ opacity: 0, y: -4 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.15 }}
              className="mb-2"
            >
              <div className="flex items-center gap-2 text-terminal-green">
                <span className="text-terminal-cyan">❯</span>
                <span className="text-terminal-purple">{cmd.workingDirectory}</span>
                <span className="text-terminal-yellow">git:(main)</span>
                <span className="text-muted-foreground text-xs">{formatTimestamp(cmd.timestamp)}</span>
              </div>
              <div className="ml-4 text-foreground/90">{cmd.input}</div>
              {cmd.output && (
                <div
                  className={cn(
                    'ml-2 mt-1 whitespace-pre-wrap',
                    cmd.type === 'error' && 'text-terminal-red',
                    cmd.type === 'warning' && 'text-terminal-yellow',
                    cmd.type === 'success' && 'text-terminal-green',
                    cmd.type === 'info' && 'text-foreground/80'
                  )}
                >
                  {cmd.output}
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>

        {/* Input line */}
        <div className="flex items-center gap-2 mt-1">
          <span className="text-terminal-cyan">❯</span>
          <span className="text-terminal-purple">{activeTab?.workingDirectory || '~'}</span>
          <span className="text-terminal-yellow">git:(main)</span>
          <div className="flex-1 flex items-center">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              className="flex-1 bg-transparent border-none outline-none font-mono text-sm text-foreground caret-terminal-green placeholder:text-muted-foreground/50"
              placeholder="Type a command..."
              spellCheck={false}
              autoComplete="off"
            />
            <span className="terminal-cursor ml-0.5" />
          </div>
        </div>
      </div>
    </div>
  );
}
