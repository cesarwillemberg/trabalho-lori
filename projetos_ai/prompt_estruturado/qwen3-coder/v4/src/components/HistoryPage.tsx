'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { logRepository } from '@/infrastructure/storage';
import { CreditAnalysisLog } from '@/types/credit';

export default function HistoryPage() {
  const [logs, setLogs] = useState<CreditAnalysisLog[]>([]);

  useEffect(() => {
    setLogs(logRepository.getLogs());
  }, []);

  const handleClearLogs = () => {
    if (confirm('Tem certeza que deseja limpar todos os logs?')) {
      logRepository.clearLogs();
      setLogs([]);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleString('pt-BR');
  };

  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-8">
          <div>
            <Link
              href="/"
              className="text-indigo-600 hover:text-indigo-800 text-sm mb-2 inline-block"
            >
              ← Voltar para análise
            </Link>
            <h1 className="text-3xl font-bold text-gray-900">
              Histórico de Análises
            </h1>
          </div>
          
          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="px-4 py-2 text-red-600 border border-red-300 rounded-lg hover:bg-red-50 transition-colors"
            >
              Limpar Histórico
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <div className="bg-white rounded-xl shadow-lg p-12 text-center">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-gray-400"
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
            </div>
            <h2 className="text-xl font-semibold text-gray-700 mb-2">
              Nenhum registro encontrado
            </h2>
            <p className="text-gray-500 mb-6">
              Realize uma análise de crédito para ver o histórico aqui.
            </p>
            <Link
              href="/"
              className="inline-block bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 transition-colors"
            >
              Fazer Nova Análise
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {logs.map((log) => (
              <div
                key={log.id}
                className={`bg-white rounded-xl shadow-lg p-6 border-l-4 ${
                  log.resultado.aprovado ? 'border-l-green-500' : 'border-l-red-500'
                }`}
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <span
                      className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${
                        log.resultado.aprovado
                          ? 'bg-green-100 text-green-800'
                          : 'bg-red-100 text-red-800'
                      }`}
                    >
                      {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
                    </span>
                    <p className="text-sm text-gray-500 mt-2">
                      {formatDate(log.dataHora)}
                    </p>
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Idade
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      {log.cliente.idade} anos
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Renda Mensal
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      R$ {log.cliente.rendaMensal.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Valor Empréstimo
                    </p>
                    <p className="text-lg font-semibold text-gray-900">
                      R$ {log.cliente.valorEmprestimo.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
                    </p>
                  </div>
                  <div className="bg-gray-50 rounded-lg p-3">
                    <p className="text-xs text-gray-500 uppercase tracking-wide">
                      Histórico
                    </p>
                    <p className="text-lg font-semibold text-gray-900 capitalize">
                      {log.cliente.historicoDividas}
                    </p>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100">
                  <p className="text-sm text-gray-600">
                    <strong>Parcela (12x):</strong>{' '}
                    R$ {log.resultado.detalhes.valorParcela.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}{' '}
                    ({log.resultado.detalhes.percentualComprometimento}% da renda)
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
