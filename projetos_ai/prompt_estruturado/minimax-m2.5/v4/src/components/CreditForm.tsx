'use client';

import { useState } from 'react';
import { CreditRequest, CreditAnalysisResult, LogEntry } from '../types';
import { analisarCredito } from '../business/creditAnalysis';
import { salvarLog, obterLogs } from '../persistence/localStorageRepository';

export default function CreditForm() {
  const [formData, setFormData] = useState<CreditRequest>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0
  });
  
  const [resultado, setResultado] = useState<CreditAnalysisResult | null>(null);
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [erro, setErro] = useState<string>('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErro('');
    setResultado(null);
    
    if (formData.idade <= 0 || formData.rendaMensal <= 0 || formData.valorEmprestimo <= 0) {
      setErro('Por favor, preencha todos os campos com valores positivos.');
      return;
    }
    
    const resultadoAnalise = analisarCredito(formData);
    setResultado(resultadoAnalise);
    
    salvarLog(formData, resultadoAnalise);
    setLogs(obterLogs());
  };

  const handleChange = (field: keyof CreditRequest, value: number | string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Análise de Crédito</h1>
      
      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.field}>
          <label style={styles.label}>Idade:</label>
          <input
            type="number"
            value={formData.idade || ''}
            onChange={(e) => handleChange('idade', parseInt(e.target.value) || 0)}
            style={styles.input}
            min="0"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Renda Mensal (R$):</label>
          <input
            type="number"
            value={formData.rendaMensal || ''}
            onChange={(e) => handleChange('rendaMensal', parseFloat(e.target.value) || 0)}
            style={styles.input}
            min="0"
            step="0.01"
          />
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Histórico de Dívidas:</label>
          <select
            value={formData.historicoDividas}
            onChange={(e) => handleChange('historicoDividas', e.target.value)}
            style={styles.select}
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>
        
        <div style={styles.field}>
          <label style={styles.label}>Valor do Empréstimo (R$):</label>
          <input
            type="number"
            value={formData.valorEmprestimo || ''}
            onChange={(e) => handleChange('valorEmprestimo', parseFloat(e.target.value) || 0)}
            style={styles.input}
            min="0"
            step="0.01"
          />
        </div>
        
        <button type="submit" style={styles.button}>
          Analisar Crédito
        </button>
        
        {erro && <p style={styles.error}>{erro}</p>}
      </form>
      
      {resultado && (
        <div style={{
          ...styles.result,
          backgroundColor: resultado.aprovado ? '#d4edda' : '#f8d7da'
        }}>
          <h2 style={{
            ...styles.resultTitle,
            color: resultado.aprovado ? '#155724' : '#721c24'
          }}>
            {resultado.aprovado ? 'Aprovado' : 'Reprovado'}
          </h2>
          
          {!resultado.aprovado && resultado.motivo && (
            <p style={styles.motivo}>{resultado.motivo}</p>
          )}
          
          <div style={styles.details}>
            <p>Valor da Parcela: {formatCurrency(resultado.valorParcela)}</p>
            <p>Percentual Comprometido: {(resultado.percentualComprometido * 100).toFixed(1)}%</p>
          </div>
        </div>
      )}
      
      {logs.length > 0 && (
        <div style={styles.logsContainer}>
          <h2 style={styles.logsTitle}>Histórico de Análises</h2>
          <ul style={styles.logsList}>
            {logs.slice().reverse().map((log) => (
              <li key={log.id} style={styles.logItem}>
                <p><strong>Data/Hora:</strong> {formatDate(log.dataHora)}</p>
                <p><strong>Idade:</strong> {log.dadosCliente.idade} | <strong>Renda:</strong> {formatCurrency(log.dadosCliente.rendaMensal)}</p>
                <p><strong>Empréstimo:</strong> {formatCurrency(log.dadosCliente.valorEmprestimo)} | <strong>Histórico:</strong> {log.dadosCliente.historicoDividas}</p>
                <p><strong>Resultado:</strong> {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
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
    flexDirection: 'column'
  },
  label: {
    marginBottom: '5px',
    fontWeight: 'bold',
    color: '#555'
  },
  input: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  select: {
    padding: '10px',
    fontSize: '16px',
    borderRadius: '4px',
    border: '1px solid #ddd'
  },
  button: {
    padding: '12px',
    fontSize: '16px',
    backgroundColor: '#007bff',
    color: '#fff',
    border: 'none',
    borderRadius: '4px',
    cursor: 'pointer',
    marginTop: '10px'
  },
  error: {
    color: '#dc3545',
    marginTop: '10px'
  },
  result: {
    marginTop: '20px',
    padding: '20px',
    borderRadius: '8px',
    textAlign: 'center'
  },
  resultTitle: {
    margin: '0 0 10px 0'
  },
  motivo: {
    fontWeight: 'bold',
    marginBottom: '10px'
  },
  details: {
    marginTop: '10px',
    fontSize: '14px'
  },
  logsContainer: {
    marginTop: '30px'
  },
  logsTitle: {
    color: '#333',
    marginBottom: '15px'
  },
  logsList: {
    listStyle: 'none',
    padding: 0
  },
  logItem: {
    backgroundColor: '#f1f1f1',
    padding: '15px',
    marginBottom: '10px',
    borderRadius: '4px',
    fontSize: '14px'
  }
};
