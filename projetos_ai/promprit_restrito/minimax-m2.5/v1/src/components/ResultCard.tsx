'use client';

import { CreditResult } from '@/types';

/**
 * UI Layer - Componente de exibição do resultado da análise
 */

interface ResultCardProps {
  result: CreditResult | null;
}

export function ResultCard({ result }: ResultCardProps) {
  if (!result) return null;

  return (
    <div className={`p-6 rounded-lg border-2 ${result.aprovado ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
      <div className="flex items-center gap-3 mb-4">
        <span className={`text-3xl ${result.aprovado ? 'text-green-600' : 'text-red-600'}`}>
          {result.aprovado ? '✓' : '✗'}
        </span>
        <h3 className={`text-xl font-bold ${result.aprovado ? 'text-green-700' : 'text-red-700'}`}>
          {result.aprovado ? 'APROVADO' : 'REPROVADO'}
        </h3>
      </div>

      {result.aprovado ? (
        <div className="space-y-2 text-gray-700">
          <p><strong>Valor da Parcela:</strong> R$ {result.valorParcela.toFixed(2)}</p>
          <p><strong>Comprometimento:</strong> {result.percentualComprometido.toFixed(1)}% da renda</p>
        </div>
      ) : (
        <div className="text-gray-700">
          <p><strong>Motivo:</strong> {result.motivo}</p>
        </div>
      )}
    </div>
  );
}