"use client";

/**
 * Página principal da aplicação de análise de crédito.
 * 
 * Integra o formulário de análise, o resultado e o histórico de logs
 * em uma única página com layout responsivo.
 */

import { useState } from "react";
import CreditForm from "@/components/CreditForm";
import AnalysisResult from "@/components/AnalysisResult";
import AnalysisLogs from "@/components/AnalysisLogs";
import { CreditFormData, CreditAnalysisResult } from "@/types";
import { analisarCredito } from "@/lib/creditAnalysis";
import { salvarLog } from "@/lib/logStorage";

export default function Home() {
  const [analysisResult, setAnalysisResult] = useState<CreditAnalysisResult | null>(null);

  /**
   * Handler chamado quando o formulário é enviado.
   * Realiza a análise de crédito e salva o log.
   * 
   * @param dados - Dados preenchidos pelo usuário no formulário
   */
  const handleAnalyze = (dados: CreditFormData) => {
    // Executa a lógica de análise de crédito
    const resultado = analisarCredito(dados);

    // Atualiza o estado para exibir o resultado na tela
    setAnalysisResult(resultado);

    // Salva o log da análise no LocalStorage
    salvarLog(dados, resultado);
  };

  return (
    <main className="main-container">
      {/* Cabeçalho da aplicação */}
      <header className="app-header">
        <h1 className="app-title">Análise de Crédito</h1>
        <p className="app-subtitle">
          Preencha os dados abaixo para solicitar uma análise de crédito
        </p>
      </header>

      {/* Layout em duas colunas: formulário + resultado à esquerda, logs à direita */}
      <div className="content-layout">
        {/* Coluna esquerda: Formulário e Resultado */}
        <div className="left-column">
          <CreditForm onSubmit={handleAnalyze} />
          <AnalysisResult result={analysisResult} />
        </div>

        {/* Coluna direita: Histórico de logs */}
        <div className="right-column">
          <AnalysisLogs />
        </div>
      </div>
    </main>
  );
}
