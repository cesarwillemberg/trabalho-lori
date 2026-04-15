import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Credit Analyzer - Sistema de Análise de Crédito",
  description: "Sistema para análise de crédito de clientes com validação de idade, renda e histórico de dívidas",
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
