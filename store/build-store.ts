import { create } from 'zustand';
import type { Build } from '@/types/build';
import { generateId } from '@/lib/utils';

interface BuildState {
  builds: Build[];
  addBuild: (build: Omit<Build, 'id' | 'number' | 'stages' | 'artifacts'>) => Build;
  startBuild: (buildId: string) => void;
}

// Simple placeholder implementation (full version earlier)
export const useBuildStore = create<BuildState>((set, get) => ({
  builds: [],
  addBuild: (input) => {
    const build: Build = {
      ...input,
      id: generateId(),
      number: get().builds.length + 1,
      stages: [],
      artifacts: [],
    };
    set((s) => ({ builds: [build, ...s.builds] }));
    return build;
  },
  startBuild: (buildId) => {
    set((s) => ({
      builds: s.builds.map((b) => (b.id === buildId ? { ...b, status: 'running' as const } : b)),
    }));
  },
}));
