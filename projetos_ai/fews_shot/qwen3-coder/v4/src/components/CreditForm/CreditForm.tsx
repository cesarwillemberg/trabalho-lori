/**
 * Componente de Formulário de Análise de Crédito
 * Interface para entrada de dados do cliente
 */

'use client';

import { useState, FormEvent } from 'react';
import { CreditApplication, ValidationError } from '@/domain/CreditAnalysis';
import { validateCreditApplication } from '@/validation/creditValidation';
import styles from './CreditForm.module.css';

interface CreditFormProps {
  onSubmit: (data: CreditApplication) => void;
  isLoading: boolean;
}

export default function CreditForm({ onSubmit, isLoading }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditApplication>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'clean',
    loanAmount: 0,
  });

  const [errors, setErrors] = useState<ValidationError[]>([]);

  const handleChange = (field: keyof CreditApplication, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: field === 'debtHistory' ? value : Number(value),
    }));

    setErrors(prev => prev.filter(e => e.field !== field));
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const validation = validateCreditApplication(formData);
    if (!validation.isValid) {
      setErrors(validation.errors);
      return;
    }

    onSubmit(formData);
  };

  const getFieldError = (field: string): string | undefined => {
    return errors.find(e => e.field === field)?.message;
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <h2 className={styles.title}>Dados do Cliente</h2>

      <div className={styles.field}>
        <label htmlFor="age" className={styles.label}>
          Idade
        </label>
        <input
          type="number"
          id="age"
          className={`${styles.input} ${getFieldError('age') ? styles.inputError : ''}`}
          value={formData.age || ''}
          onChange={e => handleChange('age', e.target.value)}
          placeholder="Ex: 25"
          min="0"
          max="120"
          disabled={isLoading}
        />
        {getFieldError('age') && (
          <span className={styles.error}>{getFieldError('age')}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="monthlyIncome" className={styles.label}>
          Renda Mensal (R$)
        </label>
        <input
          type="number"
          id="monthlyIncome"
          className={`${styles.input} ${getFieldError('monthlyIncome') ? styles.inputError : ''}`}
          value={formData.monthlyIncome || ''}
          onChange={e => handleChange('monthlyIncome', e.target.value)}
          placeholder="Ex: 3000.00"
          min="0"
          step="0.01"
          disabled={isLoading}
        />
        {getFieldError('monthlyIncome') && (
          <span className={styles.error}>{getFieldError('monthlyIncome')}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="debtHistory" className={styles.label}>
          Histórico de Dívidas
        </label>
        <select
          id="debtHistory"
          className={`${styles.select} ${getFieldError('debtHistory') ? styles.inputError : ''}`}
          value={formData.debtHistory}
          onChange={e => handleChange('debtHistory', e.target.value)}
          disabled={isLoading}
        >
          <option value="clean">Limpo</option>
          <option value="negative">Negativado</option>
        </select>
        {getFieldError('debtHistory') && (
          <span className={styles.error}>{getFieldError('debtHistory')}</span>
        )}
      </div>

      <div className={styles.field}>
        <label htmlFor="loanAmount" className={styles.label}>
          Valor do Empréstimo (R$)
        </label>
        <input
          type="number"
          id="loanAmount"
          className={`${styles.input} ${getFieldError('loanAmount') ? styles.inputError : ''}`}
          value={formData.loanAmount || ''}
          onChange={e => handleChange('loanAmount', e.target.value)}
          placeholder="Ex: 10000.00"
          min="0"
          step="0.01"
          disabled={isLoading}
        />
        {getFieldError('loanAmount') && (
          <span className={styles.error}>{getFieldError('loanAmount')}</span>
        )}
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={isLoading}
      >
        {isLoading ? (
          <>
            <span className={styles.spinner}></span>
            Analisando...
          </>
        ) : (
          'Analisar Crédito'
        )}
      </button>
    </form>
  );
}
