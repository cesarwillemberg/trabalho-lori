'use client';

import { useEffect, useState } from 'react';
import { CreditLog } from '@/types';
import { getLogs, clearLogs } from '@/lib/storage';
import { formatDate, formatCurrency } from '@/lib/creditAnalysis';

interface LogListProps {
  refreshTrigger: number;
}

export default function LogList({ refreshTrigger }: LogListProps) {
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, [refreshTrigger]);

  const handleClear = () => {
    clearLogs();
    setLogs([]);
  };

  return (
    <section className="logs-section">
      <div className="logs-card">
        <div className="logs-header">
          <h2 className="logs-title">Histórico de Análises</h2>
          {logs.length > 0 && (
            <button className="btn-clear" onClick={handleClear}>
              Limpar Histórico
            </button>
          )}
        </div>
        
        <div className="logs-list">
          {logs.length === 0 ? (
            <p className="no-logs">Nenhuma análise registrada ainda.</p>
          ) : (
            logs.map((log) => (
              <div key={log.id} className="log-item">
                <div className="log-header">
                  <span className="log-date">{formatDate(log.timestamp)}</span>
                  <span className={`log-result ${log.analysisResult.approved ? 'approved' : 'rejected'}`}>
                    {log.analysisResult.approved ? 'Aprovado' : 'Reprovado'}
                  </span>
                </div>
                <div className="log-details">
                  <p>Idade: {log.clientData.age} anos | Renda: {formatCurrency(log.clientData.monthlyIncome)}</p>
                  <p>Empréstimo: {formatCurrency(log.clientData.loanAmount)} | Histórico: {log.clientData.debtHistory}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </section>
  );
}
