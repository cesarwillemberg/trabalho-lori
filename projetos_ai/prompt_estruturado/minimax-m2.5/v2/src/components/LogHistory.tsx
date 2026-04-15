'use client';

import { useEffect, useState } from 'react';
import { CreditLog } from '../app/types';
import { getLogs, clearLogs } from '../storage/logStorage';

export default function LogHistory() {
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const handleClear = () => {
    clearLogs();
    setLogs([]);
  };

  const formatDate = (timestamp: string) => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR');
  };

  return (
    <div className="log-history">
      <div className="log-header">
        <h3>Histórico de Análises</h3>
        {logs.length > 0 && (
          <button onClick={handleClear} className="clear-btn">
            Limpar Histórico
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="no-logs">Nenhuma análise registrada.</p>
      ) : (
        <table className="logs-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Idade</th>
              <th>Renda</th>
              <th>Empréstimo</th>
              <th>Histórico</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map((log) => (
              <tr key={log.id}>
                <td>{formatDate(log.timestamp)}</td>
                <td>{log.request.age}</td>
                <td>R$ {log.request.monthlyIncome.toFixed(2)}</td>
                <td>R$ {log.request.loanAmount.toFixed(2)}</td>
                <td>{log.request.debtHistory === 'clean' ? 'Limpo' : 'Negativado'}</td>
                <td className={log.result.approved ? 'approved' : 'rejected'}>
                  {log.result.approved ? 'Aprovado' : 'Reprovado'}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}