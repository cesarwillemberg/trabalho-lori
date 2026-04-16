'use client';

import { useState, FormEvent } from 'react';
import { CreditRequest } from '@/types';

interface CreditFormProps {
  onSubmit: (dados: CreditRequest) => void;
  isLoading: boolean;
}

export default function CreditForm({ onSubmit, isLoading }: CreditFormProps) {
  const [idade, setIdade] = useState<string>('');
  const [rendaMensal, setRendaMensal] = useState<string>('');
  const [historico, setHistorico] = useState<string>('');
  const [valorEmprestimo, setValorEmprestimo] = useState<string>('');

  const obterDadosDoFormulario = (): CreditRequest => ({
    idade: Number(idade),
    rendaMensal: Number(rendaMensal),
    historicoDividas: historico as 'limpo' | 'negativado',
    valorEmprestimo: Number(valorEmprestimo),
  });

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(obterDadosDoFormulario());
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Idade</label>
        <input
          type="number"
          value={idade}
          onChange={(e) => setIdade(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Renda Mensal (R$)</label>
        <input
          type="number"
          value={rendaMensal}
          onChange={(e) => setRendaMensal(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Histórico de Dívidas</label>
        <select
          value={historico}
          onChange={(e) => setHistorico(e.target.value)}
          className="w-full p-2 border rounded"
          required
        >
          <option value="">Selecione</option>
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Valor do Empréstimo (R$)</label>
        <input
          type="number"
          value={valorEmprestimo}
          onChange={(e) => setValorEmprestimo(e.target.value)}
          className="w-full p-2 border rounded"
          min="0"
          step="0.01"
          required
        />
      </div>

      <button
        type="submit"
        disabled={isLoading}
        className="w-full bg-blue-600 text-white p-3 rounded font-medium hover:bg-blue-700 disabled:opacity-50"
      >
        {isLoading ? 'Analisando...' : 'Analisar Crédito'}
      </button>
    </form>
  );
}
