'use client';

import { useState } from 'react';
import CreditForm from '../components/CreditForm';
import LogHistory from '../components/LogHistory';
import { CreditAnalysisResult } from './types';

export default function Home() {
  const [lastResult, setLastResult] = useState<CreditAnalysisResult | null>(null);

  const handleAnalysisComplete = (result: CreditAnalysisResult) => {
    setLastResult(result);
  };

  return (
    <main className="main-container">
      <h1>Sistema de Análise de Crédito</h1>
      <div className="content-grid">
        <section className="form-section">
          <CreditForm onAnalysisComplete={handleAnalysisComplete} />
        </section>
        <section className="history-section">
          <LogHistory />
        </section>
      </div>
    </main>
  );
}