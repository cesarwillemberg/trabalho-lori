// src/app/layout.tsx
// Layout principal da aplicação

import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Aplicação web para análise de crédito de clientes'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}