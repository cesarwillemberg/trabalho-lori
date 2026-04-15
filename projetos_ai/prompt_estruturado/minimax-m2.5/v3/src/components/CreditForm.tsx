'use client';

import { useState, FormEvent } from 'react';
import { CreditAnalysisRequest, DebtHistory } from '@/types';
import { CreditAnalysisService } from '@/services/creditAnalysis';
import { LogService } from '@/services/logService';
import { ResultDisplay } from './ResultDisplay';

export function CreditForm() {
  const [formData, setFormData] = useState<CreditAnalysisRequest>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'limpo',
    loanAmount: 0,
  });

  const [result, setResult] = useState<{ request: CreditAnalysisRequest; result: ReturnType<typeof CreditAnalysisService.analyze> } | null>(null);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();

    const analysisResult = CreditAnalysisService.analyze(formData);
    LogService.saveLog(formData, analysisResult);

    setResult({ request: formData, result: analysisResult });
  };

  const handleInputChange = (field: keyof CreditAnalysisRequest, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'debtHistory' ? value : Number(value),
    }));
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Análise de Crédito</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Idade</label>
          <input
            type="number"
            value={formData.age || ''}
            onChange={(e) => handleInputChange('age', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Renda Mensal (R$)</label>
          <input
            type="number"
            value={formData.monthlyIncome || ''}
            onChange={(e) => handleInputChange('monthlyIncome', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
            step="0.01"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Histórico de Dívidas</label>
          <select
            value={formData.debtHistory}
            onChange={(e) => handleInputChange('debtHistory', e.target.value as DebtHistory)}
            className="w-full p-2 border border-gray-300 rounded-md"
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Valor do Empréstimo (R$)</label>
          <input
            type="number"
            value={formData.loanAmount || ''}
            onChange={(e) => handleInputChange('loanAmount', e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
            required
            min="0"
            step="0.01"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 transition-colors"
        >
          Analisar Crédito
        </button>
      </form>

      {result && <ResultDisplay request={result.request} result={result.result} />}
    </div>
  );
}