'use client';

import { useState } from 'react';
import { CreditForm, ResultDisplay, HistoryPanel } from '@/components';
import { CreditApplication, CreditAnalysisResult } from '@/types';
import styles from './page.module.css';

export default function Home() {
  const [result, setResult] = useState<CreditAnalysisResult | null>(null);
  const [application, setApplication] = useState<CreditApplication | null>(null);
  const [showHistory, setShowHistory] = useState<boolean>(false);

  const handleResult = (newResult: CreditAnalysisResult, newApplication: CreditApplication) => {
    setResult(newResult);
    setApplication(newApplication);
  };

  const handleNewAnalysis = () => {
    setResult(null);
    setApplication(null);
  };

  return (
    <main className={styles.main}>
      <header className={styles.header}>
        <h1 className={styles.title}>Analise de Credito</h1>
        <p className={styles.subtitle}>
          Sistema de avaliacao para concessao de credito
        </p>
      </header>

      <div className={styles.content}>
        <section className={styles.formSection}>
          {!result ? (
            <CreditForm onResult={handleResult} />
          ) : (
            <div className={styles.resultContainer}>
              <ResultDisplay result={result} application={application!} />
              
              <div className={styles.actionButtons}>
                <button 
                  className={styles.newAnalysisButton}
                  onClick={handleNewAnalysis}
                >
                  Nova Analise
                </button>
                <button 
                  className={styles.historyButton}
                  onClick={() => setShowHistory(!showHistory)}
                >
                  {showHistory ? 'Ocultar Historico' : 'Ver Historico'}
                </button>
              </div>
            </div>
          )}
        </section>

        {showHistory && (
          <section className={styles.historySection}>
            <HistoryPanel />
          </section>
        )}
      </div>

      <footer className={styles.footer}>
        <p>Regras: Idade minima 18 anos | Parcela maxima 30% da renda | Historico limpo</p>
      </footer>
    </main>
  );
}
