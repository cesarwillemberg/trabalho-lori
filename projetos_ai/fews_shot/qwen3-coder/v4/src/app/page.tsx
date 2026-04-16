/**
 * Página Principal do Sistema de Análise de Crédito
 * Orquestra os componentes e gerencia o estado da aplicação
 */

'use client';

import { useState, useEffect, useCallback } from 'react';
import { CreditForm } from '@/components/CreditForm';
import { ResultCard } from '@/components/ResultCard';
import { LogTable } from '@/components/LogTable';
import { CreditApplication, CreditResult, AnalysisLog } from '@/domain/CreditAnalysis';
import { processCreditAnalysis } from '@/services/creditService';
import { createAnalysisLog } from '@/utils/logger';
import { getLogs, saveLog, clearAllLogs, exportLogsAsJson } from '@/repository/logRepository';
import styles from './page.module.css';

export default function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [currentResult, setCurrentResult] = useState<CreditResult | null>(null);
  const [currentClientData, setCurrentClientData] = useState<CreditApplication | null>(null);
  const [logs, setLogs] = useState<AnalysisLog[]>([]);

  useEffect(() => {
    setLogs(getLogs());
  }, []);

  const handleSubmit = useCallback(async (data: CreditApplication) => {
    setIsLoading(true);
    setCurrentResult(null);
    setCurrentClientData(null);

    await new Promise(resolve => setTimeout(resolve, 800));

    const result = processCreditAnalysis(data);

    const log = createAnalysisLog(data, result);
    saveLog(log);

    setCurrentResult(result);
    setCurrentClientData(data);
    setLogs(getLogs());
    setIsLoading(false);
  }, []);

  const handleClearLogs = useCallback(() => {
    if (confirm('Tem certeza que deseja limpar todo o histórico de análises?')) {
      clearAllLogs();
      setLogs([]);
      setCurrentResult(null);
      setCurrentClientData(null);
    }
  }, []);

  const handleExportLogs = useCallback(() => {
    const blob = exportLogsAsJson();
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `credit-analysis-logs-${new Date().toISOString().split('T')[0]}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  }, []);

  return (
    <div className={styles.container}>
      <div className={styles.intro}>
        <h1 className={styles.title}>Simulador de Análise de Crédito</h1>
        <p className={styles.subtitle}>
          Preencha os dados do cliente para verificar se o crédito pode ser aprovado.
          A análise considera idade, renda, valor da parcela e histórico financeiro.
        </p>
      </div>

      <div className={styles.grid}>
        <div className={styles.formSection}>
          <CreditForm onSubmit={handleSubmit} isLoading={isLoading} />
        </div>

        <div className={styles.resultSection}>
          <ResultCard result={currentResult} clientData={currentClientData} />
        </div>
      </div>

      <section className={styles.logsSection}>
        <LogTable
          logs={logs}
          onClear={handleClearLogs}
          onExport={handleExportLogs}
        />
      </section>

      <section className={styles.rules}>
        <h2 className={styles.rulesTitle}>Regras de Análise</h2>
        <div className={styles.rulesGrid}>
          <div className={styles.ruleCard}>
            <div className={styles.ruleIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <circle cx="12" cy="12" r="10" />
                <path d="M12 6v6l4 2" />
              </svg>
            </div>
            <h3 className={styles.ruleCardTitle}>Maior de Idade</h3>
            <p className={styles.ruleCardText}>
              O cliente deve ter <strong>18 anos ou mais</strong> para solicitar crédito.
            </p>
          </div>

          <div className={styles.ruleCard}>
            <div className={styles.ruleIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M12 2v20M17 5H9.5a3.5 3.5 0 000 7h5a3.5 3.5 0 010 7H6" />
              </svg>
            </div>
            <h3 className={styles.ruleCardTitle}>Parcela Máxima</h3>
            <p className={styles.ruleCardText}>
              A parcela mensal não pode comprometer mais de <strong>30%</strong> da renda.
            </p>
          </div>

          <div className={styles.ruleCard}>
            <div className={styles.ruleIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z" />
                <path d="M14 2v6h6M16 13H8M16 17H8M10 9H8" />
              </svg>
            </div>
            <h3 className={styles.ruleCardTitle}>Histórico Limpo</h3>
            <p className={styles.ruleCardText}>
              O cliente não pode estar <strong>negativado</strong> para aprovação.
            </p>
          </div>

          <div className={styles.ruleCard}>
            <div className={styles.ruleIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                <line x1="16" y1="2" x2="16" y2="6" />
                <line x1="8" y1="2" x2="8" y2="6" />
                <line x1="3" y1="10" x2="21" y2="10" />
              </svg>
            </div>
            <h3 className={styles.ruleCardTitle}>Parcelas Fixas</h3>
            <p className={styles.ruleCardText}>
              O empréstimo é calculado em <strong>12 parcelas fixas</strong> sem juros.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
