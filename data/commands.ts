import type { TerminalCommand } from '@/types';

interface CommandHandler {
  execute: (args: string[], workingDirectory: string) => Promise<{ output: string; type: TerminalCommand['type'] }>;
  help: string;
}

const filesystem: Record<string, string[]> = {
  '~/devforge': ['src/', 'components/', 'package.json', 'tsconfig.json', 'README.md', 'Dockerfile'],
  '~/devforge/src': ['main.cpp', 'memory.cpp', 'allocator.h', 'pipeline.py', 'utils.ts'],
  '~/devforge/components': ['Terminal.tsx', 'Editor.tsx', 'Monitor.tsx', 'Build.tsx'],
  '~': ['devforge/', 'projects/', '.config/', '.ssh/'],
  '/': ['home/', 'etc/', 'usr/', 'var/', 'tmp/'],
};

export const commandHandlers: Record<string, CommandHandler> = {
  help: {
    help: 'Display available commands',
    execute: async () => ({
      output: `Available commands:
  help        - Show this help message
  clear       - Clear terminal
  ls [path]   - List directory contents
  pwd         - Print working directory
  cd <dir>    - Change directory
  cat <file>  - Display file contents
  echo <text> - Print text
  date        - Show current date/time
  whoami      - Display user info
  sysinfo     - Show system information
  neofetch    - Display system info with ASCII art
  build       - Run build pipeline
  status      - Show project status
  about       - About DevFørge`,
      type: 'info',
    }),
  },
  clear: {
    help: 'Clear terminal',
    execute: async () => ({ output: '__CLEAR__', type: 'success' }),
  },
  pwd: {
    help: 'Print working directory',
    execute: async (_, wd) => ({ output: wd, type: 'info' }),
  },
  ls: {
    help: 'List directory contents',
    execute: async (args, wd) => {
      const path = args[0] || wd;
      const contents = filesystem[path];
      if (!contents) return { output: `ls: cannot access '${path}': No such file or directory`, type: 'error' };
      const colored = contents
        .map((item) => (item.endsWith('/') ? `\x1b[34m${item}\x1b[0m` : `\x1b[32m${item}\x1b[0m`))
        .join('  ');
      return { output: colored, type: 'success' };
    },
  },
  cat: {
    help: 'Display file contents',
    execute: async (args) => {
      const file = args[0];
      if (!file) return { output: 'cat: missing file operand', type: 'error' };
      return { output: `// Content of ${file}\n// (simulated)`, type: 'warning' };
    },
  },
  whoami: {
    help: 'Display user info',
    execute: async () => ({ output: 'devforge-user', type: 'info' }),
  },
  sysinfo: {
    help: 'Show system information',
    execute: async () => ({
      output: `OS: DevFørgeOS 24.04 LTS
Kernel: 6.8.0-devforge
CPU: DevForge Quantum Processor @ 4.2GHz (16 cores)
Memory: 64GB`,
      type: 'info',
    }),
  },
  neofetch: {
    help: 'Display system info with ASCII art',
    execute: async () => ({
      output: `        ████████████        OS: DevFørgeOS
      ██            ██      Kernel: 6.8.0
    ██    ████████    ██    Shell: devsh 4.2
  ██  ████        ████  ██  Terminal: DevForge
  ██  ██  ██████  ██  ██  CPU: Quantum @ 4.2GHz
  ██    ██      ██    ██  Memory: 64GB
    ██  ██████████  ██    Theme: Dark+
      ██          ██      Packages: 1,247
        ████████████        Shell: zsh 5.9`,
      type: 'info',
    }),
  },
  date: {
    help: 'Show current date/time',
    execute: async () => ({
      output: new Date().toISOString().replace('T', ' ').substring(0, 19) + ' UTC',
      type: 'info',
    }),
  },
  echo: {
    help: 'Print text',
    execute: async (args) => ({ output: args.join(' '), type: 'info' }),
  },
  about: {
    help: 'About DevFørge',
    execute: async () => ({
      output: `╔══════════════════════════════════════╗
║        DevFørge v1.0.0              ║
║  Elite Developer Workspace          ║
║  © 2026 DevForge Industries         ║
╚══════════════════════════════════════╝`,
      type: 'info',
    }),
  },
  status: {
    help: 'Show project status',
    execute: async () => ({
      output: `Project: DevFørge
Status: ● BUILDING
Branch: main
Commit: a3f8c92
Coverage: 94.2%`,
      type: 'info',
    }),
  },
  build: {
    help: 'Run build pipeline',
    execute: async () => ({
      output: `[Build] Starting...
[1/4] Linting... ✓
[2/4] Type checking... ✓
[3/4] Compiling... ✓
[4/4] Testing... ✓
Build successful!`,
      type: 'success',
    }),
  },
};

export async function executeCommand(
  input: string,
  workingDirectory: string
): Promise<{ output: string; type: TerminalCommand['type'] }> {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);

  const handler = commandHandlers[cmd];
  if (handler) {
    return handler.execute(args, workingDirectory);
  }

  return {
    output: `zsh: command not found: ${cmd}\nType 'help' for available commands.`,
    type: 'error',
  };
}
