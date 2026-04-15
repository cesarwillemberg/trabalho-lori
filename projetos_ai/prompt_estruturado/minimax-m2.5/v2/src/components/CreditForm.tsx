'use client';

import { useState, FormEvent } from 'react';
import {
  CreditAnalysisRequest,
  CreditAnalysisResult,
  CreditLog
} from '../app/types';
import { analyzeCredit, createLog } from '../domain/creditAnalysis';
import { saveLog, getLogs } from '../storage/logStorage';

interface CreditFormProps {
  onAnalysisComplete: (result: CreditAnalysisResult) => void;
}

export default function CreditForm({ onAnalysisComplete }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditAnalysisRequest>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'clean',
    loanAmount: 0,
  });

  const [result, setResult] = useState<CreditAnalysisResult | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'debtHistory' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Executa análise de crédito
    const analysisResult = analyzeCredit(formData);
    setResult(analysisResult);
    onAnalysisComplete(analysisResult);

    // Cria e salva o log
    const log: CreditLog = createLog(formData, analysisResult);
    saveLog(log);

    setIsSubmitting(false);
  };

  return (
    <div className="form-container">
      <form onSubmit={handleSubmit} className="credit-form">
        <h2>Análise de Crédito</h2>

        <div className="form-group">
          <label htmlFor="age">Idade:</label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age || ''}
            onChange={handleChange}
            min="0"
            max="120"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="monthlyIncome">Renda Mensal (R$):</label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={formData.monthlyIncome || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="debtHistory">Histórico de Dívidas:</label>
          <select
            id="debtHistory"
            name="debtHistory"
            value={formData.debtHistory}
            onChange={handleChange}
            required
          >
            <option value="clean">Limpo</option>
            <option value="negative">Negativado</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="loanAmount">Valor do Empréstimo (R$):</label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount || ''}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? 'Analisando...' : 'Analisar Crédito'}
        </button>
      </form>

      {result && (
        <div className={`result ${result.approved ? 'approved' : 'rejected'}`}>
          <h3>Resultado: {result.approved ? 'Aprovado' : 'Reprovado'}</h3>
          <div className="result-details">
            <p>Parcela Mensal: R$ {result.monthlyInstallment.toFixed(2)}</p>
            <p>Percentual da Renda: {result.installmentPercentage.toFixed(1)}%</p>
            {result.reasons.length > 0 && (
              <div className="reasons">
                <h4>Motivos:</h4>
                <ul>
                  {result.reasons.map((reason, index) => (
                    <li key={index}>{reason}</li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}