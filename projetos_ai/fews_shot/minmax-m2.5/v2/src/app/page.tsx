'use client';

import { useState } from 'react';
import { CreditResult } from '../types/credit';
import CreditForm from '../components/CreditForm';
import CreditResultDisplay from '../components/CreditResult';
import CreditLogs from '../components/CreditLogs';

export default function Home() {
  const [result, setResult] = useState<CreditResult | null>(null);
  const [refreshLogs, setRefreshLogs] = useState(0);

  const handleResult = (newResult: CreditResult) => {
    setResult(newResult);
    setRefreshLogs((prev) => prev + 1);
  };

  return (
    <main className="main-container">
      <header className="header">
        <h1>Sistema de Análise de Crédito</h1>
        <p className="subtitle">Avalie a elegibilidade de clientes para empréstimos</p>
      </header>

      <div className="content-grid">
        <section className="form-section">
          <div className="card">
            <h2>Dados do Cliente</h2>
            <CreditForm onResult={handleResult} />
          </div>

          <div className="card">
            <h2>Resultado da Análise</h2>
            <CreditResultDisplay result={result} />
          </div>
        </section>

        <section className="logs-section">
          <div className="card">
            <CreditLogs refreshTrigger={refreshLogs} />
          </div>
        </section>
      </div>

      <footer className="footer">
        <p>Sistema de Análise de Crédito - Todos os direitos reservados</p>
      </footer>
    </main>
  );
}
