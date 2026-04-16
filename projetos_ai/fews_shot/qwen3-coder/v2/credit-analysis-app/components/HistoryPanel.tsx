'use client';

import { useEffect, useState } from 'react';
import { CreditAnalysisLog } from '@/types';
import { getAnalysisHistory } from '@/services';
import { formatDate, formatCurrency } from '@/utils';
import styles from './HistoryPanel.module.css';

export default function HistoryPanel() {
  const [logs, setLogs] = useState<CreditAnalysisLog[]>([]);

  useEffect(() => {
    setLogs(getAnalysisHistory());
  }, []);

  const handleRefresh = () => {
    setLogs(getAnalysisHistory());
  };

  if (logs.length === 0) {
    return null;
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>Historico de Analises</h2>
        <button className={styles.refreshButton} onClick={handleRefresh}>
          Atualizar
        </button>
      </div>

      <div className={styles.logsList}>
        {logs.slice().reverse().map((log) => (
          <div 
            key={log.id} 
            className={`${styles.logItem} ${log.result.approved ? styles.approved : styles.rejected}`}
          >
            <div className={styles.logHeader}>
              <span className={styles.timestamp}>{formatDate(log.timestamp)}</span>
              <span className={`${styles.status} ${log.result.approved ? styles.statusApproved : styles.statusRejected}`}>
                {log.result.approved ? 'Aprovado' : 'Reprovado'}
              </span>
            </div>

            <div className={styles.logDetails}>
              <div className={styles.detailRow}>
                <span>Idade: {log.application.age} anos</span>
                <span>Renda: {formatCurrency(log.application.monthlyIncome)}</span>
              </div>
              <div className={styles.detailRow}>
                <span>Historico: {log.application.debtHistory}</span>
                <span>Emprestimo: {formatCurrency(log.application.loanAmount)}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
