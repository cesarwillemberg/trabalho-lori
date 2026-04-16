'use client';

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultDisplay from '@/components/ResultDisplay';
import HistoryLog from '@/components/HistoryLog';
import { CreditRequest, CreditAnalysis } from '@/types';
import { analisarCredito } from '@/lib/rules/creditRules';
import { registrarAnalise } from '@/lib/storage/storage';

export default function Home() {
  const [resultado, setResultado] = useState<{
    tipo: 'Aprovado' | 'Reprovado';
    detalhes: CreditAnalysis['detalhes'];
  } | null>(null);
  const [erros, setErros] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (dados: CreditRequest) => {
    setLoading(true);
    setErros([]);

    setTimeout(() => {
      const analise = analisarCredito(dados);

      if (!analise.validacao.valido) {
        setErros(analise.validacao.erros);
        setResultado(null);
      } else {
        setResultado({
          tipo: analise.resultado,
          detalhes: analise.detalhes,
        });

        registrarAnalise(dados, analise.resultado, analise.detalhes);
      }

      setLoading(false);
    }, 500);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Sistema de Análise de Crédito
          </h1>
          <p className="text-gray-600">
            Avalie a aprovação de crédito com base nas regras de negócio
          </p>
        </header>

        <section className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Dados do Cliente</h2>

          {erros.length > 0 && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-md">
              <ul className="list-disc list-inside text-sm text-red-700">
                {erros.map((erro, index) => (
                  <li key={index}>{erro}</li>
                ))}
              </ul>
            </div>
          )}

          <CreditForm onSubmit={handleSubmit} disabled={loading} />

          {resultado && (
            <ResultDisplay resultado={resultado.tipo} detalhes={resultado.detalhes} />
          )}
        </section>

        <HistoryLog />

        <footer className="mt-8 text-center text-sm text-gray-500">
          <p>Regras: Idade mínima 18 anos | Máximo 30% da renda por parcela | Histórico limpo</p>
        </footer>
      </div>
    </main>
  );
}
