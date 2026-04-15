import './globals.css';

export const metadata = {
  title: 'Análise de Crédito',
  description: 'Sistema de análise de crédito para clientes'
};

export default function RootLayout({
  children
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}