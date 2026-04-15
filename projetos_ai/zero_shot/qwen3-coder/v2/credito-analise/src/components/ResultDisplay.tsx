'use client';

/**
 * Componente que exibe o resultado da análise de crédito
 */

import { ResultadoAnalise } from '@/types/credito';

interface ResultDisplayProps {
  resultado: ResultadoAnalise | null;
  error: string | null;
}

export default function ResultDisplay({ resultado, error }: ResultDisplayProps) {
  // Estado neutro — nada a exibir
  if (!resultado && !error) return null;

  // Erro de comunicação com a API
  if (error) {
    return (
      <div className="mt-6 rounded-xl border-2 border-red-300 bg-red-50 p-5">
        <p className="text-lg font-bold text-red-700">Erro</p>
        <p className="mt-1 text-sm text-red-600">{error}</p>
      </div>
    );
  }

  if (!resultado) return null;

  const isApproved = resultado.aprovado;

  return (
    <div
      className={`mt-6 rounded-xl border-2 p-5 ${
        isApproved
          ? 'border-green-300 bg-green-50'
          : 'border-red-300 bg-red-50'
      }`}
    >
      {/* Status principal */}
      <p
        className={`text-xl font-bold ${
          isApproved ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {isApproved ? 'Aprovado' : 'Reprovado'}
      </p>

      {/* Motivo */}
      <p className="mt-2 text-sm text-gray-700">{resultado.motivo}</p>

      {/* Detalhes financeiros */}
      <div className="mt-4 grid grid-cols-2 gap-3">
        <div className="rounded-lg bg-white/60 px-3 py-2">
          <p className="text-xs text-gray-500">Valor da parcela (x12)</p>
          <p className="text-sm font-semibold text-gray-800">
            R${' '}
            {resultado.valorParcela.toLocaleString('pt-BR', {
              minimumFractionDigits: 2,
              maximumFractionDigits: 2,
            })}
          </p>
        </div>
        <div className="rounded-lg bg-white/60 px-3 py-2">
          <p className="text-xs text-gray-500">Comprometimento da renda</p>
          <p className="text-sm font-semibold text-gray-800">
            {(resultado.comprometimentoRenda * 100).toFixed(1)}%
          </p>
        </div>
      </div>
    </div>
  );
}
