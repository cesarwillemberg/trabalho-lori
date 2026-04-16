'use client';

/**
 * CreditForm Component (UI Layer)
 * 
 * Componente de interface responsável apenas por:
 * - Renderizar o formulário de entrada
 * - Capturar inputs do usuário
 * - Exibir mensagens de erro de validação
 * 
 * NÃO contém lógica de negócio.
 * Toda validação e processamento é delegated ao Service layer.
 */

import { useState, FormEvent } from 'react';
import { CreditRequest, ValidationResult } from '@/types/credit';
import { validarRequisicaoCredito } from '@/layers/validation/creditValidation';

interface CreditFormProps {
  onSubmit: (dados: CreditRequest) => void;
  validationErrors: string[];
}

export default function CreditForm({ onSubmit, validationErrors }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditRequest>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0,
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validacao: ValidationResult = validarRequisicaoCredito(formData);
    
    if (validacao.valido) {
      onSubmit(formData);
    }
  };

  const handleChange = (campo: keyof CreditRequest, valor: string | number) => {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  };

  const temErros = validationErrors.length > 0;

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="idade" className="block text-sm font-medium mb-1">
          Idade
        </label>
        <input
          type="number"
          id="idade"
          value={formData.idade || ''}
          onChange={(e) => handleChange('idade', Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          min="0"
          required
        />
      </div>

      <div>
        <label htmlFor="rendaMensal" className="block text-sm font-medium mb-1">
          Renda Mensal (R$)
        </label>
        <input
          type="number"
          id="rendaMensal"
          value={formData.rendaMensal || ''}
          onChange={(e) => handleChange('rendaMensal', Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label htmlFor="historicoDividas" className="block text-sm font-medium mb-1">
          Histórico de Dívidas
        </label>
        <select
          id="historicoDividas"
          value={formData.historicoDividas}
          onChange={(e) => handleChange('historicoDividas', e.target.value)}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
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
          value={formData.valorEmprestimo || ''}
          onChange={(e) => handleChange('valorEmprestimo', Number(e.target.value))}
          className="w-full px-3 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 outline-none"
          min="0"
          step="0.01"
          required
        />
      </div>

      {temErros && (
        <div className="p-3 bg-red-100 border border-red-400 rounded-lg">
          <ul className="text-sm text-red-700 list-disc list-inside">
            {validationErrors.map((erro, idx) => (
              <li key={idx}>{erro}</li>
            ))}
          </ul>
        </div>
      )}

      <button
        type="submit"
        className="w-full bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors font-medium"
      >
        Analisar Crédito
      </button>
    </form>
  );
}
