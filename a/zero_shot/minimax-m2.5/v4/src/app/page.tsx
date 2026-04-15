'use client';

/**
 * Página principal do sistema de análise de crédito
 * Componha todos os componentes da aplicação
 */

import React, { useState } from 'react';
import { CreditForm } from '@/components/CreditForm';
import { ResultDisplay } from '@/components/ResultDisplay';
import { LogHistory } from '@/components/LogHistory';
import { AnalysisResult, ClientData } from '@/lib/types';

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const handleResult = (analysisResult: AnalysisResult, client: ClientData) => {
    setResult(analysisResult);
    setClientData(client);
  };

  const handleSubmit = () => {
    setRefreshKey(prev => prev + 1);
  };

  return (
    <div className="page-container">
      <header className="page-header">
        <h1 className="page-title">Sistema de Análise de Crédito</h1>
        <p className="page-subtitle">Avaliação de crédito para Empréstimos Pessoais</p>
      </header>

      <main className="page-main">
        <section className="form-section">
          <CreditForm 
            onResult={handleResult}
            onSubmit={handleSubmit}
          />
        </section>

        <section className="result-section">
          <ResultDisplay 
            result={result}
            clientData={clientData}
          />
        </section>

        <section className="history-section">
          <LogHistory key={refreshKey} />
        </section>
      </main>

      <footer className="page-footer">
        <p>Credit Analyzer v1.0 | Sistema de Análise de Crédito</p>
      </footer>
    </div>
  );
}