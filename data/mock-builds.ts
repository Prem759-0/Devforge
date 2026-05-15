import { generateId, randomBetween } from '@/lib/utils';

export function generateMockStats() {
  return {
    commits: randomBetween(1200, 2500),
    buildCount: randomBetween(40, 80),
    testCoverage: randomBetween(92, 99),
    avgBuildTime: randomBetween(1800, 3500) / 1000,
    cpuUsage: randomBetween(20, 75),
    buildActivity: Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      builds: randomBetween(0, 15),
    })),
    memoryUsage: Array.from({ length: 24 }, (_, i) => ({
      name: `${i}:00`,
      usage: randomBetween(30, 85),
    })),
    recentBuilds: Array.from({ length: 5 }, (_, i) => ({
      id: generateId(),
      name: `build-${randomBetween(100, 999)}`,
      branch: ['main', 'develop', 'feature/auth', 'fix/memory-leak'][randomBetween(0, 3)] || 'main',
      commit: Math.random().toString(16).substring(2, 9),
      status: ['success', 'success', 'success', 'failed', 'building'][randomBetween(0, 4)] as 'success' | 'failed' | 'building',
      duration: `${randomBetween(1, 5)}m ${randomBetween(0, 59)}s`,
    })),
  };
}

export const mockBuildPipelines = [
  {
    id: 'pipeline-1',
    name: 'CI Build — main',
    stages: [
      { id: 's1', name: 'Checkout', status: 'completed' as const, progress: 100, duration: 1200, logs: ['Cloning repository...', 'Checking out commit a3f8c92...', 'Done.'] },
      { id: 's2', name: 'Install Dependencies', status: 'completed' as const, progress: 100, duration: 4500, logs: ['npm install...', '487 packages installed.', 'Done.'] },
      { id: 's3', name: 'Lint', status: 'completed' as const, progress: 100, duration: 2300, logs: ['Running ESLint...', '0 errors, 0 warnings.', 'Done.'] },
      { id: 's4', name: 'Type Check', status: 'completed' as const, progress: 100, duration: 3400, logs: ['tsc --noEmit...', 'No type errors.', 'Done.'] },
      { id: 's5', name: 'Build', status: 'running' as const, progress: 67, duration: 0, logs: ['Building Next.js app...', 'Compiling...'] },
      { id: 's6', name: 'Test', status: 'pending' as const, progress: 0, duration: 0, logs: [] },
      { id: 's7', name: 'Deploy', status: 'pending' as const, progress: 0, duration: 0, logs: [] },
    ],
    status: 'running' as const,
    trigger: 'push' as const,
    branch: 'main',
    commit: 'a3f8c92',
    author: 'devforge-user',
    startedAt: new Date(),
  },
];

export const mockMemoryBlocks = Array.from({ length: 32 }, (_, i) => ({
  id: `block-${i}`,
  address: `0x${(0x7f000000 + i * 4096).toString(16)}`,
  size: [64, 128, 256, 512, 1024, 2048, 4096][randomBetween(0, 6)] || 256,
  status: ['free', 'allocated', 'reserved', 'fragmented'][randomBetween(0, 3)] as 'free' | 'allocated' | 'reserved' | 'fragmented',
  allocatedBy: Math.random() > 0.4 ? `process_${randomBetween(100, 999)}` : undefined,
  allocatedAt: Math.random() > 0.4 ? new Date(Date.now() - randomBetween(1000, 86400000)) : undefined,
  color: ['#00FF41', '#00E5FF', '#BD00FF', '#FFD600', '#FF1744'][randomBetween(0, 4)] || '#00FF41',
}));
