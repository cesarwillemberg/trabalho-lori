'use client';

import { useState } from 'react';
import { validateCreditInput, CreditInput } from '@/layers/validation/creditValidation';
import { processCreditAnalysis, AnalysisResult } from '@/layers/service/creditService';

export default function Home() {
  const [formData, setFormData] = useState<CreditInput>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: '',
    loanAmount: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});
  const [result, setResult] = useState<AnalysisResult | null>(null);

  const handleInputChange = (field: keyof CreditInput, value: string | number) => {
    const processedValue = typeof value === 'string' && field !== 'debtHistory' 
      ? parseFloat(value) || 0 
      : value;
    
    setFormData(prev => ({ ...prev, [field]: processedValue }));
    setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = () => {
    const validationErrors = validateCreditInput(formData);
    
    if (validationErrors.length > 0) {
      const errorMap: Record<string, string> = {};
      validationErrors.forEach(err => {
        errorMap[err.field] = err.message;
      });
      setErrors(errorMap);
      setResult(null);
      return;
    }

    const analysisResult = processCreditAnalysis(formData, []);
    setResult(analysisResult);
    setErrors({});
  };

  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Análise de Crédito</h1>
        <p>Sistema de avaliação de crédito</p>
      </header>

      <main className="main">
        <div className="card">
          <h2>Dados do Cliente</h2>
          
          <div className="formGroup">
            <label htmlFor="age">Idade</label>
            <input
              id="age"
              type="number"
              value={formData.age || ''}
              onChange={(e) => handleInputChange('age', e.target.value)}
              min="18"
              max="120"
              placeholder="Ex: 25"
            />
            {errors.age && <span className="error">{errors.age}</span>}
          </div>

          <div className="formGroup">
            <label htmlFor="income">Renda Mensal (R$)</label>
            <input
              id="income"
              type="number"
              value={formData.monthlyIncome || ''}
              onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
              min="0"
              step="0.01"
              placeholder="Ex: 3000.00"
            />
            {errors.monthlyIncome && <span className="error">{errors.monthlyIncome}</span>}
          </div>

          <div className="formGroup">
            <label htmlFor="debtHistory">Histórico de Dívidas</label>
            <select
              id="debtHistory"
              value={formData.debtHistory}
              onChange={(e) => handleInputChange('debtHistory', e.target.value)}
            >
              <option value="">Selecione...</option>
              <option value="limpo">Limpo</option>
              <option value="negativado">Negativado</option>
            </select>
            {errors.debtHistory && <span className="error">{errors.debtHistory}</span>}
          </div>

          <div className="formGroup">
            <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
            <input
              id="loanAmount"
              type="number"
              value={formData.loanAmount || ''}
              onChange={(e) => handleInputChange('loanAmount', e.target.value)}
              min="0"
              step="0.01"
              placeholder="Ex: 10000.00"
            />
            {errors.loanAmount && <span className="error">{errors.loanAmount}</span>}
          </div>

          <button className="button" onClick={handleSubmit}>
            Analisar Crédito
          </button>
        </div>

        {result && (
          <div className={`card resultCard ${result.approved ? 'approved' : 'rejected'}`}>
            <h2>Resultado da Análise</h2>
            
            <div className="resultStatus">
              {result.approved ? 'Aprovado' : 'Reprovado'}
            </div>

            {result.approved ? (
              <div className="resultDetails">
                <p>
                  <strong>Valor da Parcela:</strong> {formatCurrency(result.installmentValue)}
                </p>
                <p>
                  <strong>Comprometimento:</strong> {result.incomePercentage.toFixed(2)}% da renda
                </p>
              </div>
            ) : (
              <div className="resultDetails">
                <p><strong>Motivos:</strong></p>
                <ul>
                  {result.rejectionReasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        )}
      </main>
    </div>
  );
}