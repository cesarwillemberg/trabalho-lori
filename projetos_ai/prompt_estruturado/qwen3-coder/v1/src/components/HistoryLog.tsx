'use client';

import { useEffect, useState } from 'react';
import { CreditAnalysis } from '@/types';
import { obterLogs, limparLogs } from '@/lib/storage/storage';

export default function HistoryLog() {
  const [logs, setLogs] = useState<CreditAnalysis[]>([]);

  useEffect(() => {
    setLogs(obterLogs());
  }, []);

  const handleLimpar = () => {
    if (confirm('Deseja limpar todos os registros?')) {
      limparLogs();
      setLogs([]);
    }
  };

  const formatarData = (dataISO: string) => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (logs.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-50 rounded-lg">
        <p className="text-gray-500 text-center">Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="mt-8">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">Histórico de Análises</h3>
        <button
          onClick={handleLimpar}
          className="text-sm text-red-600 hover:text-red-700"
        >
          Limpar Registros
        </button>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {logs.map((log, index) => (
          <div
            key={index}
            className={`p-3 rounded-lg border ${
              log.resultado === 'Aprovado'
                ? 'bg-green-50 border-green-200'
                : 'bg-red-50 border-red-200'
            }`}
          >
            <div className="flex justify-between items-start mb-2">
              <span className={`font-bold ${
                log.resultado === 'Aprovado' ? 'text-green-700' : 'text-red-700'
              }`}>
                {log.resultado}
              </span>
              <span className="text-xs text-gray-500">
                {formatarData(log.data)}
              </span>
            </div>
            <div className="text-sm text-gray-600 space-y-1">
              <p>Idade: {log.dadosCliente.idade} anos</p>
              <p>Renda: R$ {log.dadosCliente.rendaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p>Empréstimo: R$ {log.dadosCliente.valorEmprestimo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}</p>
              <p>Histórico: {log.dadosCliente.historicoDividas}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
