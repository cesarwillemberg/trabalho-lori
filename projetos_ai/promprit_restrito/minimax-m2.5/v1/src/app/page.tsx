'use client';

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import { ResultCard } from '@/components/ResultCard';
import { LogTable } from '@/components/LogTable';
import { CreditResult } from '@/types';

/**
 * UI Layer - Página principal da aplicação
 * Coordena os componentes de UI e mantém estado local
 */

export default function Home() {
  const [result, setResult] = useState<CreditResult | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResult = (newResult: CreditResult) => {
    setResult(newResult);
    setRefreshKey(prev => prev + 1);
  };

  return (
    <main className="min-h-screen bg-gray-50 py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="text-center mb-10">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Análise de Crédito
          </h1>
          <p className="text-gray-600">
            Sistema de avaliação para aprovação de empréstimos pessoais
          </p>
        </div>

        <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
          <CreditForm onResult={handleResult} />
        </div>

        {result && (
          <div className="mb-8">
            <ResultCard result={result} />
          </div>
        )}

        <LogTable key={refreshKey} />
      </div>
    </main>
  );
}