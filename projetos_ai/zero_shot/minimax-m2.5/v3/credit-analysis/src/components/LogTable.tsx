'use client';

import { useEffect, useState } from 'react';
import { LogEntry } from '@/lib/types';
import { getLogs, clearLogs, deleteLog } from '@/lib/storage';
import { formatCurrency, formatDate } from '@/lib/creditAnalysis';
import Link from 'next/link';

export default function LogTable() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const handleClearAll = () => {
    if (confirm('Tem certeza que deseja limpar todo o histórico?')) {
      clearLogs();
      setLogs([]);
    }
  };

  const handleDelete = (id: string) => {
    if (confirm('Deseja excluir este registro?')) {
      const updatedLogs = deleteLog(id);
      setLogs(updatedLogs);
    }
  };

  if (logs.length === 0) {
    return (
      <div className="empty-state">
        <p className="empty-message">Nenhum registro encontrado.</p>
        <Link href="/" className="btn btn-primary">
          Fazer Primeira Análise
        </Link>
      </div>
    );
  }

  return (
    <div className="log-container">
      <div className="log-header">
        <h2 className="log-title">Histórico de Análises</h2>
        <button onClick={handleClearAll} className="btn btn-danger">
          Limpar Histórico
        </button>
      </div>

      <div className="table-responsive">
        <table className="log-table">
          <thead>
            <tr>
              <th>Data/Hora</th>
              <th>Idade</th>
              <th>Renda Mensal</th>
              <th>Histórico</th>
              <th>Empréstimo</th>
              <th>Parcela (12x)</th>
              <th>% Renda</th>
              <th>Resultado</th>
              <th>Ações</th>
            </tr>
          </thead>
          <tbody>
            {logs.map(log => (
              <tr key={log.id}>
                <td>{formatDate(log.result.timestamp)}</td>
                <td>{log.age} anos</td>
                <td>{formatCurrency(log.monthlyIncome)}</td>
                <td>
                  <span className={`badge ${log.debtHistory === 'limpo' ? 'badge-success' : 'badge-danger'}`}>
                    {log.debtHistory === 'limpo' ? 'Limpo' : 'Negativado'}
                  </span>
                </td>
                <td>{formatCurrency(log.loanAmount)}</td>
                <td>{formatCurrency(log.result.installmentAmount)}</td>
                <td>{log.result.installmentPercentage}%</td>
                <td>
                  <span className={`badge ${log.result.approved ? 'badge-success' : 'badge-danger'}`}>
                    {log.result.approved ? 'Aprovado' : 'Reprovado'}
                  </span>
                </td>
                <td>
                  <button
                    onClick={() => handleDelete(log.id)}
                    className="btn-icon btn-delete"
                    title="Excluir"
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}