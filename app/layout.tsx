import type { Metadata } from 'next';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { KeyboardProvider } from '@/components/providers/keyboard-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { StatusBar } from '@/components/layout/status-bar';
import { CommandPalette } from '@/components/layout/command-palette';
import { PageTransition } from '@/components/layout/page-transition';
import './globals.css';

export const metadata: Metadata = {
  title: 'DevFørge — Elite Developer Workspace',
  description: 'Terminal, editor, system monitor, memory allocator, data pipeline, and build orchestrator — all in one powerful developer cockpit.',
  openGraph: {
    title: 'DevFørge — Elite Developer Workspace',
    description: 'The ultimate developer cockpit with terminal, editor, and monitoring tools.',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DevFørge — Elite Developer Workspace',
    description: 'The ultimate developer cockpit.',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="font-sans antialiased">
        <ThemeProvider>
          <KeyboardProvider>
            <ToastProvider>
              <div className="flex h-screen overflow-hidden bg-background">
                <Sidebar />
                <div className="flex-1 flex flex-col min-w-0">
                  <PageTransition>{children}</PageTransition>
                  <StatusBar />
                </div>
                <CommandPalette />
              </div>
            </ToastProvider>
          </KeyboardProvider>
        </ThemeProvider>
      </body>
    </html>
  );
}
