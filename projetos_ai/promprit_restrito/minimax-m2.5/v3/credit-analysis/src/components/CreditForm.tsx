'use client';

import { useState } from 'react';
import { CreditRequest, CreditResult } from '@/types';
import { validateCreditRequest } from '@/layers/validation';
import { analyzeCredit } from '@/layers/service';
import { saveLog } from '@/layers/repository';

export default function CreditForm() {
  const [formData, setFormData] = useState<CreditRequest>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'clean',
    loanAmount: 0
  });

  const [result, setResult] = useState<CreditResult | null>(null);
  const [errors, setErrors] = useState<string[]>([]);

  function handleInputChange(field: keyof CreditRequest, value: string | number) {
    setFormData(prev => ({ ...prev, [field]: value }));
  }

  function handleSubmit() {
    const validation = validateCreditRequest(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    setErrors([]);
    const creditResult = analyzeCredit(formData);
    saveLog(formData, creditResult);
    setResult(creditResult);
  }

  return (
    <div className="container">
      <h1>Análise de Crédito</h1>
      
      <div className="form-group">
        <label>Idade</label>
        <input
          type="number"
          value={formData.age || ''}
          onChange={e => handleInputChange('age', Number(e.target.value))}
          min="0"
        />
      </div>

      <div className="form-group">
        <label>Renda Mensal (R$)</label>
        <input
          type="number"
          value={formData.monthlyIncome || ''}
          onChange={e => handleInputChange('monthlyIncome', Number(e.target.value))}
          min="0"
          step="0.01"
        />
      </div>

      <div className="form-group">
        <label>Histórico de Dívidas</label>
        <select
          value={formData.debtHistory}
          onChange={e => handleInputChange('debtHistory', e.target.value)}
        >
          <option value="clean">Limpo</option>
          <option value="negative">Negativado</option>
        </select>
      </div>

      <div className="form-group">
        <label>Valor do Empréstimo (R$)</label>
        <input
          type="number"
          value={formData.loanAmount || ''}
          onChange={e => handleInputChange('loanAmount', Number(e.target.value))}
          min="0"
          step="0.01"
        />
      </div>

      <button onClick={handleSubmit}>Analisar Crédito</button>

      {errors.length > 0 && (
        <div className="errors">
          {errors.map((error, index) => (
            <p key={index}>{error}</p>
          ))}
        </div>
      )}

      {result && (
        <div className={`result ${result.approved ? 'approved' : 'rejected'}`}>
          <h2>{result.approved ? 'Aprovado' : 'Reprovado'}</h2>
          <p>Valor da parcela: R$ {result.installmentValue.toFixed(2)}</p>
          <p>Comprometimento da renda: {result.installmentPercentage.toFixed(2)}%</p>
          {result.reasons.length > 0 && (
            <div className="reasons">
              <h3>Motivos:</h3>
              <ul>
                {result.reasons.map((reason, index) => (
                  <li key={index}>{reason}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      <style jsx>{`
        .container {
          max-width: 500px;
          margin: 0 auto;
          padding: 2rem;
          font-family: Arial, sans-serif;
        }
        
        h1 {
          text-align: center;
          color: #333;
        }
        
        .form-group {
          margin-bottom: 1rem;
        }
        
        label {
          display: block;
          margin-bottom: 0.5rem;
          font-weight: bold;
        }
        
        input, select {
          width: 100%;
          padding: 0.75rem;
          border: 1px solid #ccc;
          border-radius: 4px;
          font-size: 1rem;
        }
        
        button {
          width: 100%;
          padding: 1rem;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 4px;
          font-size: 1rem;
          cursor: pointer;
        }
        
        button:hover {
          background: #0051a2;
        }
        
        .errors {
          margin-top: 1rem;
          padding: 1rem;
          background: #fee;
          border: 1px solid #fcc;
          border-radius: 4px;
        }
        
        .errors p {
          color: #c00;
          margin: 0.25rem 0;
        }
        
        .result {
          margin-top: 1.5rem;
          padding: 1.5rem;
          border-radius: 4px;
          text-align: center;
        }
        
        .result.approved {
          background: #efe;
          border: 1px solid #cfc;
        }
        
        .result.rejected {
          background: #fee;
          border: 1px solid #fcc;
        }
        
        .result h2 {
          margin-top: 0;
        }
        
        .reasons {
          text-align: left;
          margin-top: 1rem;
        }
        
        .reasons h3 {
          margin: 0.5rem 0;
        }
        
        .reasons ul {
          margin: 0;
          padding-left: 1.5rem;
        }
      `}</style>
    </div>
  );
}
