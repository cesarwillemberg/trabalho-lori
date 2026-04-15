'use client';

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import ResultCard from '@/components/ResultCard';
import LogList from '@/components/LogList';
import { ClientData, AnalysisResult, CreditLog } from '@/types';
import { analyzeCredit, generateId } from '@/lib/creditAnalysis';
import { saveLog } from '@/lib/storage';

export default function Home() {
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [clientData, setClientData] = useState<ClientData | null>(null);
  const [refreshTrigger, setRefreshTrigger] = useState(0);

  const handleAnalyze = (data: ClientData) => {
    const analysisResult = analyzeCredit(data);
    
    setClientData(data);
    setResult(analysisResult);

    const log: CreditLog = {
      id: generateId(),
      timestamp: new Date().toISOString(),
      clientData: data,
      analysisResult,
    };
    
    saveLog(log);
    setRefreshTrigger((prev) => prev + 1);
  };

  return (
    <div className="container">
      <header>
        <h1>Credit Analyzer</h1>
        <p>Sistema de Análise de Crédito</p>
      </header>
      
      <main className="main-content">
        <CreditForm onSubmit={handleAnalyze} />
        <ResultCard result={result} clientData={clientData} />
      </main>
      
      <LogList refreshTrigger={refreshTrigger} />
    </div>
  );
}
