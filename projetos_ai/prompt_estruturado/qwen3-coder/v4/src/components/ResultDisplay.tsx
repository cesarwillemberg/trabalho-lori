'use client';

import { CreditAnalysisLog } from '@/types/credit';

interface ResultDisplayProps {
  log: CreditAnalysisLog;
}

export default function ResultDisplay({ log }: ResultDisplayProps) {
  const { resultado, dataHora } = log;
  const dataFormatada = new Date(dataHora).toLocaleString('pt-BR');

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <div
        className={`rounded-xl p-6 ${
          resultado.aprovado
            ? 'bg-green-50 border-2 border-green-200'
            : 'bg-red-50 border-2 border-red-200'
        }`}
      >
        <div className="flex items-center gap-3 mb-4">
          <div
            className={`w-12 h-12 rounded-full flex items-center justify-center ${
              resultado.aprovado ? 'bg-green-500' : 'bg-red-500'
            }`}
          >
            {resultado.aprovado ? (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </div>
          <div>
            <h2
              className={`text-2xl font-bold ${
                resultado.aprovado ? 'text-green-800' : 'text-red-800'
              }`}
            >
              {resultado.aprovado ? 'Aprovado' : 'Reprovado'}
            </h2>
            <p className="text-sm text-gray-500">{dataFormatada}</p>
          </div>
        </div>

        <div className="bg-white rounded-lg p-4 mb-4">
          <h3 className="font-semibold text-gray-800 mb-3">Detalhes da Análise</h3>
          <div className="grid gap-2 text-sm">
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Valor da Parcela (12x):</span>
              <span className="font-medium">
                R$ {resultado.detalhes.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Comprometimento da Renda:</span>
              <span
                className={`font-medium ${
                  resultado.detalhes.parcelaValida ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {resultado.detalhes.percentualComprometimento}%
              </span>
            </div>
            <div className="flex justify-between py-1 border-b border-gray-100">
              <span className="text-gray-600">Idade Válida (18+):</span>
              <span
                className={`font-medium ${
                  resultado.detalhes.idadeValida ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {resultado.detalhes.idadeValida ? 'Sim' : 'Não'}
              </span>
            </div>
            <div className="flex justify-between py-1">
              <span className="text-gray-600">Histórico Limpo:</span>
              <span
                className={`font-medium ${
                  resultado.detalhes.historicoValido ? 'text-green-600' : 'text-red-600'
                }`}
              >
                {resultado.detalhes.historicoValido ? 'Sim' : 'Não'}
              </span>
            </div>
          </div>
        </div>

        {!resultado.aprovado && resultado.motivoReprovacao.length > 0 && (
          <div className="bg-red-100 rounded-lg p-4">
            <h3 className="font-semibold text-red-800 mb-2">Motivos da Reprovação:</h3>
            <ul className="list-disc list-inside text-sm text-red-700 space-y-1">
              {resultado.motivoReprovacao.map((motivo, index) => (
                <li key={index}>{motivo}</li>
              ))}
            </ul>
          </div>
        )}

        {resultado.aprovado && (
          <div className="bg-green-100 rounded-lg p-4">
            <p className="text-sm text-green-800">
              Parabéns! Seu crédito foi aprovado. A parcela de{' '}
              <strong>
                R$ {resultado.detalhes.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
              </strong>{' '}
              está dentro dos parâmetros de comprometimento da sua renda.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
