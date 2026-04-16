'use client';

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultDisplay from '@/components/ResultDisplay';
import { CreditRequest, CreditAnalysisResult } from '@/types';
import { analisarCredito, gerarIdLog } from '@/services/creditService';
import { salvarLog, obterLogs } from '@/services/storageService';

export default function Home() {
  const [resultado, setResultado] = useState<CreditAnalysisResult | null>(null);
  const [carregando, setCarregando] = useState(false);
  const [erro, setErro] = useState<string | null>(null);

  const handleAnalise = async (dados: CreditRequest) => {
    setCarregando(true);
    setErro(null);

    try {
      const resultadoAnalise = analisarCredito(dados);
      setResultado(resultadoAnalise);

      const log = {
        id: gerarIdLog(),
        dataHora: resultadoAnalise.dataHora,
        dadosCliente: dados,
        resultado: resultadoAnalise,
      };

      salvarLog(log);
    } catch (err) {
      setErro('Ocorreu um erro ao processar a análise. Tente novamente.');
      console.error(err);
    } finally {
      setCarregando(false);
    }
  };

  const logs = typeof window !== 'undefined' ? obterLogs() : [];

  return (
    <main className="min-h-screen bg-gray-100 py-12 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Sistema de Análise de Crédito
          </h1>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Preencha os dados do cliente para verificar a elegibilidade para crédito.
            A análise considera idade, renda, histórico de dívidas e capacidade de pagamento.
          </p>
        </header>

        <div className="grid md:grid-cols-2 gap-8">
          <section className="bg-white rounded-xl shadow-lg p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Dados do Cliente
            </h2>
            <CreditForm onSubmit={handleAnalise} disabled={carregando} />
            {erro && (
              <div className="mt-4 p-4 bg-red-100 border border-red-400 rounded-lg text-red-700">
                {erro}
              </div>
            )}
          </section>

          <section className="space-y-6">
            <ResultDisplay resultado={resultado} />
          </section>
        </div>

        {logs.length > 0 && (
          <section className="mt-12 bg-white rounded-xl shadow-lg p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">
                Histórico de Análises
              </h2>
              <span className="text-sm text-gray-500">
                {logs.length} análise(s) realizada(s)
              </span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-200">
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Data/Hora
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Idade
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Renda
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Histórico
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Valor Emprestimo
                    </th>
                    <th className="text-left py-3 px-4 font-semibold text-gray-600">
                      Resultado
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {logs.map((log) => (
                    <tr
                      key={log.id}
                      className="border-b border-gray-100 hover:bg-gray-50"
                    >
                      <td className="py-3 px-4 text-sm text-gray-600">
                        {new Date(log.dataHora).toLocaleString('pt-BR')}
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {log.dadosCliente.idade} anos
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {log.dadosCliente.rendaMensal.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-medium ${
                            log.dadosCliente.historicoDividas === 'limpo'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                          }`}
                        >
                          {log.dadosCliente.historicoDividas}
                        </span>
                      </td>
                      <td className="py-3 px-4 text-sm text-gray-800">
                        {log.dadosCliente.valorEmprestimo.toLocaleString('pt-BR', {
                          style: 'currency',
                          currency: 'BRL',
                        })}
                      </td>
                      <td className="py-3 px-4 text-sm">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold ${
                            log.resultado.aprovado
                              ? 'bg-green-500 text-white'
                              : 'bg-red-500 text-white'
                          }`}
                        >
                          {log.resultado.aprovado ? 'APROVADO' : 'REPROVADO'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        )}

        <footer className="mt-12 text-center text-gray-500 text-sm">
          <p>
            Sistema de Análise de Crédito - Regras: Idade ≥ 18 anos, Parcela ≤ 30%
            da renda, Histórico limpo
          </p>
        </footer>
      </div>
    </main>
  );
}
