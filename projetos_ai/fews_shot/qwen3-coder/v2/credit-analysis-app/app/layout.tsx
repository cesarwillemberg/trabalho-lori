import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Analise de Credito',
  description: 'Sistema de avaliacao para concessao de credito',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
