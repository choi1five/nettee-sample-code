import '@nettee-sample/ui/globals.css';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="ko">
      <body className="flex min-h-screen flex-col items-center justify-start">
        <header className="mb-8 w-full bg-black p-4">
          <h1 className="text-3xl font-bold text-white">Sample_Code</h1>
        </header>
        <main className="mx-auto flex w-full max-w-5xl flex-grow flex-col p-4">{children}</main>
      </body>
    </html>
  );
}
