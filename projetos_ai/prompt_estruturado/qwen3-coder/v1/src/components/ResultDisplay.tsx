'use client';

import { CreditAnalysis } from '@/types';

interface ResultDisplayProps {
  resultado: 'Aprovado' | 'Reprovado';
  detalhes: CreditAnalysis['detalhes'];
}

export default function ResultDisplay({ resultado, detalhes }: ResultDisplayProps) {
  if (!detalhes) return null;

  const isAprovado = resultado === 'Aprovado';

  return (
    <div className={`mt-6 p-4 rounded-lg ${isAprovado ? 'bg-green-50 border border-green-200' : 'bg-red-50 border border-red-200'}`}>
      <h2 className={`text-2xl font-bold mb-4 ${isAprovado ? 'text-green-700' : 'text-red-700'}`}>
        {resultado}
      </h2>

      <div className="space-y-2 text-sm">
        <div className="flex justify-between">
          <span className="text-gray-600">Valor da Parcela:</span>
          <span className="font-medium">
            R$ {detalhes.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Comprometimento da Renda:</span>
          <span className={`font-medium ${detalhes.parcelaComprometeRenda ? 'text-green-600' : 'text-red-600'}`}>
            {detalhes.percentualComprometimento.toFixed(1)}%
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Idade Válida (18+):</span>
          <span className={`font-medium ${detalhes.idadeValida ? 'text-green-600' : 'text-red-600'}`}>
            {detalhes.idadeValida ? 'Sim' : 'Não'}
          </span>
        </div>

        <div className="flex justify-between">
          <span className="text-gray-600">Histórico Negativado:</span>
          <span className={`font-medium ${detalhes.historicoNegativado ? 'text-red-600' : 'text-green-600'}`}>
            {detalhes.historicoNegativado ? 'Sim' : 'Não'}
          </span>
        </div>
      </div>

      {!isAprovado && (
        <div className="mt-4 pt-4 border-t border-red-200">
          <p className="text-sm text-red-700">
            <strong>Motivo da Reprovação:</strong>
            {!detalhes.idadeValida && ' Idade inferior a 18 anos.'}
            {detalhes.historicoNegativado && ' Cliente com histórico negativado.'}
            {!detalhes.parcelaComprometeRenda && ` Parcela compromete ${detalhes.percentualComprometimento.toFixed(1)}% da renda (máximo: 30%).`}
          </p>
        </div>
      )}
    </div>
  );
}
