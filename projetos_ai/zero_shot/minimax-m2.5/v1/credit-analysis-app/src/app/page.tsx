'use client';

import CreditForm from '@/components/CreditForm';
import LogTable from '@/components/LogTable';

export default function Home() {
  return (
    <div className="min-h-screen bg-[#0f0f0f] py-8 px-4">
      <div className="max-w-xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-white mb-2">
            Análise de Crédito
          </h1>
          <p className="text-gray-400">
            Sistema de avaliação de elegibilidade para empréstimos
          </p>
        </header>

        <main className="bg-[#1a1a1a] border border-[#27272a] rounded-xl p-6 shadow-lg">
          <CreditForm />
        </main>

        <LogTable />

        <footer className="mt-8 text-center text-gray-500 text-sm">
          <p>© 2026 - Sistema de Análise de Crédito</p>
        </footer>
      </div>
    </div>
  );
}