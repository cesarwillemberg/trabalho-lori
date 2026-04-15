/**
 * Página de visualização de logs de análises de crédito.
 * Exibe o histórico de todas as análises realizadas pelo sistema.
 */

'use client';

import { useState, useEffect } from 'react';
import { LogAnalise } from '@/lib/types';

export default function LogsPage() {
  const [logs, setLogs] = useState<LogAnalise[]>([]);
  const [carregando, setCarregando] = useState(true);
  const [erro, setErro] = useState<string | null>(null);

  /**
   * Carrega os logs do servidor ao montar o componente.
   */
  useEffect(() => {
    carregarLogs();
  }, []);

  const carregarLogs = async () => {
    setCarregando(true);
    setErro(null);

    try {
      const response = await fetch('/api/logs');
      
      if (!response.ok) {
        throw new Error('Erro ao carregar logs');
      }

      const data = await response.json();
      setLogs(data.logs || []);
    } catch {
      setErro('Não foi possível carregar os logs.');
    } finally {
      setCarregando(false);
    }
  };

  /**
   * Formata a data/hora para exibição legível.
   */
  const formatarData = (dataISO: string): string => {
    const data = new Date(dataISO);
    return data.toLocaleString('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  /**
   * Formata valor monetário para exibição.
   */
  const formatarMoeda = (valor: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(valor);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Cabeçalho */}
      <header className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-purple-600 p-2 rounded-lg">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
                  />
                </svg>
              </div>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Histórico de Análises
                </h1>
                <p className="text-sm text-gray-600">
                  Registro de todas as análises de crédito realizadas
                </p>
              </div>
            </div>
            <a
              href="/"
              className="px-4 py-2 text-sm font-medium text-blue-600 hover:text-blue-800 border border-blue-600 rounded-lg hover:border-blue-800 transition"
            >
              ← Voltar ao início
            </a>
          </div>
        </div>
      </header>

      {/* Conteúdo principal */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Estado de carregamento */}
        {carregando && (
          <div className="text-center py-16">
            <svg
              className="animate-spin h-12 w-12 text-blue-600 mx-auto"
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
            <p className="mt-4 text-gray-600">Carregando logs...</p>
          </div>
        )}

        {/* Estado de erro */}
        {erro && !carregando && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <p className="text-red-700 mb-4">{erro}</p>
            <button
              onClick={carregarLogs}
              className="px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition"
            >
              Tentar novamente
            </button>
          </div>
        )}

        {/* Lista de logs */}
        {!carregando && !erro && (
          <>
            {logs.length === 0 ? (
              <div className="text-center py-16 bg-white rounded-xl shadow-md">
                <svg
                  className="w-16 h-16 text-gray-400 mx-auto mb-4"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                  />
                </svg>
                <p className="text-gray-600 text-lg">
                  Nenhuma análise realizada ainda.
                </p>
                <a
                  href="/"
                  className="inline-block mt-4 text-blue-600 hover:text-blue-800 font-medium"
                >
                  Realizar primeira análise →
                </a>
              </div>
            ) : (
              <div className="space-y-4">
                {/* Contador de logs */}
                <div className="text-right text-sm text-gray-600 mb-4">
                  Total: {logs.length} análise{logs.length !== 1 ? 's' : ''}
                </div>

                {/* Cards de logs - ordem inversa (mais recente primeiro) */}
                {[...logs].reverse().map((log) => (
                  <div
                    key={log.id}
                    className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition"
                  >
                    {/* Cabeçalho do log */}
                    <div className="flex items-center justify-between mb-4 pb-4 border-b border-gray-200">
                      <div className="flex items-center gap-3">
                        {/* Badge de status */}
                        <span
                          className={`px-3 py-1 rounded-full text-sm font-semibold ${
                            log.resultado.aprovado
                              ? 'bg-green-100 text-green-800'
                              : 'bg-red-100 text-red-800'
                          }`}
                        >
                          {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
                        </span>
                        <span className="text-sm text-gray-500">
                          {formatarData(log.dataHora)}
                        </span>
                      </div>
                    </div>

                    {/* Dados do cliente */}
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                      <div>
                        <p className="text-xs text-gray-500">Idade</p>
                        <p className="font-semibold text-gray-900">
                          {log.clienteDados.idade} anos
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Renda Mensal</p>
                        <p className="font-semibold text-gray-900">
                          {formatarMoeda(log.clienteDados.rendaMensal)}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Histórico</p>
                        <p className="font-semibold text-gray-900 capitalize">
                          {log.clienteDados.historicoDividas}
                        </p>
                      </div>
                      <div>
                        <p className="text-xs text-gray-500">Empréstimo</p>
                        <p className="font-semibold text-gray-900">
                          {formatarMoeda(log.clienteDados.valorEmprestimo)}
                        </p>
                      </div>
                    </div>

                    {/* Detalhes do resultado */}
                    <div className="bg-gray-50 rounded-lg p-4">
                      <div className="grid grid-cols-2 gap-4 mb-3">
                        <div>
                          <p className="text-xs text-gray-500">Parcela</p>
                          <p className="font-medium text-gray-900">
                            {formatarMoeda(log.resultado.valorParcela)}
                          </p>
                        </div>
                        <div>
                          <p className="text-xs text-gray-500">
                            % Comprometido
                          </p>
                          <p className="font-medium text-gray-900">
                            {(log.resultado.percentualComprometido * 100).toFixed(1)}%
                          </p>
                        </div>
                      </div>

                      {/* Razões da reprovação */}
                      {log.resultado.razoes && log.resultado.razoes.length > 0 && (
                        <div className="mt-3 pt-3 border-t border-gray-200">
                          <p className="text-xs font-semibold text-red-700 mb-2">
                            Motivos:
                          </p>
                          <ul className="list-disc list-inside space-y-1">
                            {log.resultado.razoes.map((razao, index) => (
                              <li key={index} className="text-sm text-red-600">
                                {razao}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </>
        )}
      </main>

      {/* Rodapé */}
      <footer className="bg-gray-900 text-gray-400 py-8 mt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <p className="text-sm">
            © 2026 Sistema de Análise de Crédito. Desenvolvido com Next.js
          </p>
        </div>
      </footer>
    </div>
  );
}
