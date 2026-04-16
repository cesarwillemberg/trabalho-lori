'use client';

import { useState } from 'react';
import { CreditRequest, DebtHistory } from '@/types';

interface CreditFormProps {
  onSubmit: (dados: CreditRequest) => Promise<void>;
  disabled: boolean;
}

export default function CreditForm({ onSubmit, disabled }: CreditFormProps) {
  const [idade, setIdade] = useState<string>('');
  const [rendaMensal, setRendaMensal] = useState<string>('');
  const [historicoDividas, setHistoricoDividas] = useState<DebtHistory>('limpo');
  const [valorEmprestimo, setValorEmprestimo] = useState<string>('');

  const formatarMoeda = (valor: string): string => {
    const numero = parseFloat(valor.replace(/\D/g, '') || '0') / 100;
    return numero.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    });
  };

  const handleRendaChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setRendaMensal(valor);
  };

  const handleEmprestimoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valor = e.target.value.replace(/\D/g, '');
    setValorEmprestimo(valor);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const dados: CreditRequest = {
      idade: parseInt(idade, 10),
      rendaMensal: parseInt(rendaMensal, 10) / 100,
      historicoDividas,
      valorEmprestimo: parseInt(valorEmprestimo, 10) / 100,
    };

    await onSubmit(dados);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="space-y-4">
        <div>
          <label htmlFor="idade" className="block text-sm font-medium mb-2">
            Idade
          </label>
          <input
            id="idade"
            type="number"
            min="0"
            max="120"
            value={idade}
            onChange={(e) => setIdade(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Ex: 25"
            required
            disabled={disabled}
          />
        </div>

        <div>
          <label htmlFor="rendaMensal" className="block text-sm font-medium mb-2">
            Renda Mensal (R$)
          </label>
          <input
            id="rendaMensal"
            type="text"
            value={rendaMensal ? formatarMoeda(rendaMensal) : ''}
            onChange={handleRendaChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="R$ 0,00"
            required
            disabled={disabled}
          />
        </div>

        <div>
          <label htmlFor="historicoDividas" className="block text-sm font-medium mb-2">
            Histórico de Dívidas
          </label>
          <select
            id="historicoDividas"
            value={historicoDividas}
            onChange={(e) => setHistoricoDividas(e.target.value as DebtHistory)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            disabled={disabled}
          >
            <option value="limpo">Limpo (sem negativação)</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>

        <div>
          <label htmlFor="valorEmprestimo" className="block text-sm font-medium mb-2">
            Valor do Empréstimo Solicitado (R$)
          </label>
          <input
            id="valorEmprestimo"
            type="text"
            value={valorEmprestimo ? formatarMoeda(valorEmprestimo) : ''}
            onChange={handleEmprestimoChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="R$ 0,00"
            required
            disabled={disabled}
          />
        </div>
      </div>

      <button
        type="submit"
        disabled={disabled}
        className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg font-semibold hover:bg-blue-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
      >
        {disabled ? 'Analisando...' : 'Analisar Crédito'}
      </button>
    </form>
  );
}
