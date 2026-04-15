'use client';

import { LogEntry } from '@/types';
import { useEffect, useState } from 'react';
import { CreditService } from '@/services/CreditService';

/**
 * UI Layer - Componente de exibição do histórico de análises
 */

export function LogTable() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    const dados = CreditService.obterLogs();
    setLogs(dados);
  }, []);

  const formatDate = (dataHora: string) => {
    return new Date(dataHora).toLocaleString('pt-BR');
  };

  if (logs.length === 0) {
    return (
      <div className="text-center text-gray-500 py-8">
        Nenhuma análise realizada ainda
      </div>
    );
  }

  return (
    <div className="mt-8">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">Histórico de Análises</h3>
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead className="bg-gray-100">
            <tr>
              <th className="px-4 py-2 text-left">Data/Hora</th>
              <th className="px-4 py-2 text-left">Idade</th>
              <th className="px-4 py-2 text-left">Renda</th>
              <th className="px-4 py-2 text-left">Empréstimo</th>
              <th className="px-4 py-2 text-left">Histórico</th>
              <th className="px-4 py-2 text-left">Resultado</th>
            </tr>
          </thead>
          <tbody>
            {logs.slice().reverse().map((log, index) => (
              <tr key={index} className="border-b hover:bg-gray-50">
                <td className="px-4 py-2">{formatDate(log.dataHora)}</td>
                <td className="px-4 py-2">{log.dadosCliente.idade}</td>
                <td className="px-4 py-2">R$ {log.dadosCliente.rendaMensal.toFixed(2)}</td>
                <td className="px-4 py-2">R$ {log.dadosCliente.valorEmprestimo.toFixed(2)}</td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs ${log.dadosCliente.historicoDividas === 'limpo' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.dadosCliente.historicoDividas}
                  </span>
                </td>
                <td className="px-4 py-2">
                  <span className={`px-2 py-1 rounded text-xs font-medium ${log.resultado.aprovado ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                    {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}