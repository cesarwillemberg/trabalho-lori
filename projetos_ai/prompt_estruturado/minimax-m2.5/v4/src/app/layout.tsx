import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Sistema de análise de crédito para aprovação de empréstimos'
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
