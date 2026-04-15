'use client';

import { useState, FormEvent } from 'react';
import { CreditRequest, CreditResult, ValidationError } from '../types/credit';
import { analyzeCredit } from '../service/creditService';
import { validateCreditRequest } from '../validation/creditValidation';

interface CreditFormProps {
  onResult: (result: CreditResult) => void;
}

export default function CreditForm({ onResult }: CreditFormProps) {
  const [age, setAge] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [debtHistory, setDebtHistory] = useState<'limpo' | 'negativado'>('limpo');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const request: CreditRequest = {
      age: parseInt(age, 10) || 0,
      monthlyIncome: parseFloat(monthlyIncome.replace(',', '.')) || 0,
      debtHistory,
      loanAmount: parseFloat(loanAmount.replace(',', '.')) || 0,
    };

    const validationErrors = validateCreditRequest(request);
    
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors([]);
    const result = analyzeCredit(request);
    onResult(result);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find((e) => e.field === field)?.message;
  };

  return (
    <form className="credit-form" onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="age">Idade (anos)</label>
        <input
          type="number"
          id="age"
          value={age}
          onChange={(e) => setAge(e.target.value)}
          min="0"
          max="150"
          placeholder="Digite sua idade"
          className={getFieldError('age') ? 'error' : ''}
        />
        {getFieldError('age') && <span className="error-message">{getFieldError('age')}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
        <input
          type="text"
          id="monthlyIncome"
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          placeholder="Digite sua renda mensal"
          className={getFieldError('monthlyIncome') ? 'error' : ''}
        />
        {getFieldError('monthlyIncome') && (
          <span className="error-message">{getFieldError('monthlyIncome')}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="debtHistory">Histórico de Dívidas</label>
        <select
          id="debtHistory"
          value={debtHistory}
          onChange={(e) => setDebtHistory(e.target.value as 'limpo' | 'negativado')}
          className={getFieldError('debtHistory') ? 'error' : ''}
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
        {getFieldError('debtHistory') && (
          <span className="error-message">{getFieldError('debtHistory')}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
        <input
          type="text"
          id="loanAmount"
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Digite o valor desejado"
          className={getFieldError('loanAmount') ? 'error' : ''}
        />
        {getFieldError('loanAmount') && (
          <span className="error-message">{getFieldError('loanAmount')}</span>
        )}
      </div>

      <button type="submit" className="submit-button">
        Analisar Crédito
      </button>
    </form>
  );
}
