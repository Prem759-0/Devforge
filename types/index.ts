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

export interface SystemStats {
  cpu: {
    usage: number;
    cores: number;
    temperature: number;
    frequency: number;
  };
  memory: {
    total: number;
    used: number;
    free: number;
    cached: number;
    swapTotal: number;
    swapUsed: number;
  };
  network: {
    upload: number;
    download: number;
    latency: number;
    packetsLost: number;
  };
  disk: {
    total: number;
    used: number;
    free: number;
    readSpeed: number;
    writeSpeed: number;
  };
}

export interface Process {
  pid: number;
  name: string;
  cpu: number;
  memory: number;
  status: 'running' | 'sleeping' | 'stopped' | 'zombie';
  user: string;
  uptime: number;
  threads: number;
  children: Process[];
}

export interface MemoryBlock {
  id: string;
  address: string;
  size: number;
  status: 'free' | 'allocated' | 'reserved' | 'fragmented';
  allocatedBy?: string;
  allocatedAt?: Date;
  color: string;
}

export interface BuildStage {
  id: string;
  name: string;
  status: 'pending' | 'running' | 'completed' | 'failed' | 'skipped';
  duration?: number;
  logs: string[];
  progress: number;
  startTime?: Date;
  endTime?: Date;
}

export interface BuildPipeline {
  id: string;
  name: string;
  stages: BuildStage[];
  status: 'idle' | 'running' | 'completed' | 'failed';
  trigger: 'manual' | 'push' | 'schedule' | 'pr';
  branch: string;
  commit: string;
  author: string;
  startedAt?: Date;
  completedAt?: Date;
}

export interface PipelineNode {
  id: string;
  type: 'source' | 'transform' | 'sink' | 'model';
  label: string;
  status: 'idle' | 'running' | 'completed' | 'error';
  x: number;
  y: number;
  config: Record<string, unknown>;
}

export interface PipelineEdge {
  id: string;
  source: string;
  target: string;
  label?: string;
}

export interface FileNode {
  id: string;
  name: string;
  type: 'file' | 'directory';
  extension?: string;
  size?: number;
  modifiedAt: Date;
  children?: FileNode[];
  language?: string;
}

export interface EditorTab {
  id: string;
  path: string;
  name: string;
  language: string;
  content: string;
  isDirty: boolean;
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

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  timestamp: Date;
  read: boolean;
  action?: {
    label: string;
    onClick: () => void;
  };
}
