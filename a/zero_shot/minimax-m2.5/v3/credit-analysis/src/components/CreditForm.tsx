'use client';

import { useState, FormEvent } from 'react';
import { CreditApplication, CreditResult, ValidationError } from '@/lib/types';
import { validateApplication, analyzeCredit, createLogEntry } from '@/lib/creditAnalysis';
import { saveLog } from '@/lib/storage';
import ResultCard from './ResultCard';

export default function CreditForm() {
  const [formData, setFormData] = useState<CreditApplication>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'limpo',
    loanAmount: 0
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);
  const [result, setResult] = useState<CreditResult | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: name === 'debtHistory' ? value : Number(value)
    }));
    setErrors([]);
    setResult(null);
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);

    const validationErrors = validateApplication(formData);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    const analysisResult = analyzeCredit(formData);
    setResult(analysisResult);

    const logEntry = createLogEntry(formData, analysisResult);
    saveLog(logEntry);
  };

  const handleReset = () => {
    setFormData({
      age: 0,
      monthlyIncome: 0,
      debtHistory: 'limpo',
      loanAmount: 0
    });
    setErrors([]);
    setResult(null);
    setIsSubmitted(false);
  };

  const getFieldError = (field: string) => {
    return errors.find(e => e.field === field)?.message;
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="credit-form">
        <h2 className="form-title">Dados do Cliente</h2>

        <div className="form-group">
          <label htmlFor="age" className="form-label">
            Idade *
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            className={`form-input ${errors.some(e => e.field === 'age') ? 'input-error' : ''}`}
            placeholder="Digite sua idade"
            min="0"
            max="120"
          />
          {getFieldError('age') && (
            <span className="error-message">{getFieldError('age')}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="monthlyIncome" className="form-label">
            Renda Mensal (R$) *
          </label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={formData.monthlyIncome || ''}
            onChange={handleChange}
            className={`form-input ${errors.some(e => e.field === 'monthlyIncome') ? 'input-error' : ''}`}
            placeholder="Digite sua renda mensal"
            min="0"
            step="0.01"
          />
          {getFieldError('monthlyIncome') && (
            <span className="error-message">{getFieldError('monthlyIncome')}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="debtHistory" className="form-label">
            Histórico de Dívidas *
          </label>
          <select
            id="debtHistory"
            name="debtHistory"
            value={formData.debtHistory}
            onChange={handleChange}
            className={`form-input form-select ${errors.some(e => e.field === 'debtHistory') ? 'input-error' : ''}`}
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
          {getFieldError('debtHistory') && (
            <span className="error-message">{getFieldError('debtHistory')}</span>
          )}
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount" className="form-label">
            Valor do Empréstimo (R$) *
          </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount || ''}
            onChange={handleChange}
            className={`form-input ${errors.some(e => e.field === 'loanAmount') ? 'input-error' : ''}`}
            placeholder="Digite o valor desejado"
            min="0"
            step="0.01"
          />
          {getFieldError('loanAmount') && (
            <span className="error-message">{getFieldError('loanAmount')}</span>
          )}
        </div>

        <div className="form-actions">
          <button type="submit" className="btn btn-primary">
            Analisar Crédito
          </button>
          <button type="button" onClick={handleReset} className="btn btn-secondary">
            Limpar
          </button>
        </div>
      </form>

      {result && <ResultCard result={result} />}
    </div>
  );
}