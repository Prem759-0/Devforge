import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import { ThemeProvider } from '@/components/providers/theme-provider';
import { ToastProvider } from '@/components/providers/toast-provider';
import { KeyboardProvider } from '@/components/providers/keyboard-provider';
import { Sidebar } from '@/components/layout/sidebar';
import { StatusBar } from '@/components/layout/status-bar';
import { CommandPalette } from '@/components/layout/command-palette';
import { PageTransition } from '@/components/layout/page-transition';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'DevFørge — Elite Developer Workspace',
  description: 'Terminal, editor, system monitor, memory allocator, data pipeline, and build orchestrator — all in one powerful developer cockpit.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} ${jetbrainsMono.variable} font-sans antialiased`}>
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
