'use client';

/**
 * Componente de formulário para análise de crédito.
 * Coleta os dados do cliente: idade, renda mensal, histórico de dívidas
 * e valor do empréstimo solicitado.
 */

import { useState, FormEvent, ChangeEvent } from 'react';
import { ResultadoAnalise } from '@/lib/types';

/** Estado inicial do formulário */
const ESTADO_INICIAL = {
  idade: '',
  rendaMensal: '',
  historicoDividas: 'limpo' as 'limpo' | 'negativado',
  valorEmprestimo: '',
};

export default function FormularioAnalise() {
  // Estado dos campos do formulário
  const [form, setForm] = useState(ESTADO_INICIAL);
  // Estado do resultado da análise
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);
  // Estado de carregamento durante requisição
  const [carregando, setCarregando] = useState(false);
  // Estado de erro na validação do formulário
  const [erroValidacao, setErroValidacao] = useState<string | null>(null);

  /**
   * Handler genérico para mudanças nos campos do formulário.
   * Atualiza o estado correspondente ao campo modificado.
   */
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === 'historicoDividas' ? value : value,
    }));
    // Limpa erros e resultado ao modificar campos
    setErroValidacao(null);
    setResultado(null);
  };

  /**
   * Handler de envio do formulário.
   * Valida os dados localmente e envia para a API de análise.
   */
  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setErroValidacao(null);
    setResultado(null);

    // Converte valores para números
    const idade = Number(form.idade);
    const rendaMensal = Number(form.rendaMensal);
    const valorEmprestimo = Number(form.valorEmprestimo);

    // Validações locais básicas
    if (!form.idade || isNaN(idade) || idade <= 0) {
      setErroValidacao('Informe uma idade válida.');
      return;
    }

    if (!form.rendaMensal || isNaN(rendaMensal) || rendaMensal <= 0) {
      setErroValidacao('Informe uma renda mensal válida.');
      return;
    }

    if (!form.valorEmprestimo || isNaN(valorEmprestimo) || valorEmprestimo <= 0) {
      setErroValidacao('Informe um valor de empréstimo válido.');
      return;
    }

    setCarregando(true);

    try {
      // Envia dados para a API de análise de crédito
      const response = await fetch('/api/analise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          idade,
          rendaMensal,
          historicoDividas: form.historicoDividas,
          valorEmprestimo,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setErroValidacao(data.error || 'Erro ao processar análise.');
        return;
      }

      // Exibe o resultado da análise
      setResultado(data);
    } catch {
      setErroValidacao('Erro de conexão. Tente novamente.');
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Handler para limpar o formulário e resultado.
   */
  const handleLimpar = () => {
    setForm(ESTADO_INICIAL);
    setResultado(null);
    setErroValidacao(null);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-xl shadow-lg p-8 space-y-6"
      >
        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">
          Formulário de Análise de Crédito
        </h2>

        {/* Campo: Idade */}
        <div>
          <label
            htmlFor="idade"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Idade (anos)
          </label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={form.idade}
            onChange={handleChange}
            placeholder="Ex: 30"
            min="1"
            max="150"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
          />
        </div>

        {/* Campo: Renda Mensal */}
        <div>
          <label
            htmlFor="rendaMensal"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Renda Mensal (R$)
          </label>
          <input
            type="number"
            id="rendaMensal"
            name="rendaMensal"
            value={form.rendaMensal}
            onChange={handleChange}
            placeholder="Ex: 5000"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
          />
        </div>

        {/* Campo: Histórico de Dívidas */}
        <div>
          <label
            htmlFor="historicoDividas"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Histórico de Dívidas
          </label>
          <select
            id="historicoDividas"
            name="historicoDividas"
            value={form.historicoDividas}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900 bg-white"
          >
            <option value="limpo">Limpo (sem restrições)</option>
            <option value="negativado">Negativado (com restrições)</option>
          </select>
        </div>

        {/* Campo: Valor do Empréstimo */}
        <div>
          <label
            htmlFor="valorEmprestimo"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Valor do Empréstimo Solicitado (R$)
          </label>
          <input
            type="number"
            id="valorEmprestimo"
            name="valorEmprestimo"
            value={form.valorEmprestimo}
            onChange={handleChange}
            placeholder="Ex: 10000"
            min="0"
            step="0.01"
            required
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition text-gray-900"
          />
        </div>

        {/* Mensagem de erro de validação */}
        {erroValidacao && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-700 text-sm">{erroValidacao}</p>
          </div>
        )}

        {/* Botões de ação */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={carregando}
            className="flex-1 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition duration-200 shadow-md hover:shadow-lg"
          >
            {carregando ? (
              <span className="flex items-center justify-center gap-2">
                <svg
                  className="animate-spin h-5 w-5"
                  viewBox="0 0 24 24"
                  fill="none"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  />
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  />
                </svg>
                Analisando...
              </span>
            ) : (
              'Analisar Crédito'
            )}
          </button>
          <button
            type="button"
            onClick={handleLimpar}
            className="px-6 py-3 border border-gray-300 text-gray-700 font-medium rounded-lg hover:bg-gray-50 transition duration-200"
          >
            Limpar
          </button>
        </div>
      </form>

      {/* Exibição do resultado da análise */}
      {resultado && <ResultadoCard resultado={resultado} />}
    </div>
  );
}

/**
 * Componente que exibe o resultado da análise de crédito.
 * Mostra se foi aprovado ou reprovado com detalhes.
 */
function ResultadoCard({ resultado }: { resultado: ResultadoAnalise }) {
  const aprovado = resultado.aprovado;

  return (
    <div
      className={`mt-6 rounded-xl shadow-lg p-6 border-l-4 ${
        aprovado
          ? 'bg-green-50 border-green-500'
          : 'bg-red-50 border-red-500'
      }`}
    >
      <div className="flex items-center gap-3 mb-4">
        {/* Ícone de status */}
        <div
          className={`w-10 h-10 rounded-full flex items-center justify-center ${
            aprovado ? 'bg-green-500' : 'bg-red-500'
          }`}
        >
          {aprovado ? (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <svg
              className="w-6 h-6 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          )}
        </div>
        <h3
          className={`text-xl font-bold ${
            aprovado ? 'text-green-800' : 'text-red-800'
          }`}
        >
          {aprovado ? 'Aprovado' : 'Reprovado'}
        </h3>
      </div>

      <p
        className={`text-sm mb-4 ${
          aprovado ? 'text-green-700' : 'text-red-700'
        }`}
      >
        {resultado.mensagem}
      </p>

      {/* Detalhes financeiros */}
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500">Valor da Parcela</p>
          <p className="text-lg font-semibold text-gray-900">
            R$ {resultado.valorParcela.toFixed(2)}
          </p>
        </div>
        <div className="bg-white rounded-lg p-3 shadow-sm">
          <p className="text-xs text-gray-500">% Comprometido</p>
          <p className="text-lg font-semibold text-gray-900">
            {(resultado.percentualComprometido * 100).toFixed(1)}%
          </p>
        </div>
      </div>

      {/* Razões da reprovação */}
      {resultado.razoes && resultado.razoes.length > 0 && (
        <div>
          <h4 className="text-sm font-semibold text-red-800 mb-2">
            Motivos da reprovação:
          </h4>
          <ul className="list-disc list-inside space-y-1">
            {resultado.razoes.map((razao, index) => (
              <li key={index} className="text-sm text-red-700">
                {razao}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
