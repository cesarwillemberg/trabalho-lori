'use client';

import { useState } from 'react';
import { CreditRequest, CreditResult, LogEntry } from '@/types';
import { CreditService } from '@/services/CreditService';

/**
 * UI Layer - Componente de formulário de análise de crédito
 * Esta camada é responsável apenas pela interface do usuário,
 * sem conter lógica de negócio (delegada ao Service)
 */

interface FormProps {
  onResult: (result: CreditResult) => void;
}

export default function CreditForm({ onResult }: FormProps) {
  const [formData, setFormData] = useState<CreditRequest>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (field: keyof CreditRequest, value: string | number) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const result = CreditService.analisarCredito(formData);
    CreditService.salvarLog(formData, result);
    onResult(result);
  };

  const getInputClass = (field: string) => {
    const baseClass = 'w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 transition-colors';
    const errorClass = errors[field] ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200';
    return `${baseClass} ${errorClass}`;
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Idade
        </label>
        <input
          type="number"
          value={formData.idade || ''}
          onChange={e => handleChange('idade', parseInt(e.target.value) || 0)}
          className={getInputClass('idade')}
          placeholder="Digite sua idade"
        />
        {errors.idade && <p className="mt-1 text-sm text-red-500">{errors.idade}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Renda Mensal (R$)
        </label>
        <input
          type="number"
          value={formData.rendaMensal || ''}
          onChange={e => handleChange('rendaMensal', parseFloat(e.target.value) || 0)}
          className={getInputClass('rendaMensal')}
          placeholder="Digite sua renda mensal"
        />
        {errors.rendaMensal && <p className="mt-1 text-sm text-red-500">{errors.rendaMensal}</p>}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Histórico de Dívidas
        </label>
        <select
          value={formData.historicoDividas}
          onChange={e => handleChange('historicoDividas', e.target.value)}
          className={getInputClass('historicoDividas')}
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Valor do Empréstimo (R$)
        </label>
        <input
          type="number"
          value={formData.valorEmprestimo || ''}
          onChange={e => handleChange('valorEmprestimo', parseFloat(e.target.value) || 0)}
          className={getInputClass('valorEmprestimo')}
          placeholder="Digite o valor desejado"
        />
        {errors.valorEmprestimo && <p className="mt-1 text-sm text-red-500">{errors.valorEmprestimo}</p>}
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-medium hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-300"
      >
        Analisar Crédito
      </button>
    </form>
  );
}