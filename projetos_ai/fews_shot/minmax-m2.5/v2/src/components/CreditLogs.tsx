'use client';

import { useEffect, useState } from 'react';
import { CreditLog } from '../types/credit';
import { getAllLogs, clearLogs } from '../repository/creditRepository';

interface CreditLogsProps {
  refreshTrigger: number;
}

export default function CreditLogs({ refreshTrigger }: CreditLogsProps) {
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    setLogs(getAllLogs());
  }, [refreshTrigger]);

  const handleClear = () => {
    clearLogs();
    setLogs([]);
  };

  const formatDate = (timestamp: string): string => {
    const date = new Date(timestamp);
    return date.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const formatCurrency = (value: number): string => {
    return value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' });
  };

  return (
    <div className="logs-container">
      <div className="logs-header">
        <h3>Histórico de Análises</h3>
        {logs.length > 0 && (
          <button onClick={handleClear} className="clear-button">
            Limpar Histórico
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="logs-empty">Nenhuma análise registrada ainda.</p>
      ) : (
        <div className="logs-table-wrapper">
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
              {[...logs].reverse().map((log) => (
                <tr key={log.id} className={log.result.approved ? 'approved' : 'rejected'}>
                  <td>{formatDate(log.timestamp)}</td>
                  <td>{log.request.age} anos</td>
                  <td>{formatCurrency(log.request.monthlyIncome)}</td>
                  <td>{formatCurrency(log.request.loanAmount)}</td>
                  <td>{log.request.debtHistory === 'limpo' ? 'Limpo' : 'Negativado'}</td>
                  <td>
                    <span className={`status-badge ${log.result.approved ? 'approved' : 'rejected'}`}>
                      {log.result.approved ? 'Aprovado' : 'Reprovado'}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
