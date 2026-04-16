'use client';

import { CreditAnalysisResult } from '@/types';

interface ResultDisplayProps {
  resultado: CreditAnalysisResult | null;
}

export default function ResultDisplay({ resultado }: ResultDisplayProps) {
  if (!resultado) {
    return (
      <div className="bg-gray-50 rounded-lg p-8 text-center">
        <p className="text-gray-500">
          Preencha o formulário e clique em &quot;Analisar Crédito&quot; para ver o resultado.
        </p>
      </div>
    );
  }

  const formatarDataHora = (iso: string): string => {
    const data = new Date(iso);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatarMoeda = (valor: number): string => {
    return valor.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  return (
    <div className="space-y-6">
      <div
        className={`rounded-lg p-6 text-center ${
          resultado.aprovado
            ? 'bg-green-100 border-2 border-green-500'
            : 'bg-red-100 border-2 border-red-500'
        }`}
      >
        <h2
          className={`text-3xl font-bold mb-2 ${
            resultado.aprovado ? 'text-green-700' : 'text-red-700'
          }`}
        >
          {resultado.aprovado ? 'APROVADO' : 'REPROVADO'}
        </h2>
        <p className={`text-lg ${resultado.aprovado ? 'text-green-600' : 'text-red-600'}`}>
          {resultado.aprovado
            ? 'Parabéns! Seu crédito foi aprovado.'
            : 'Infelizmente, o crédito não foi aprovado.'}
        </p>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-4">
        <h3 className="font-semibold text-lg border-b pb-2">Detalhes da Análise</h3>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500">Valor da Parcela</p>
            <p className="font-semibold">{formatarMoeda(resultado.valorParcela)}</p>
            <p className="text-xs text-gray-400">12 parcelas fixas</p>
          </div>

          <div>
            <p className="text-sm text-gray-500">Comprometimento da Renda</p>
            <p className="font-semibold">{resultado.percentualComprometimento.toFixed(2)}%</p>
            <p className="text-xs text-gray-400">Máximo: 30%</p>
          </div>

          <div className="col-span-2">
            <p className="text-sm text-gray-500">Data e Hora da Análise</p>
            <p className="font-semibold">{formatarDataHora(resultado.dataHora)}</p>
          </div>
        </div>
      </div>

      <div className="bg-white border border-gray-200 rounded-lg p-6 space-y-3">
        <h3 className="font-semibold text-lg border-b pb-2">Regras Avaliadas</h3>

        {resultado.validacoes.map((validacao, indice) => (
          <div
            key={indice}
            className={`flex items-center justify-between p-3 rounded-lg ${
              validacao.aprovado ? 'bg-green-50' : 'bg-red-50'
            }`}
          >
            <div className="flex items-center gap-3">
              <span
                className={`w-6 h-6 rounded-full flex items-center justify-center text-white font-bold text-sm ${
                  validacao.aprovado ? 'bg-green-500' : 'bg-red-500'
                }`}
              >
                {validacao.aprovado ? '✓' : '✗'}
              </span>
              <div>
                <p className="font-medium">{validacao.regra}</p>
                <p className="text-sm text-gray-500">{validacao.mensagem}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
