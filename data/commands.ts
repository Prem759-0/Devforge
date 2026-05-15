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

const cppSnippets = `#include <iostream>
#include <vector>
#include <memory>

template<typename T>
class SmartPointer {
private:
    T* ptr;
    size_t* ref_count;
public:
    explicit SmartPointer(T* p = nullptr) : ptr(p), ref_count(new size_t(1)) {}
    ~SmartPointer() { release(); }
    T* operator->() { return ptr; }
    T& operator*() { return *ptr; }
};`;

const pythonSnippets = `import numpy as np
from dataclasses import dataclass
from typing import Generic, TypeVar

T = TypeVar('T')

@dataclass
class DataPipeline:
    stages: list
    config: dict
    
    async def execute(self, data: np.ndarray) -> np.ndarray:
        for stage in self.stages:
            data = await stage.process(data)
        return data`;

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
  cmatrix     - Activate Matrix mode
  build       - Run build pipeline
  monitor     - Show system monitor
  memory      - Run memory allocator
  pipeline    - Execute data pipeline
  htop        - Process monitor
  gcc [file]  - Compile C++ file
  python [file]- Run Python file
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
      if (file.includes('.cpp') || file.includes('.h'))
        return { output: cppSnippets, type: 'success' };
      if (file.includes('.py'))
        return { output: pythonSnippets, type: 'success' };
      return { output: `// Content of ${file}\n// Binary or unknown format`, type: 'warning' };
    },
  },
  whoami: {
    help: 'Display user info',
    execute: async () => ({
      output: 'devforge-user\nID: dev-042\nGroup: developers\nPermissions: rwx',
      type: 'info',
    }),
  },
  sysinfo: {
    help: 'Show system information',
    execute: async () => ({
      output: `OS: DevFørgeOS 24.04 LTS
Kernel: 6.8.0-devforge
Architecture: x86_64 + ARM64
CPU: DevForge Quantum Processor @ 4.2GHz (16 cores)
Memory: 64GB DDR5 @ 6400MHz
GPU: DevForge Visual Engine
Storage: 2TB NVMe SSD
Uptime: 42 days, 7 hours, 13 minutes`,
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
║  Built with Next.js + TypeScript    ║
║  Terminal • Editor • Monitor        ║
║  Memory • Pipeline • Build          ║
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
Coverage: 94.2%
Tests: 847 passed, 0 failed
Build Time: 2.3s
Last Deploy: 3 minutes ago`,
      type: 'info',
    }),
  },
  gcc: {
    help: 'Compile C++ file',
    execute: async (args) => {
      const file = args[0];
      if (!file) return { output: 'gcc: fatal error: no input files', type: 'error' };
      return {
        output: `[Compiling] ${file}...
[1/3] Preprocessing... ✓
[2/3] Compilation... ✓
[3/3] Linking... ✓
Output: a.out (48KB)
Warnings: 0
Errors: 0
Compilation successful! ✓`,
        type: 'success',
      };
    },
  },
  python: {
    help: 'Run Python file',
    execute: async (args) => {
      const file = args[0];
      if (!file) return { output: 'python: missing file argument', type: 'error' };
      return {
        output: `Executing: ${file}
Python 3.12.0
>>> import numpy as np
>>> data = np.random.randn(1000, 10)
>>> result = pipeline.fit_transform(data)
>>> print(f"Shape: {result.shape}")
Shape: (1000, 10)
Execution time: 0.042s
Process finished with exit code 0`,
        type: 'success',
      };
    },
  },
  htop: {
    help: 'Process monitor',
    execute: async () => ({
      output: `  PID USER      PRI  NI  VIRT   RES   SHR S CPU% MEM%   TIME+  Command
 1042 dev        20   0  4.2G  1.8G  892M R 12.5  2.8  0:42.17 node
  876 dev        20   0  2.1G  890M  445M S  5.2  1.4  0:18.33 vscode
  421 root       20   0  1.5G  567M  234M S  2.1  0.9  0:03.42 docker
  128 dev        20   0  8.7G  3.2G  1.1G S  0.5  5.1  1:23.17 chrome
    1 root       20   0   98M   45M   12M S  0.0  0.1  0:00.42 systemd`,
      type: 'info',
    }),
  },
};

const simpleCommands = ['clear', 'pwd', 'whoami', 'sysinfo', 'neofetch', 'date', 'about', 'status', 'htop'];

export async function executeCommand(
  input: string,
  workingDirectory: string
): Promise<{ output: string; type: TerminalCommand['type'] }> {
  const parts = input.trim().split(/\s+/);
  const cmd = parts[0]?.toLowerCase() || '';
  const args = parts.slice(1);

  const handler = commandHandlers[cmd];
  if (handler) {
    const result = await handler.execute(args, workingDirectory);
    return result;
  }

  if (simpleCommands.includes(cmd)) {
    const handler = commandHandlers[cmd]!;
    return handler.execute(args, workingDirectory);
  }

  return {
    output: `zsh: command not found: ${cmd}\nType 'help' for available commands.`,
    type: 'error',
  };
}
