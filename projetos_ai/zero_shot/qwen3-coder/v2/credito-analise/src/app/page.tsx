/**
 * Página principal — integra formulário, resultado e tabela de logs
 */

'use client';

import { useState, useEffect } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultDisplay from '@/components/ResultDisplay';
import { ResultadoAnalise, LogAnalise } from '@/types/credito';

export default function Home() {
  const [resultado, setResultado] = useState<ResultadoAnalise | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [logs, setLogs] = useState<LogAnalise[]>([]);

  // Carrega os logs existentes ao montar o componente
  useEffect(() => {
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch(() => {});
  }, []);

  /**
   * Manipulador do envio do formulário
   */
  const handleSubmit = async (values: {
    idade: string;
    rendaMensal: string;
    historicoDividas: 'limpo' | 'negativado';
    valorEmprestimo: string;
  }) => {
    setError(null);
    setResultado(null);
    setLoading(true);

    try {
      const response = await fetch('/api/analise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          idade: Number(values.idade),
          rendaMensal: Number(values.rendaMensal),
          historicoDividas: values.historicoDividas,
          valorEmprestimo: Number(values.valorEmprestimo),
        }),
      });

      if (!response.ok) {
        const err = await response.json();
        throw new Error(err.error || 'Falha ao processar análise');
      }

      const data = await response.json();
      setResultado(data.resultado);

      // Atualiza a lista de logs com o novo registro
      const logsRes = await fetch('/api/logs');
      const logsData = await logsRes.json();
      setLogs(logsData);
    } catch (err: unknown) {
      const message =
        err instanceof Error ? err.message : 'Erro desconhecido';
      setError(message);
    } finally {
      setLoading(false);
    }
  };

  /**
   * Limpa todos os logs armazenados
   */
  const handleClearLogs = async () => {
    await fetch('/api/logs', { method: 'DELETE' });
    setLogs([]);
  };

  return (
    <main className="mx-auto max-w-3xl px-4 py-10">
      <h1 className="mb-1 text-center text-3xl font-extrabold tracking-tight">
        Análise de Crédito
      </h1>
      <p className="mb-8 text-center text-sm text-gray-500">
        Preencha os dados do cliente para avaliar a concessão de empréstimo
      </p>

      {/* Cartão do formulário */}
      <section className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <CreditForm onSubmit={handleSubmit} loading={loading} />
        <ResultDisplay resultado={resultado} error={error} />
      </section>

      {/* Cartão de logs */}
      <section className="mt-8 rounded-2xl border border-gray-200 bg-white p-6 shadow-sm">
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-lg font-bold">Histórico de Análises</h2>
          {logs.length > 0 && (
            <button
              onClick={handleClearLogs}
              className="rounded-lg border border-gray-300 px-3 py-1 text-xs
                         font-medium text-gray-600 transition hover:bg-gray-100"
            >
              Limpar histórico
            </button>
          )}
        </div>

        {logs.length === 0 ? (
          <p className="text-sm text-gray-400">Nenhuma análise realizada ainda.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="border-b text-xs uppercase text-gray-500">
                <tr>
                  <th className="px-2 py-2">Data/Hora</th>
                  <th className="px-2 py-2">Idade</th>
                  <th className="px-2 py-2">Renda</th>
                  <th className="px-2 py-2">Histórico</th>
                  <th className="px-2 py-2">Empréstimo</th>
                  <th className="px-2 py-2">Resultado</th>
                </tr>
              </thead>
              <tbody>
                {logs.map((log) => (
                  <tr key={log.id} className="border-b last:border-0">
                    <td className="px-2 py-2 whitespace-nowrap">
                      {new Date(log.dataHora).toLocaleString('pt-BR')}
                    </td>
                    <td className="px-2 py-2">{log.cliente.idade}</td>
                    <td className="px-2 py-2">
                      R${' '}
                      {log.cliente.rendaMensal.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-2 py-2 capitalize">
                      {log.cliente.historicoDividas}
                    </td>
                    <td className="px-2 py-2">
                      R${' '}
                      {log.cliente.valorEmprestimo.toLocaleString('pt-BR', {
                        minimumFractionDigits: 2,
                      })}
                    </td>
                    <td className="px-2 py-2">
                      <span
                        className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                          log.resultado.aprovado
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                        }`}
                      >
                        {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </main>
  );
}
