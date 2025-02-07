export const metadata = {
  title: 'Nettee | API Documentation',
  description: 'Nettee API DOCS',
  icons: {
    icon: 'https://swagger.io/docs/favicon.svg',
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
