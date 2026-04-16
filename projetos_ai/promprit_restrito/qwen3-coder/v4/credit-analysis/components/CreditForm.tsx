'use client';

import { useState } from 'react';
import { CreditRequest, CreditResult, ValidationError } from '@/types';
import { validateCreditRequest } from '@/validation/CreditValidation';
import { analyzeCredit } from '@/services/CreditService';
import { saveLog, getAllLogs } from '@/repositories/LogRepository';
import { formatCurrency, formatPercentage, formatDate, formatDebtHistory } from '@/utils/formatters';

interface FormData {
  age: string;
  monthlyIncome: string;
  debtHistory: string;
  loanAmount: string;
}

export default function CreditForm() {
  const [formData, setFormData] = useState<FormData>({
    age: '',
    monthlyIncome: '',
    debtHistory: 'limpo',
    loanAmount: '',
  });
  
  const [result, setResult] = useState<CreditResult | null>(null);
  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [logs, setLogs] = useState(getAllLogs());
  
  function handleInputChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors([]);
    setResult(null);
  }
  
  function buildRequestFromForm(): CreditRequest {
    return {
      age: parseInt(formData.age, 10),
      monthlyIncome: parseFloat(formData.monthlyIncome),
      debtHistory: formData.debtHistory as 'limpo' | 'negativado',
      loanAmount: parseFloat(formData.loanAmount),
    };
  }
  
  function handleSubmit() {
    const request = buildRequestFromForm();
    const validationErrors = validateCreditRequest(request);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    const analysisResult = analyzeCredit(request);
    setResult(analysisResult);
    
    saveLog(request, analysisResult);
    setLogs(getAllLogs());
  }
  
  function getFieldError(field: string): string | undefined {
    return errors.find(e => e.field === field)?.message;
  }
  
  return (
    <div className="container">
      <div className="form-card">
        <h1>Análise de Crédito</h1>
        
        <div className="form-group">
          <label htmlFor="age">Idade</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleInputChange}
            placeholder="Ex: 25"
          />
          {getFieldError('age') && <span className="error">{getFieldError('age')}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleInputChange}
            placeholder="Ex: 3000"
          />
          {getFieldError('monthlyIncome') && <span className="error">{getFieldError('monthlyIncome')}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="debtHistory">Histórico de Dívidas</label>
          <select
            id="debtHistory"
            name="debtHistory"
            value={formData.debtHistory}
            onChange={handleInputChange}
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
          {getFieldError('debtHistory') && <span className="error">{getFieldError('debtHistory')}</span>}
        </div>
        
        <div className="form-group">
          <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleInputChange}
            placeholder="Ex: 10000"
          />
          {getFieldError('loanAmount') && <span className="error">{getFieldError('loanAmount')}</span>}
        </div>
        
        <button onClick={handleSubmit}>Analisar Crédito</button>
        
        {result && (
          <div className={`result-card ${result.approved ? 'approved' : 'rejected'}`}>
            <h2>{result.approved ? 'Aprovado' : 'Reprovado'}</h2>
            {result.approved && (
              <div className="result-details">
                <p>Valor da parcela: {formatCurrency(result.installmentValue)}</p>
                <p>Comprometimento: {formatPercentage(result.incomePercentage)} da renda</p>
              </div>
            )}
            {!result.approved && result.reason && (
              <p className="reason">{result.reason}</p>
            )}
          </div>
        )}
      </div>
      
      <div className="logs-card">
        <h2>Histórico de Análises</h2>
        {logs.length === 0 ? (
          <p className="no-logs">Nenhuma análise registrada</p>
        ) : (
          <div className="logs-list">
            {logs.slice(0, 10).map(log => (
              <div key={log.id} className={`log-item ${log.result.approved ? 'approved' : 'rejected'}`}>
                <div className="log-header">
                  <span className="log-status">{log.result.approved ? 'Aprovado' : 'Reprovado'}</span>
                  <span className="log-date">{formatDate(log.timestamp)}</span>
                </div>
                <div className="log-details">
                  <span>Idade: {log.request.age}</span>
                  <span>Renda: {formatCurrency(log.request.monthlyIncome)}</span>
                  <span>Empréstimo: {formatCurrency(log.request.loanAmount)}</span>
                  <span>Histórico: {formatDebtHistory(log.request.debtHistory)}</span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      
      <style jsx>{`
        .container {
          max-width: 900px;
          margin: 0 auto;
          padding: 24px;
          display: grid;
          gap: 24px;
        }
        
        .form-card, .logs-card {
          background: white;
          border-radius: 8px;
          padding: 24px;
          box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
        }
        
        h1 {
          color: #1a1a2e;
          margin-bottom: 24px;
          font-size: 1.5rem;
        }
        
        h2 {
          color: #1a1a2e;
          margin-bottom: 16px;
          font-size: 1.25rem;
        }
        
        .form-group {
          margin-bottom: 16px;
        }
        
        label {
          display: block;
          margin-bottom: 8px;
          color: #2d3748;
          font-weight: 500;
        }
        
        input, select {
          width: 100%;
          padding: 12px;
          border: 1px solid #e2e8f0;
          border-radius: 6px;
          font-size: 1rem;
          box-sizing: border-box;
        }
        
        input:focus, select:focus {
          outline: none;
          border-color: #0f3460;
        }
        
        .error {
          color: #ff6b6b;
          font-size: 0.875rem;
          margin-top: 4px;
          display: block;
        }
        
        button {
          width: 100%;
          padding: 14px;
          background: #0f3460;
          color: white;
          border: none;
          border-radius: 6px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          margin-top: 8px;
        }
        
        button:hover {
          background: #16213e;
        }
        
        .result-card {
          margin-top: 24px;
          padding: 20px;
          border-radius: 8px;
          text-align: center;
        }
        
        .result-card.approved {
          background: #e6fffa;
          border: 2px solid #00d9a5;
        }
        
        .result-card.rejected {
          background: #fff5f5;
          border: 2px solid #ff6b6b;
        }
        
        .result-card h2 {
          margin: 0;
        }
        
        .result-card.approved h2 {
          color: #00d9a5;
        }
        
        .result-card.rejected h2 {
          color: #ff6b6b;
        }
        
        .result-details p {
          margin: 8px 0;
          color: #2d3748;
        }
        
        .reason {
          color: #ff6b6b;
          margin-top: 8px;
        }
        
        .no-logs {
          color: #718096;
          text-align: center;
        }
        
        .logs-list {
          display: flex;
          flex-direction: column;
          gap: 12px;
          max-height: 400px;
          overflow-y: auto;
        }
        
        .log-item {
          padding: 12px;
          border-radius: 6px;
          border: 1px solid #e2e8f0;
        }
        
        .log-item.approved {
          background: #f0fff4;
        }
        
        .log-item.rejected {
          background: #fff5f5;
        }
        
        .log-header {
          display: flex;
          justify-content: space-between;
          margin-bottom: 8px;
        }
        
        .log-status {
          font-weight: 600;
        }
        
        .log-item.approved .log-status {
          color: #00d9a5;
        }
        
        .log-item.rejected .log-status {
          color: #ff6b6b;
        }
        
        .log-date {
          color: #718096;
          font-size: 0.875rem;
        }
        
        .log-details {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 4px;
          font-size: 0.875rem;
          color: #2d3748;
        }
      `}</style>
    </div>
  );
}