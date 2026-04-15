import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Análise de Crédito",
  description: "Aplicação web para análise de crédito com registro de logs"
};

type RootLayoutProps = {
  children: React.ReactNode;
};

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="pt-BR">
      <body>{children}</body>
    </html>
  );
}
