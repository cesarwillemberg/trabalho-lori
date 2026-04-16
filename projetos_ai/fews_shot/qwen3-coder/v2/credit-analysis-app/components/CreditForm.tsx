'use client';

import { useState, FormEvent } from 'react';
import { CreditApplication, DebtHistory, CreditAnalysisResult } from '@/types';
import { processCreditApplication } from '@/services';
import styles from './CreditForm.module.css';

interface CreditFormProps {
  onResult: (result: CreditAnalysisResult, application: CreditApplication) => void;
}

export default function CreditForm({ onResult }: CreditFormProps) {
  const [age, setAge] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [debtHistory, setDebtHistory] = useState<DebtHistory>('limpo');
  const [loanAmount, setLoanAmount] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    setIsSubmitting(true);

    const application: CreditApplication = {
      age: Number(age),
      monthlyIncome: Number(monthlyIncome),
      debtHistory,
      loanAmount: Number(loanAmount)
    };

    const result = processCreditApplication(application);
    
    onResult(result, application);
    
    setIsSubmitting(false);
  };

  const isFormValid = age && monthlyIncome && loanAmount && Number(monthlyIncome) > 0;

  return (
    <form className={styles.form} onSubmit={handleSubmit}>
      <div className={styles.formGroup}>
        <label htmlFor="age" className={styles.label}>
          Idade
        </label>
        <input
          id="age"
          type="number"
          min="0"
          max="150"
          className={styles.input}
          value={age}
          onChange={(e) => setAge(e.target.value)}
          placeholder="Digite sua idade"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="monthlyIncome" className={styles.label}>
          Renda Mensal (R$)
        </label>
        <input
          id="monthlyIncome"
          type="number"
          min="0"
          step="0.01"
          className={styles.input}
          value={monthlyIncome}
          onChange={(e) => setMonthlyIncome(e.target.value)}
          placeholder="Digite sua renda mensal"
          required
        />
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="debtHistory" className={styles.label}>
          Historico de Dividas
        </label>
        <select
          id="debtHistory"
          className={styles.select}
          value={debtHistory}
          onChange={(e) => setDebtHistory(e.target.value as DebtHistory)}
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div className={styles.formGroup}>
        <label htmlFor="loanAmount" className={styles.label}>
          Valor do Emprestimo (R$)
        </label>
        <input
          id="loanAmount"
          type="number"
          min="0"
          step="0.01"
          className={styles.input}
          value={loanAmount}
          onChange={(e) => setLoanAmount(e.target.value)}
          placeholder="Digite o valor desejado"
          required
        />
      </div>

      <button
        type="submit"
        className={styles.button}
        disabled={!isFormValid || isSubmitting}
      >
        {isSubmitting ? 'Analisando...' : 'Analisar Credito'}
      </button>
    </form>
  );
}
