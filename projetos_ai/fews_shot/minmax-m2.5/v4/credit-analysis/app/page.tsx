"use client";

import { useState } from "react";
import CreditForm from "@/components/CreditForm";
import ResultCard from "@/components/ResultCard";
import LogList from "@/components/LogList";
import { CreditResult } from "@/types/credit";

export default function Home() {
  const [result, setResult] = useState<CreditResult | null>(null);

  const handleResult = (newResult: CreditResult) => {
    setResult(newResult);
  };

  return (
    <div className="container">
      <header className="header">
        <h1>Análise de Crédito</h1>
        <p>Sistema de avaliação de crédito para clientes</p>
      </header>

      <main className="main-content">
        <section className="form-section">
          <h2>Solicitação de Crédito</h2>
          <CreditForm onResult={handleResult} />
        </section>

        {result && (
          <section className="result-section">
            <h2>Resultado da Análise</h2>
            <ResultCard result={result} />
          </section>
        )}

        <LogList />
      </main>

      <footer className="footer">
        <p>Sistema de Análise de Crédito © 2026</p>
      </footer>
    </div>
  );
}