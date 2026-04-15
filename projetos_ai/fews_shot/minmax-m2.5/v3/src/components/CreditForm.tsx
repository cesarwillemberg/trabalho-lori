'use client';

// src/components/CreditForm.tsx
// Componente de formulário para análise de crédito

import { useState } from 'react';
import { analyzeCredit, CreditAnalysisResult, getAnalysisLogs, clearAnalysisLogs } from '../service/creditService';

export default function CreditForm() {
  const [age, setAge] = useState<number>(0);
  const [monthlyIncome, setMonthlyIncome] = useState<number>(0);
  const [loanAmount, setLoanAmount] = useState<number>(0);
  const [debtHistory, setDebtHistory] = useState<string>('limpo');
  const [result, setResult] = useState<CreditAnalysisResult | null>(null);
  const [logs, setLogs] = useState<any[]>([]);
  const [showLogs, setShowLogs] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const analysisResult = analyzeCredit({
      age,
      monthlyIncome,
      loanAmount,
      debtHistory
    });

    setResult(analysisResult);
  };

  const handleShowLogs = () => {
    const analysisLogs = getAnalysisLogs();
    setLogs(analysisLogs);
    setShowLogs(true);
  };

  const handleClearLogs = () => {
    clearAnalysisLogs();
    setLogs([]);
    setShowLogs(false);
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Análise de Crédito</h1>

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Idade:</label>
          <input
            type="number"
            value={age || ''}
            onChange={(e) => setAge(Number(e.target.value))}
            style={styles.input}
            required
            min="0"
            max="150"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Renda Mensal (R$):</label>
          <input
            type="number"
            value={monthlyIncome || ''}
            onChange={(e) => setMonthlyIncome(Number(e.target.value))}
            style={styles.input}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Valor do Empréstimo (R$):</label>
          <input
            type="number"
            value={loanAmount || ''}
            onChange={(e) => setLoanAmount(Number(e.target.value))}
            style={styles.input}
            required
            min="0"
            step="0.01"
          />
        </div>

        <div style={styles.field}>
          <label style={styles.label}>Histórico de Dívidas:</label>
          <select
            value={debtHistory}
            onChange={(e) => setDebtHistory(e.target.value)}
            style={styles.select}
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>

        <button type="submit" style={styles.button}>
          Analisar Crédito
        </button>
      </form>

      {result && (
        <div style={result.approved ? styles.resultApproved : styles.resultRejected}>
          <h2 style={styles.resultTitle}>
            {result.approved ? 'Aprovado' : 'Reprovado'}
          </h2>
          <p style={styles.resultMessage}>{result.message}</p>

          <div style={styles.details}>
            <p><strong>Maior de idade:</strong> {result.details.isAdult ? 'Sim' : 'Não'}</p>
            <p><strong>Parcela (12x):</strong> R$ {result.details.installmentValue.toFixed(2)}</p>
            <p><strong>Comprometimento da renda:</strong> {(result.details.incomeRatio * 100).toFixed(0)}%</p>
            <p><strong>Histórico limpo:</strong> {result.details.hasCleanDebtHistory ? 'Sim' : 'Não'}</p>
          </div>
        </div>
      )}

      <div style={styles.logsSection}>
        <button onClick={handleShowLogs} style={styles.logsButton}>
          Ver Logs de Análise
        </button>

        {showLogs && (
          <>
            {logs.length > 0 ? (
              <div style={styles.logsContainer}>
                <h3 style={styles.logsTitle}>Histórico de Análises ({logs.length})</h3>
                {logs.map((log, index) => (
                  <div key={index} style={styles.logItem}>
                    <p><strong>Data/Hora:</strong> {new Date(log.timestamp).toLocaleString('pt-BR')}</p>
                    <p><strong>Idade:</strong> {log.clientData.age}</p>
                    <p><strong>Renda:</strong> R$ {log.clientData.monthlyIncome.toFixed(2)}</p>
                    <p><strong>Empréstimo:</strong> R$ {log.clientData.loanAmount.toFixed(2)}</p>
                    <p><strong>Histórico:</strong> {log.clientData.debtHistory}</p>
                    <p><strong>Resultado:</strong> {log.result.approved ? 'Aprovado' : 'Reprovado'}</p>
                    <p><strong>Mensagem:</strong> {log.result.message}</p>
                  </div>
                ))}
                <button onClick={handleClearLogs} style={styles.clearButton}>
                  Limpar Logs
                </button>
              </div>
            ) : (
              <p style={styles.noLogs}>Nenhum log encontrado.</p>
            )}
          </>
        )}
      </div>
    </div>
  );
}

const styles: { [key: string]: React.CSSProperties } = {
  container: {
    maxWidth: '600px',
    margin: '0 auto',
    padding: '20px',
    fontFamily: 'Arial, sans-serif'
  },
  title: {
    textAlign: 'center',
    color: '#333',
    marginBottom: '30px'
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    gap: '15px',
    backgroundColor: '#f9f9f9',
    padding: '20px',
    borderRadius: '8px'
  },
  field: {
    display: 'flex',
    flexDirection: 'column',
    gap: '5px'
  },
  label: {
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px'
  },
  select: {
    padding: '10px',
    borderRadius: '4px',
    border: '1px solid #ddd',
    fontSize: '16px',
    backgroundColor: '#fff'
  },
  button: {
    padding: '12px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  resultApproved: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#d4edda',
    border: '2px solid #28a745',
    borderRadius: '8px'
  },
  resultRejected: {
    marginTop: '20px',
    padding: '20px',
    backgroundColor: '#f8d7da',
    border: '2px solid #dc3545',
    borderRadius: '8px'
  },
  resultTitle: {
    margin: '0 0 10px 0',
    color: '#333'
  },
  resultMessage: {
    margin: '0 0 15px 0',
    fontSize: '14px',
    color: '#555'
  },
  details: {
    fontSize: '14px',
    color: '#555'
  },
  logsSection: {
    marginTop: '30px',
    textAlign: 'center'
  },
  logsButton: {
    padding: '10px 20px',
    backgroundColor: '#6c757d',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer'
  },
  logsContainer: {
    marginTop: '15px',
    textAlign: 'left',
    maxHeight: '400px',
    overflowY: 'auto'
  },
  logsTitle: {
    color: '#333',
    marginBottom: '10px'
  },
  logItem: {
    padding: '10px',
    marginBottom: '10px',
    backgroundColor: '#fff',
    border: '1px solid #ddd',
    borderRadius: '4px',
    fontSize: '14px'
  },
  clearButton: {
    padding: '8px 16px',
    backgroundColor: '#dc3545',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    fontSize: '14px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  noLogs: {
    marginTop: '15px',
    color: '#777'
  }
};