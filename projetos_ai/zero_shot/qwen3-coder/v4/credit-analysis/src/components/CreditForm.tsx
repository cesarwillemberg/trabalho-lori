'use client';

/**
 * Credit Analysis Form Component
 * 
 * This component renders a form for collecting client data for credit analysis.
 * Fields include: age, monthly income, debt history, and requested loan amount.
 */

import { useState } from 'react';

/**
 * Interface defining the form data structure
 */
interface FormData {
  idade: string;
  rendaMensal: string;
  historicoDividas: 'limpo' | 'negativado' | '';
  valorEmprestimo: string;
}

/**
 * Props for the CreditForm component
 */
interface CreditFormProps {
  /** Callback function when form is submitted with validated data */
  onSubmit: (data: {
    idade: number;
    rendaMensal: number;
    historicoDividas: 'limpo' | 'negativado';
    valorEmprestimo: number;
  }) => void;
}

export default function CreditForm({ onSubmit }: CreditFormProps) {
  // State for form data
  const [formData, setFormData] = useState<FormData>({
    idade: '',
    rendaMensal: '',
    historicoDividas: '',
    valorEmprestimo: '',
  });

  // State for validation errors
  const [errors, setErrors] = useState<Record<string, string>>({});

  /**
   * Handles input change and updates form state
   */
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => {
        const next = { ...prev };
        delete next[name];
        return next;
      });
    }
  };

  /**
   * Validates form data before submission
   */
  const validate = (): boolean => {
    const newErrors: Record<string, string> = {};

    if (!formData.idade || parseInt(formData.idade) <= 0) {
      newErrors.idade = 'Idade deve ser um valor positivo';
    }

    if (!formData.rendaMensal || parseFloat(formData.rendaMensal) <= 0) {
      newErrors.rendaMensal = 'Renda mensal deve ser um valor positivo';
    }

    if (!formData.historicoDividas) {
      newErrors.historicoDividas = 'Selecione o histórico de dívidas';
    }

    if (!formData.valorEmprestimo || parseFloat(formData.valorEmprestimo) <= 0) {
      newErrors.valorEmprestimo = 'Valor do empréstimo deve ser um valor positivo';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  /**
   * Handles form submission
   */
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (validate()) {
      onSubmit({
        idade: parseInt(formData.idade),
        rendaMensal: parseFloat(formData.rendaMensal),
        historicoDividas: formData.historicoDividas as 'limpo' | 'negativado',
        valorEmprestimo: parseFloat(formData.valorEmprestimo),
      });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Age Field */}
      <div>
        <label htmlFor="idade" className="block text-sm font-medium text-gray-700 mb-2">
          Idade
        </label>
        <input
          type="number"
          id="idade"
          name="idade"
          value={formData.idade}
          onChange={handleChange}
          placeholder="Ex: 25"
          min="1"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.idade ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.idade && (
          <p className="mt-1 text-sm text-red-600">{errors.idade}</p>
        )}
      </div>

      {/* Monthly Income Field */}
      <div>
        <label htmlFor="rendaMensal" className="block text-sm font-medium text-gray-700 mb-2">
          Renda Mensal (R$)
        </label>
        <input
          type="number"
          id="rendaMensal"
          name="rendaMensal"
          value={formData.rendaMensal}
          onChange={handleChange}
          placeholder="Ex: 5000"
          min="0"
          step="0.01"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.rendaMensal ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.rendaMensal && (
          <p className="mt-1 text-sm text-red-600">{errors.rendaMensal}</p>
        )}
      </div>

      {/* Debt History Field */}
      <div>
        <label htmlFor="historicoDividas" className="block text-sm font-medium text-gray-700 mb-2">
          Histórico de Dívidas
        </label>
        <select
          id="historicoDividas"
          name="historicoDividas"
          value={formData.historicoDividas}
          onChange={handleChange}
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.historicoDividas ? 'border-red-500' : 'border-gray-300'
          }`}
        >
          <option value="">Selecione...</option>
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
        {errors.historicoDividas && (
          <p className="mt-1 text-sm text-red-600">{errors.historicoDividas}</p>
        )}
      </div>

      {/* Loan Amount Field */}
      <div>
        <label htmlFor="valorEmprestimo" className="block text-sm font-medium text-gray-700 mb-2">
          Valor do Empréstimo (R$)
        </label>
        <input
          type="number"
          id="valorEmprestimo"
          name="valorEmprestimo"
          value={formData.valorEmprestimo}
          onChange={handleChange}
          placeholder="Ex: 10000"
          min="0"
          step="0.01"
          className={`w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent ${
            errors.valorEmprestimo ? 'border-red-500' : 'border-gray-300'
          }`}
        />
        {errors.valorEmprestimo && (
          <p className="mt-1 text-sm text-red-600">{errors.valorEmprestimo}</p>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-colors font-medium text-lg"
      >
        Analisar Crédito
      </button>
    </form>
  );
}
