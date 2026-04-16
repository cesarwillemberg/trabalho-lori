import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Análise de Crédito',
  description: 'Sistema de avaliação de aprovação de crédito',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  )
}
