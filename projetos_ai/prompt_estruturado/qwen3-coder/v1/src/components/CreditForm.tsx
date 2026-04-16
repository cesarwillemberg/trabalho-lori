'use client';

import { useState } from 'react';
import { CreditRequest } from '@/types';

interface CreditFormProps {
  onSubmit: (dados: CreditRequest) => void;
  disabled?: boolean;
}

export default function CreditForm({ onSubmit, disabled }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditRequest>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]:
        name === 'idade' || name === 'rendaMensal' || name === 'valorEmprestimo'
          ? parseFloat(value) || 0
          : value,
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="idade" className="block text-sm font-medium mb-1">
          Idade
        </label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={formData.idade || ''}
          onChange={handleChange}
          disabled={disabled}
          min="0"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 25"
        />
      </div>

      <div>
        <label htmlFor="rendaMensal" className="block text-sm font-medium mb-1">
          Renda Mensal (R$)
        </label>
        <input
          type="number"
          id="rendaMensal"
          name="rendaMensal"
          value={formData.rendaMensal || ''}
          onChange={handleChange}
          disabled={disabled}
          min="0"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 3000.00"
        />
      </div>

      <div>
        <label htmlFor="historicoDividas" className="block text-sm font-medium mb-1">
          Histórico de Dívidas
        </label>
        <select
          id="historicoDividas"
          name="historicoDividas"
          value={formData.historicoDividas}
          onChange={handleChange}
          disabled={disabled}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div>
        <label htmlFor="valorEmprestimo" className="block text-sm font-medium mb-1">
          Valor do Empréstimo (R$)
        </label>
        <input
          type="number"
          id="valorEmprestimo"
          name="valorEmprestimo"
          value={formData.valorEmprestimo || ''}
          onChange={handleChange}
          disabled={disabled}
          min="0"
          step="0.01"
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Ex: 10000.00"
        />
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
      >
        {disabled ? 'Analisando...' : 'Analisar Crédito'}
      </button>
    </form>
  );
}
