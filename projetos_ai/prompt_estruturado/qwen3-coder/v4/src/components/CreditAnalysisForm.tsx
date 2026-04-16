'use client';

import { useState, useEffect } from 'react';
import { ClientData, CreditAnalysisLog } from '@/types/credit';
import { CreditRules } from '@/domain/creditRules';
import { logRepository } from '@/infrastructure/storage';
import ResultDisplay from './ResultDisplay';

export default function CreditAnalysisForm() {
  const [formData, setFormData] = useState<ClientData>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0,
  });

  const [result, setResult] = useState<CreditAnalysisLog | null>(null);
  const [errors, setErrors] = useState<string[]>([]);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: name === 'idade' || name === 'rendaMensal' || name === 'valorEmprestimo'
        ? parseFloat(value) || 0
        : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrors([]);
    setIsSubmitted(true);

    const validation = CreditRules.validateInput(formData);
    
    if (!validation.isValid) {
      setErrors(validation.errors);
      setResult(null);
      return;
    }

    const analysisResult = CreditRules.analyze(formData);

    const logEntry: CreditAnalysisLog = {
      id: crypto.randomUUID(),
      dataHora: new Date().toISOString(),
      cliente: { ...formData },
      resultado: analysisResult,
    };

    logRepository.saveLog(logEntry);

    setResult(logEntry);
  };

  const resetForm = () => {
    setFormData({
      idade: 0,
      rendaMensal: 0,
      historicoDividas: 'limpo',
      valorEmprestimo: 0,
    });
    setResult(null);
    setErrors([]);
    setIsSubmitted(false);
  };

  return (
    <div className="bg-white rounded-2xl shadow-xl p-8">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="idade"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Idade
            </label>
            <input
              type="number"
              id="idade"
              name="idade"
              min="0"
              max="120"
              value={formData.idade || ''}
              onChange={handleInputChange}
              placeholder="Ex: 25"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="rendaMensal"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Renda Mensal (R$)
            </label>
            <input
              type="number"
              id="rendaMensal"
              name="rendaMensal"
              min="0"
              step="0.01"
              value={formData.rendaMensal || ''}
              onChange={handleInputChange}
              placeholder="Ex: 3000.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <div>
            <label
              htmlFor="valorEmprestimo"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Valor do Empréstimo (R$)
            </label>
            <input
              type="number"
              id="valorEmprestimo"
              name="valorEmprestimo"
              min="0"
              step="0.01"
              value={formData.valorEmprestimo || ''}
              onChange={handleInputChange}
              placeholder="Ex: 12000.00"
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            />
          </div>

          <div>
            <label
              htmlFor="historicoDividas"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Histórico de Dívidas
            </label>
            <select
              id="historicoDividas"
              name="historicoDividas"
              value={formData.historicoDividas}
              onChange={handleInputChange}
              className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-white"
            >
              <option value="limpo">Limpo</option>
              <option value="negativado">Negativado</option>
            </select>
          </div>
        </div>

        {errors.length > 0 && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <h3 className="text-sm font-medium text-red-800 mb-2">
              Erros de validação:
            </h3>
            <ul className="list-disc list-inside text-sm text-red-700">
              {errors.map((error, index) => (
                <li key={index}>{error}</li>
              ))}
            </ul>
          </div>
        )}

        <div className="flex gap-4 pt-4">
          <button
            type="submit"
            className="flex-1 bg-indigo-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-indigo-700 focus:ring-4 focus:ring-indigo-200 transition-colors"
          >
            Analisar Crédito
          </button>
          
          {isSubmitted && (
            <button
              type="button"
              onClick={resetForm}
              className="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors"
            >
              Novo Cálculo
            </button>
          )}
        </div>
      </form>

      {result && <ResultDisplay log={result} />}
    </div>
  );
}
