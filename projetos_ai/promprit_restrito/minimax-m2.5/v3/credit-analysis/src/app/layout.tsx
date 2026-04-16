import './globals.css';

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Aplicação para análise de crédito de clientes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
