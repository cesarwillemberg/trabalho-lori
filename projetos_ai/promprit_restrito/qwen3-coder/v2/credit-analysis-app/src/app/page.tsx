'use client';

/**
 * Main Page (UI Layer)
 * 
 * Página principal da aplicação de análise de crédito.
 * Orquestra a interação entre os componentes UI e o Service layer.
 * 
 * Responsabilidades:
 * - Renderizar layout da página
 * - Coordenar fluxo de dados entre componentes
 * - Chamar Service layer para processamento
 * - Chamar Repository layer para persistência
 * 
 * NÃO contém lógica de negócio.
 */

import { useState, useEffect } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultDisplay from '@/components/ResultDisplay';
import LogsDisplay from '@/components/LogsDisplay';
import { CreditRequest, CreditResult, CreditLog } from '@/types/credit';
import { analisarCredito, criarLogAnalise } from '@/layers/service/creditService';
import { obterRepository } from '@/layers/repository/logRepository';

export default function Home() {
  const [resultado, setResultado] = useState<CreditResult | null>(null);
  const [logs, setLogs] = useState<CreditLog[]>([]);
  const [validationErrors, setValidationErrors] = useState<string[]>([]);

  useEffect(() => {
    const repository = obterRepository();
    setLogs(repository.obterTodos());
  }, []);

  const handleAnalisarCredito = (dados: CreditRequest) => {
    setValidationErrors([]);

    const resultadoAnalise: CreditResult = analisarCredito(dados);
    setResultado(resultadoAnalise);

    if (!resultadoAnalise.aprovado) {
      setValidationErrors(
        resultadoAnalise.motivo ? [resultadoAnalise.motivo] : []
      );
      return;
    }

    const log: CreditLog = criarLogAnalise(dados, resultadoAnalise);
    const repository = obterRepository();
    repository.salvar(log);
    setLogs(repository.obterTodos());
  };

  const handleLimparLogs = () => {
    const repository = obterRepository();
    repository.limpar();
    setLogs([]);
  };

  return (
    <main className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-center text-gray-800 mb-8">
          Análise de Crédito
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-6">
          <CreditForm
            onSubmit={handleAnalisarCredito}
            validationErrors={validationErrors}
          />
        </div>

        {resultado && resultado.aprovado && (
          <div className="mb-6">
            <ResultDisplay resultado={resultado} />
          </div>
        )}

        <LogsDisplay logs={logs} onLimpar={handleLimparLogs} />
      </div>
    </main>
  );
}
