'use client';

/**
 * LogsDisplay Component (UI Layer)
 * 
 * Componente de interface responsável apenas por:
 * - Exibir o histórico de análises realizadas
 * - Mostrar logs formatados
 * 
 * NÃO contém lógica de negócio.
 */

import { CreditLog } from '@/types/credit';

interface LogsDisplayProps {
  logs: CreditLog[];
  onLimpar: () => void;
}

export default function LogsDisplay({ logs, onLimpar }: LogsDisplayProps) {
  if (logs.length === 0) return null;

  const formatarData = (dataISO: string): string => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold text-gray-800">
          Histórico de Análises ({logs.length})
        </h3>
        <button
          onClick={onLimpar}
          className="text-sm text-red-600 hover:text-red-800 underline"
        >
          Limpar Histórico
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`p-4 rounded-lg border ${
              log.resultado.aprovado
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span
                className={`font-semibold ${
                  log.resultado.aprovado ? 'text-green-700' : 'text-red-700'
                }`}
              >
                {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
              </span>
              <span className="text-xs text-gray-500">
                {formatarData(log.dataHora)}
              </span>
            </div>

            <div className="text-sm text-gray-600 grid grid-cols-2 gap-x-4 gap-y-1">
              <span>Idade: {log.cliente.idade} anos</span>
              <span>Renda: R$ {log.cliente.rendaMensal.toLocaleString('pt-BR')}</span>
              <span>
                Histórico: {log.cliente.historicoDividas === 'limpo' ? 'Limpo' : 'Negativado'}
              </span>
              <span>
                Empréstimo: R$ {log.cliente.valorEmprestimo.toLocaleString('pt-BR')}
              </span>
            </div>

            {log.resultado.motivo && (
              <p className="text-xs text-gray-500 mt-2 italic">
                {log.resultado.motivo}
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
