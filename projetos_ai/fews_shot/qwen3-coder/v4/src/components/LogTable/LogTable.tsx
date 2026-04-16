/**
 * Componente de Tabela de Logs
 * Exibe o histórico de análises realizadas
 */

'use client';

import { AnalysisLog } from '@/domain/CreditAnalysis';
import { formatDate, formatCurrency, formatDebtHistory } from '@/utils/logger';
import styles from './LogTable.module.css';

interface LogTableProps {
  logs: AnalysisLog[];
  onClear: () => void;
  onExport: () => void;
}

export default function LogTable({ logs, onClear, onExport }: LogTableProps) {
  if (logs.length === 0) {
    return (
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Histórico de Análises</h2>
        </div>
        <div className={styles.empty}>
          <div className={styles.emptyIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2" />
              <rect x="9" y="3" width="6" height="4" rx="1" />
              <path d="M9 12h6M9 16h6" />
            </svg>
          </div>
          <p className={styles.emptyText}>
            Nenhuma análise realizada ainda
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          Histórico de Análises
          <span className={styles.count}>({logs.length})</span>
        </h2>
        <div className={styles.actions}>
          <button className={styles.exportButton} onClick={onExport}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M21 15v4a2 2 0 01-2 2H5a2 2 0 01-2-2v-4M7 10l5 5 5-5M12 15V3" />
            </svg>
            Exportar
          </button>
          <button className={styles.clearButton} onClick={onClear}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M3 6h18M19 6v14a2 2 0 01-2 2H7a2 2 0 01-2-2V6m3 0V4a2 2 0 012-2h4a2 2 0 012 2v2" />
            </svg>
            Limpar
          </button>
        </div>
      </div>

      <div className={styles.tableWrapper}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Idade</th>
              <th>Renda</th>
              <th>Histórico</th>
              <th>Empréstimo</th>
              <th>Resultado</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td className={styles.dateCell}>{formatDate(log.timestamp)}</td>
                <td>{log.clientData.age} anos</td>
                <td>{formatCurrency(log.clientData.monthlyIncome)}</td>
                <td>
                  <span className={`${styles.badge} ${log.clientData.debtHistory === 'clean' ? styles.badgeClean : styles.badgeNegative}`}>
                    {formatDebtHistory(log.clientData.debtHistory)}
                  </span>
                </td>
                <td>{formatCurrency(log.clientData.loanAmount)}</td>
                <td>
                  <span className={`${styles.result} ${log.result.approved ? styles.resultApproved : styles.resultRejected}`}>
                    {log.result.approved ? 'Aprovado' : 'Reprovado'}
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
