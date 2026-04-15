'use client';

import { CreditAnalysisResult } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/creditAnalysis';

interface ResultDisplayProps {
  result: CreditAnalysisResult;
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  const status = result.approved ? 'Aprovado' : 'Reprovado';
  const bgClass = result.approved 
    ? 'bg-green-900/30 border-green-500' 
    : 'bg-red-900/30 border-red-500';
  const iconClass = result.approved 
    ? 'text-green-500' 
    : 'text-red-500';
  const icon = result.approved ? '✓' : '✗';

  return (
    <div className={`mt-6 p-6 rounded-lg border-2 ${bgClass}`}>
      <div className="flex items-center justify-center gap-3 mb-4">
        <span className={`text-4xl ${iconClass}`}>{icon}</span>
        <h2 className={`text-2xl font-bold ${result.approved ? 'text-green-500' : 'text-red-500'}`}>
          {status}
        </h2>
      </div>

      <div className="space-y-3 text-sm">
        <h3 className="font-semibold text-gray-300 border-b border-gray-700 pb-2">
          Detalhes da Análise:
        </h3>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Idade (mín. 18 anos):</span>
          <span className={result.reasons.age ? 'text-green-400' : 'text-red-400'}>
            {result.reasons.age ? '✓ Aprovado' : '✗ Reprovado'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Parcela / Renda (máx. 30%):</span>
          <span className={result.reasons.income ? 'text-green-400' : 'text-red-400'}>
            {formatCurrency(result.installmentAmount)} ({formatPercentage(result.incomePercentage)})
            {result.reasons.income ? ' ✓' : ' ✗'}
          </span>
        </div>

        <div className="flex justify-between items-center">
          <span className="text-gray-400">Histórico de Dívidas:</span>
          <span className={result.reasons.debtHistory ? 'text-green-400' : 'text-red-400'}>
            {result.reasons.debtHistory ? '✓ Limpo' : '✗ Com restrições'}
          </span>
        </div>
      </div>
    </div>
  );
}