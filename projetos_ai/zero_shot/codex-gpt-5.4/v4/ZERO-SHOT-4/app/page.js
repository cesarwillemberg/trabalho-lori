"use client";

import { useState } from "react";
import CreditForm from "@/components/CreditForm";
import ResultCard from "@/components/ResultCard";
import LogsPanel from "@/components/LogsPanel";

const initialResult = null;

export default function HomePage() {
  const [result, setResult] = useState(initialResult);
  const [logs, setLogs] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState("");

  async function handleAnalyze(formData) {
    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/analyze", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const payload = await response.json();

      if (!response.ok) {
        throw new Error(payload.error || "Falha ao realizar a análise.");
      }

      setResult(payload.analysis);
      setLogs(payload.logs);
    } catch (requestError) {
      setError(requestError.message);
      setResult(null);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <main className="page-shell">
      <section className="hero">
        <div>
          <p className="eyebrow">Crédito Inteligente</p>
          <h1>Análise de crédito com decisão imediata</h1>
          <p className="hero-text">
            Informe os dados do cliente, aplique as regras de negócio e registre
            automaticamente cada avaliação em log.
          </p>
        </div>
      </section>

      <section className="grid">
        <CreditForm onSubmit={handleAnalyze} isSubmitting={isSubmitting} />
        <div className="side-column">
          <ResultCard result={result} error={error} />
          <LogsPanel logs={logs} />
        </div>
      </section>
    </main>
  );
}
