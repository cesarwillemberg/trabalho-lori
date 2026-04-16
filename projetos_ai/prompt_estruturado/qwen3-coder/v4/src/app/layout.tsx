import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Sistema de análise de crédito para avaliação de clientes',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="pt-BR">
      <body className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {children}
      </body>
    </html>
  );
}
