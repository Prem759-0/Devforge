'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Card } from '@/components/ui/card';
import { AnimatedCounter } from '@/components/shared/animated-counter';
import { SpotlightCard } from '@/components/shared/spotlight-card';
import { TiltCard } from '@/components/shared/tilt-card';
import { AreaChart, BarChart, LineChart } from '@/components/charts';
import {
  Terminal,
  GitBranch,
  Cpu,
  HardDrive,
  Clock,
  Zap,
  Activity,
  Layers,
} from 'lucide-react';
import { generateMockStats } from '@/data/mock-builds';

export default function DashboardPage() {
  const [stats, setStats] = useState(generateMockStats());

  useEffect(() => {
    const interval = setInterval(() => {
      setStats(generateMockStats());
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.06, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.4, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <div className="h-full overflow-y-auto">
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className="p-8 space-y-8"
      >
        {/* Header */}
        <motion.div variants={itemVariants} className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-display font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Welcome back, developer. Your workspace is ready.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex items-center gap-2 text-sm text-terminal-green bg-terminal-green/10 px-3 py-1.5 rounded-full">
              <span className="w-2 h-2 rounded-full bg-terminal-green animate-pulse" />
              All Systems Operational
            </span>
          </div>
        </motion.div>

        {/* Stats Grid */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-terminal-green/10 flex items-center justify-center">
                <GitBranch size={18} className="text-terminal-green" />
              </div>
              <span className="text-xs text-terminal-green font-mono">+12%</span>
            </div>
            <div className="text-3xl font-display font-bold">
              <AnimatedCounter value={stats.commits} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Total Commits</div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-terminal-cyan/10 flex items-center justify-center">
                <Cpu size={18} className="text-terminal-cyan" />
              </div>
              <span className="text-xs text-terminal-cyan font-mono">{stats.cpuUsage}%</span>
            </div>
            <div className="text-3xl font-display font-bold">
              <AnimatedCounter value={stats.buildCount} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Builds Today</div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-terminal-purple/10 flex items-center justify-center">
                <Zap size={18} className="text-terminal-purple" />
              </div>
              <span className="text-xs text-terminal-purple font-mono">98.2%</span>
            </div>
            <div className="text-3xl font-display font-bold">
              <AnimatedCounter value={stats.testCoverage} suffix="%" />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Test Coverage</div>
          </SpotlightCard>

          <SpotlightCard className="p-5">
            <div className="flex items-center justify-between mb-3">
              <div className="w-10 h-10 rounded-xl bg-terminal-yellow/10 flex items-center justify-center">
                <Clock size={18} className="text-terminal-yellow" />
              </div>
              <span className="text-xs text-terminal-yellow font-mono">-0.3s</span>
            </div>
            <div className="text-3xl font-display font-bold">
              <AnimatedCounter value={stats.avgBuildTime} suffix="s" decimals={1} />
            </div>
            <div className="text-sm text-muted-foreground mt-1">Avg Build Time</div>
          </SpotlightCard>
        </motion.div>

        {/* Charts Row */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Card className="p-6 glass-panel">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Activity size={14} className="text-terminal-green" />
              Build Activity
            </h3>
            <AreaChart data={stats.buildActivity} dataKey="builds" color="#00FF41" height={200} />
          </Card>
          <Card className="p-6 glass-panel">
            <h3 className="text-sm font-semibold mb-4 flex items-center gap-2">
              <Layers size={14} className="text-terminal-cyan" />
              Memory Usage Over Time
            </h3>
            <LineChart data={stats.memoryUsage} dataKey="usage" color="#00E5FF" height={200} />
          </Card>
        </motion.div>

        {/* Recent Activity & Quick Actions */}
        <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <Card className="p-6 glass-panel lg:col-span-2">
            <h3 className="text-sm font-semibold mb-4">Recent Builds</h3>
            <div className="space-y-3">
              {stats.recentBuilds.map((build, i) => (
                <motion.div
                  key={build.id}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="flex items-center gap-4 p-3 rounded-lg bg-surface hover:bg-surface-elevated transition-colors cursor-pointer"
                >
                  <div
                    className={`w-2 h-2 rounded-full ${
                      build.status === 'success'
                        ? 'bg-terminal-green'
                        : build.status === 'failed'
                        ? 'bg-terminal-red'
                        : 'bg-terminal-yellow'
                    }`}
                  />
                  <div className="flex-1 min-w-0">
                    <div className="text-sm font-medium truncate">{build.name}</div>
                    <div className="text-xs text-muted-foreground">{build.branch} • {build.commit}</div>
                  </div>
                  <div className="text-xs text-muted-foreground font-mono">{build.duration}</div>
                </motion.div>
              ))}
            </div>
          </Card>

          <Card className="p-6 glass-panel">
            <h3 className="text-sm font-semibold mb-4">Quick Actions</h3>
            <div className="space-y-2">
              {[
                { icon: Terminal, label: 'Open Terminal', action: '/terminal' },
                { icon: HardDrive, label: 'System Monitor', action: '/monitor' },
                { icon: GitBranch, label: 'Run Build', action: '/build' },
                { icon: Activity, label: 'View Analytics', action: '/analytics' },
              ].map((item) => (
                <TiltCard key={item.label}>
                  <a
                    href={item.action}
                    className="flex items-center gap-3 p-3 rounded-lg bg-surface hover:bg-surface-elevated transition-colors cursor-pointer"
                  >
                    <item.icon size={16} className="text-terminal-green" />
                    <span className="text-sm">{item.label}</span>
                  </a>
                </TiltCard>
              ))}
            </div>
          </Card>
        </motion.div>
      </motion.div>
    </div>
  );
}
