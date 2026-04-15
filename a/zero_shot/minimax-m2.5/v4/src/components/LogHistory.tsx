'use client';

/**
 * Componente de histórico de logs
 * Exibe a lista de análises de crédito realizadas
 */

import React, { useEffect, useState } from 'react';
import { CreditLog } from '@/lib/types';
import { formatCurrency, formatDate } from '@/lib/creditAnalysis';
import { getLocalLogs } from '@/lib/logStorage';

export function LogHistory() {
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    const loadedLogs = getLocalLogs();
    setLogs(loadedLogs);
  }, []);

  if (logs.length === 0) {
    return (
      <div className="log-history-container log-history-empty">
        <h2 className="log-title">Histórico de Análises</h2>
        <p className="log-empty-text">Nenhuma análise realizada ainda</p>
      </div>
    );
  }

  return (
    <div className="log-history-container">
      <h2 className="log-title">Histórico de Análises ({logs.length})</h2>
      <div className="log-list">
        {logs.map(log => (
          <div 
            key={log.id} 
            className={`log-item ${log.analysis.approved ? 'log-approved' : 'log-rejected'}`}
          >
            <div className="log-header">
              <span className={`log-status ${log.analysis.approved ? 'status-approved' : 'status-rejected'}`}>
                {log.analysis.approved ? 'Aprovado' : 'Reprovado'}
              </span>
              <span className="log-date">{formatDate(log.timestamp)}</span>
            </div>
            <div className="log-details">
              <div className="log-detail">
                <span className="log-label">Idade:</span>
                <span className="log-value">{log.clientData.age} anos</span>
              </div>
              <div className="log-detail">
                <span className="log-label">Renda:</span>
                <span className="log-value">{formatCurrency(log.clientData.monthlyIncome)}</span>
              </div>
              <div className="log-detail">
                <span className="log-label">Empréstimo:</span>
                <span className="log-value">{formatCurrency(log.clientData.loanAmount)}</span>
              </div>
              <div className="log-detail">
                <span className="log-label">Parcela:</span>
                <span className="log-value">{formatCurrency(log.analysis.monthlyPayment)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}