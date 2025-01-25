'use client';

import { ThemeProvider as NextThemesProvider } from 'next-themes';

import WriteForm from '@/app/posts/write/_components/post-form';

export function Providers({ children }: { children: React.ReactNode }) {
  return (
    <NextThemesProvider
      attribute="class"
      defaultTheme="system"
      enableSystem
      disableTransitionOnChange
      enableColorScheme>
      <WriteForm />
      {children}
    </NextThemesProvider>
  );
}
