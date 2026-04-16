/**
 * Layout Global da Aplicação
 * Configura o HTML, fontes e estrutura base
 */

import type { Metadata } from 'next';
import { Inter, JetBrains_Mono } from 'next/font/google';
import './globals.css';

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'Sistema de Análise de Crédito',
  description: 'Aplicação web para análise de crédito de clientes com validação e histórico',
  icons: {
    icon: 'data:image/svg+xml,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100"><rect fill="%232563eb" width="100" height="100" rx="20"/><text x="50" y="70" font-size="60" text-anchor="middle" fill="white" font-family="sans-serif" font-weight="bold">$</text></svg>',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body className={`${inter.variable} ${jetbrainsMono.variable}`}>
        <div className="app">
          <header className="header">
            <div className="header-content">
              <div className="logo">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <rect width="32" height="32" rx="8" fill="#2563eb" />
                  <text x="16" y="22" fontSize="18" textAnchor="middle" fill="white" fontWeight="bold">$</text>
                </svg>
                <span className="logo-text">Análise de Crédito</span>
              </div>
              <span className="version">v1.0.0</span>
            </div>
          </header>

          <main className="main">
            {children}
          </main>

          <footer className="footer">
            <p>Sistema de Análise de Crédito - {new Date().getFullYear()}</p>
          </footer>
        </div>
      </body>
    </html>
  );
}
