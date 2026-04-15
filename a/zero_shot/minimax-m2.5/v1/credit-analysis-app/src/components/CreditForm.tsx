'use client';

import { useState, FormEvent } from 'react';
import { CreditAnalysisInput, CreditAnalysisResult, DebtHistory, CreditLog } from '@/types';
import { analyzeCredit, validateInput } from '@/lib/creditAnalysis';
import { saveLog, generateId } from '@/lib/storage';
import ResultDisplay from './ResultDisplay';

export default function CreditForm() {
  const [formData, setFormData] = useState<CreditAnalysisInput>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'limpo' as DebtHistory,
    loanAmount: 0,
  });

  const [result, setResult] = useState<CreditAnalysisResult | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setError(null);
    setResult(null);

    const validationError = validateInput(formData);
    if (validationError) {
      setError(validationError);
      return;
    }

    setIsLoading(true);

    setTimeout(() => {
      const analysisResult = analyzeCredit(formData);
      setResult(analysisResult);

      const log: CreditLog = {
        id: generateId(),
        timestamp: new Date().toISOString(),
        age: formData.age,
        monthlyIncome: formData.monthlyIncome,
        loanAmount: formData.loanAmount,
        debtHistory: formData.debtHistory,
        result: analysisResult.approved ? 'Aprovado' : 'Reprovado',
        reasons: analysisResult.reasons,
      };

      saveLog(log);
      setIsLoading(false);
    }, 500);
  };

  const handleChange = (field: keyof CreditAnalysisInput, value: string | number) => {
    setFormData((prev) => ({
      ...prev,
      [field]: field === 'debtHistory' ? value : Number(value),
    }));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="age" className="block text-sm font-medium text-gray-300 mb-2">
          Idade *
        </label>
        <input
          type="number"
          id="age"
          min="1"
          max="150"
          value={formData.age || ''}
          onChange={(e) => handleChange('age', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: 25"
        />
      </div>

      <div>
        <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-300 mb-2">
          Renda Mensal (R$) *
        </label>
        <input
          type="number"
          id="monthlyIncome"
          min="0"
          step="0.01"
          value={formData.monthlyIncome || ''}
          onChange={(e) => handleChange('monthlyIncome', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: 3000.00"
        />
      </div>

      <div>
        <label htmlFor="debtHistory" className="block text-sm font-medium text-gray-300 mb-2">
          Histórico de Dívidas *
        </label>
        <select
          id="debtHistory"
          value={formData.debtHistory}
          onChange={(e) => handleChange('debtHistory', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="limpo">Limpo - Sem restrições</option>
          <option value="negativado">Negativado - Com restrições</option>
        </select>
      </div>

      <div>
        <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-300 mb-2">
          Valor do Empréstimo (R$) *
        </label>
        <input
          type="number"
          id="loanAmount"
          min="0"
          step="0.01"
          value={formData.loanAmount || ''}
          onChange={(e) => handleChange('loanAmount', e.target.value)}
          className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Ex: 10000.00"
        />
      </div>

      {error && (
        <div className="p-3 bg-red-900/30 border border-red-500 rounded-lg text-red-400 text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="w-full py-3 bg-blue-600 hover:bg-blue-500 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isLoading ? 'Analisando...' : 'Analisar Crédito'}
      </button>

      {result && <ResultDisplay result={result} />}
    </form>
  );
}