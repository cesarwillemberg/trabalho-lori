'use client';

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultDisplay from '@/components/ResultDisplay';
import LogViewer from '@/components/LogViewer';
import { CreditRequest, CreditResult } from '@/types';
import { processarAnaliseCredito } from '@/layers/service';

export default function Home() {
  const [resultado, setResultado] = useState<CreditResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (dados: CreditRequest) => {
    setIsLoading(true);
    setTimeout(() => {
      const resultadoAnalise = processarAnaliseCredito(dados);
      setResultado(resultadoAnalise);
      setIsLoading(false);
    }, 500);
  };

  return (
    <main className="container mx-auto px-4 py-8 max-w-xl">
      <h1 className="text-3xl font-bold text-center mb-8">
        Análise de Crédito
      </h1>

      <div className="bg-white p-6 rounded-lg shadow-md">
        <CreditForm onSubmit={handleSubmit} isLoading={isLoading} />
        <ResultDisplay resultado={resultado} />
      </div>

      <LogViewer />
    </main>
  );
}
