'use client';

/**
 * ResultDisplay Component (UI Layer)
 * 
 * Componente de interface responsável apenas por:
 * - Exibir o resultado da análise de crédito
 * - Mostrar detalhes do resultado (parcela, percentual)
 * 
 * NÃO contém lógica de negócio.
 */

import { CreditResult } from '@/types/credit';

interface ResultDisplayProps {
  resultado: CreditResult | null;
}

export default function ResultDisplay({ resultado }: ResultDisplayProps) {
  if (!resultado) return null;

  const { aprovado, motivo, valorParcela, percentualComprometimento } = resultado;

  return (
    <div
      className={`p-6 rounded-lg border-2 ${
        aprovado
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}
    >
      <h2
        className={`text-2xl font-bold mb-4 ${
          aprovado ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {aprovado ? 'APROVADO' : 'REPROVADO'}
      </h2>

      {motivo && (
        <p className={`mb-4 ${aprovado ? 'text-green-600' : 'text-red-600'}`}>
          {motivo}
        </p>
      )}

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Valor da Parcela:</span>
          <span className="font-medium">
            R$ {valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Comprometimento da Renda:</span>
          <span className="font-medium">
            {percentualComprometimento.toLocaleString('pt-BR')}%
          </span>
        </div>
      </div>
    </div>
  );
}
