'use client';

/**
 * Componente de formulário para entrada de dados do cliente
 */

import { useState } from 'react';

interface FormValues {
  idade: string;
  rendaMensal: string;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: string;
}

interface CreditFormProps {
  onSubmit: (values: FormValues) => void;
  loading: boolean;
}

export default function CreditForm({ onSubmit, loading }: CreditFormProps) {
  const [values, setValues] = useState<FormValues>({
    idade: '',
    rendaMensal: '',
    historicoDividas: 'limpo',
    valorEmprestimo: '',
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setValues((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(values);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Campo Idade */}
      <div>
        <label htmlFor="idade" className="block text-sm font-medium mb-1">
          Idade
        </label>
        <input
          id="idade"
          name="idade"
          type="number"
          min={1}
          required
          value={values.idade}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: 30"
        />
      </div>

      {/* Campo Renda Mensal */}
      <div>
        <label htmlFor="rendaMensal" className="block text-sm font-medium mb-1">
          Renda Mensal (R$)
        </label>
        <input
          id="rendaMensal"
          name="rendaMensal"
          type="number"
          min={0}
          step="0.01"
          required
          value={values.rendaMensal}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: 5000"
        />
      </div>

      {/* Campo Histórico de Dívidas */}
      <div>
        <label
          htmlFor="historicoDividas"
          className="block text-sm font-medium mb-1"
        >
          Histórico de Dívidas
        </label>
        <select
          id="historicoDividas"
          name="historicoDividas"
          required
          value={values.historicoDividas}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      {/* Campo Valor do Empréstimo */}
      <div>
        <label htmlFor="valorEmprestimo" className="block text-sm font-medium mb-1">
          Valor do Empréstimo (R$)
        </label>
        <input
          id="valorEmprestimo"
          name="valorEmprestimo"
          type="number"
          min={0}
          step="0.01"
          required
          value={values.valorEmprestimo}
          onChange={handleChange}
          className="w-full rounded-lg border border-gray-300 px-3 py-2 text-sm
                     focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          placeholder="Ex: 10000"
        />
      </div>

      {/* Botão de envio */}
      <button
        type="submit"
        disabled={loading}
        className="w-full rounded-lg bg-blue-600 px-4 py-2.5 text-sm font-semibold
                   text-white transition hover:bg-blue-700 disabled:cursor-not-allowed
                   disabled:opacity-60"
      >
        {loading ? 'Analisando...' : 'Solicitar Análise de Crédito'}
      </button>
    </form>
  );
}
