'use client';

import { useState, FormEvent } from 'react';
import { ClientData } from '@/types';

interface CreditFormProps {
  onSubmit: (data: ClientData) => void;
}

export default function CreditForm({ onSubmit }: CreditFormProps) {
  const [age, setAge] = useState<string>('');
  const [monthlyIncome, setMonthlyIncome] = useState<string>('');
  const [debtHistory, setDebtHistory] = useState<'limpo' | 'negativado'>('limpo');
  const [loanAmount, setLoanAmount] = useState<string>('');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    const clientData: ClientData = {
      age: Number(age),
      monthlyIncome: Number(monthlyIncome.replace(',', '.')),
      debtHistory,
      loanAmount: Number(loanAmount.replace(',', '.')),
    };
    
    onSubmit(clientData);
  };

  const isValid = age && monthlyIncome && loanAmount;

  return (
    <div className="card">
      <h2 className="card-title">Dados do Cliente</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="age">Idade</label>
          <input
            id="age"
            type="number"
            min="18"
            max="120"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            placeholder="Digite sua idade"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
          <input
            id="monthlyIncome"
            type="text"
            inputMode="decimal"
            value={monthlyIncome}
            onChange={(e) => setMonthlyIncome(e.target.value)}
            placeholder="Ex: 3000,00"
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="debtHistory">Histórico de Dívidas</label>
          <select
            id="debtHistory"
            value={debtHistory}
            onChange={(e) => setDebtHistory(e.target.value as 'limpo' | 'negativado')}
            required
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>
        
        <div className="form-group">
          <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
          <input
            id="loanAmount"
            type="text"
            inputMode="decimal"
            value={loanAmount}
            onChange={(e) => setLoanAmount(e.target.value)}
            placeholder="Ex: 5000,00"
            required
          />
        </div>
        
        <button type="submit" className="btn" disabled={!isValid}>
          Analisar Crédito
        </button>
      </form>
    </div>
  );
}
