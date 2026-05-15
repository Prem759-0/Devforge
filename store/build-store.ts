import { create } from 'zustand';
import type { Build } from '@/types';
import { generateId } from '@/lib/utils';

interface BuildState {
  builds: Build[];
  addBuild: (build: Omit<Build, 'id' | 'number' | 'stages' | 'artifacts'>) => Build;
  startBuild: (buildId: string) => void;
}

export const useBuildStore = create<BuildState>((set, get) => ({
  builds: [
    {
      id: 'build-1',
      number: 1,
      project: 'DevFørge',
      status: 'success',
      trigger: 'push',
      branch: 'main',
      commit: 'a3f8c92',
      commitMessage: 'feat: add dashboard',
      author: 'devforge-user',
      avatarUrl: '',
      stages: [],
      artifacts: [],
      environment: 'production',
      tags: ['latest'],
    },
  ],
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
