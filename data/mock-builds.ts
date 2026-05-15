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
