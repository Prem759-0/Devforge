export interface TerminalCommand {
  id: string;
  input: string;
  output: string;
  timestamp: Date;
  type: 'success' | 'error' | 'warning' | 'info';
  workingDirectory: string;
}

export interface TerminalTab {
  id: string;
  name: string;
  commands: TerminalCommand[];
  workingDirectory: string;
  isActive: boolean;
}

export interface Settings {
  theme: 'dark' | 'light' | 'cyberpunk' | 'forest' | 'high-contrast';
  fontSize: number;
  fontFamily: 'JetBrains Mono' | 'Fira Code' | 'Cascadia Code';
  terminalFontSize: number;
  tabSize: number;
  showLineNumbers: boolean;
  showMinimap: boolean;
  wordWrap: boolean;
  autoSave: boolean;
  notifications: boolean;
  soundEffects: boolean;
  reducedMotion: boolean;
}

export interface Build {
  id: string;
  number: number;
  project: string;
  status: 'queued' | 'running' | 'success' | 'failed' | 'cancelled';
  trigger: 'push' | 'pull_request' | 'schedule' | 'manual' | 'webhook';
  branch: string;
  commit: string;
  commitMessage: string;
  author: string;
  avatarUrl: string;
  stages: any[];
  artifacts: any[];
  totalDuration?: number;
  startedAt?: Date;
  completedAt?: Date;
  environment: string;
  tags: string[];
}
