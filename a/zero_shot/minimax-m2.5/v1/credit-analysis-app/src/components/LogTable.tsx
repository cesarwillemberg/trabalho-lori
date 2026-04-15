'use client';

import { useState, useEffect } from 'react';
import { CreditLog } from '@/types';
import { getLogs, clearLogs } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/creditAnalysis';

export default function LogTable() {
  const [isOpen, setIsOpen] = useState(false);
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, [isOpen]);

  const handleClear = () => {
    if (confirm('Deseja limpar todos os registros?')) {
      clearLogs();
      setLogs([]);
    }
  };

  return (
    <div className="mt-8 border border-gray-700 rounded-lg overflow-hidden">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-3 bg-gray-800 text-gray-200 font-medium flex justify-between items-center hover:bg-gray-700 transition-colors"
      >
        <span>📋 Histórico de Análises ({logs.length})</span>
        <span className="text-lg">{isOpen ? '▲' : '▼'}</span>
      </button>

      {isOpen && (
        <div className="p-4 bg-gray-900">
          {logs.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Nenhum registro encontrado</p>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-gray-300">
                  <thead className="bg-gray-800 text-gray-400">
                    <tr>
                      <th className="px-3 py-2 text-left">Data/Hora</th>
                      <th className="px-3 py-2 text-left">Idade</th>
                      <th className="px-3 py-2 text-left">Renda</th>
                      <th className="px-3 py-2 text-left">Empréstimo</th>
                      <th className="px-3 py-2 text-left">Histórico</th>
                      <th className="px-3 py-2 text-left">Resultado</th>
                    </tr>
                  </thead>
                  <tbody>
                    {logs.slice(0, 10).map((log) => (
                      <tr key={log.id} className="border-t border-gray-700 hover:bg-gray-800">
                        <td className="px-3 py-2">{formatDate(log.timestamp)}</td>
                        <td className="px-3 py-2">{log.age} anos</td>
                        <td className="px-3 py-2">{formatCurrency(log.monthlyIncome)}</td>
                        <td className="px-3 py-2">{formatCurrency(log.loanAmount)}</td>
                        <td className="px-3 py-2">
                          <span className={log.debtHistory === 'limpo' ? 'text-green-400' : 'text-red-400'}>
                            {log.debtHistory}
                          </span>
                        </td>
                        <td className="px-3 py-2">
                          <span className={`font-semibold ${log.result === 'Aprovado' ? 'text-green-400' : 'text-red-400'}`}>
                            {log.result}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              <button
                onClick={handleClear}
                className="mt-4 px-4 py-2 bg-red-900/50 text-red-400 rounded hover:bg-red-900 transition-colors text-sm"
              >
                Limpar Histórico
              </button>
            </>
          )}
        </div>
      )}
    </div>
  );
}