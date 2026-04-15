"use client";

import { useState } from "react";
import { analyzeCredit } from "@/lib/credit-analysis";
import { saveAnalysisLog } from "@/lib/log-storage";
import { formatCurrency, formatDateTime } from "@/lib/formatters";
import type {
  AnalysisFormValues,
  AnalysisLogEntry,
  AnalysisResult
} from "@/types/credit";

const INITIAL_FORM: AnalysisFormValues = {
  age: "",
  monthlyIncome: "",
  debtHistory: "limpo",
  requestedLoanAmount: ""
};

export function CreditAnalysisCard() {
  const [formValues, setFormValues] = useState<AnalysisFormValues>(INITIAL_FORM);
  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [logs, setLogs] = useState<AnalysisLogEntry[]>([]);

  const handleInputChange =
    (field: keyof AnalysisFormValues) =>
    (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
      setFormValues((current) => ({
        ...current,
        [field]: event.target.value
      }));
    };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const analysis = analyzeCredit({
      age: Number(formValues.age),
      monthlyIncome: Number(formValues.monthlyIncome),
      debtHistory: formValues.debtHistory,
      requestedLoanAmount: Number(formValues.requestedLoanAmount)
    });

    const newLog = saveAnalysisLog(analysis);

    setResult(analysis);
    setLogs((current) => [newLog, ...current].slice(0, 10));
  };

  return (
    <section className="card-grid">
      <div className="panel form-panel">
        <h2 className="section-title">Dados do cliente</h2>
        <p className="section-text">
          A análise considera 12 parcelas fixas e aprova o crédito apenas quando
          todas as condições forem atendidas.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-grid">
            <div className="field">
              <label htmlFor="age">Idade</label>
              <input
                id="age"
                min="0"
                name="age"
                onChange={handleInputChange("age")}
                placeholder="Ex.: 29"
                required
                type="number"
                value={formValues.age}
              />
            </div>

            <div className="field">
              <label htmlFor="monthlyIncome">Renda mensal</label>
              <input
                id="monthlyIncome"
                min="0"
                name="monthlyIncome"
                onChange={handleInputChange("monthlyIncome")}
                placeholder="Ex.: 4500"
                required
                step="0.01"
                type="number"
                value={formValues.monthlyIncome}
              />
            </div>

            <div className="field">
              <label htmlFor="debtHistory">Histórico de dívidas</label>
              <select
                id="debtHistory"
                name="debtHistory"
                onChange={handleInputChange("debtHistory")}
                value={formValues.debtHistory}
              >
                <option value="limpo">Limpo</option>
                <option value="negativado">Negativado</option>
              </select>
            </div>

            <div className="field">
              <label htmlFor="requestedLoanAmount">Valor do empréstimo</label>
              <input
                id="requestedLoanAmount"
                min="0"
                name="requestedLoanAmount"
                onChange={handleInputChange("requestedLoanAmount")}
                placeholder="Ex.: 12000"
                required
                step="0.01"
                type="number"
                value={formValues.requestedLoanAmount}
              />
            </div>

            <div className="field field-full">
              <small>
                O sistema registra localmente a data, os dados enviados e o
                resultado de cada análise.
              </small>
            </div>
          </div>

          <button className="submit-button" type="submit">
            Avaliar crédito
          </button>
        </form>
      </div>

      <div className="panel result-panel">
        <h2 className="section-title">Resultado da análise</h2>
        <p className="section-text">
          Veja a decisão, os números calculados e os últimos registros salvos no
          navegador.
        </p>

        {result ? <AnalysisResultView result={result} /> : <EmptyResult />}

        <div className="log-header">
          <h3>Últimas análises</h3>
          <p className="section-text">
            Os registros ficam armazenados em <code>localStorage</code>.
          </p>
        </div>

        {logs.length > 0 ? <AnalysisLogList logs={logs} /> : <EmptyLog />}
      </div>
    </section>
  );
}

function AnalysisResultView({ result }: { result: AnalysisResult }) {
  const isApproved = result.status === "Aprovado";

  return (
    <>
      <span className={`status-pill ${isApproved ? "approved" : "rejected"}`}>
        {result.status}
      </span>

      <div className="result-box">
        <h3>{result.status}</h3>

        <div className="metrics">
          <div className="metric-item">
            <strong>Parcela mensal</strong>
            <span>{formatCurrency(result.installmentAmount)}</span>
          </div>
          <div className="metric-item">
            <strong>Comprometimento da renda</strong>
            <span>{result.incomeCommitmentPercent.toFixed(2)}%</span>
          </div>
          <div className="metric-item">
            <strong>Histórico informado</strong>
            <span>{result.clientData.debtHistory}</span>
          </div>
        </div>

        <div className="reasons">
          {result.reasons.map((reason) => (
            <p key={reason}>{reason}</p>
          ))}
        </div>
      </div>
    </>
  );
}

function AnalysisLogList({ logs }: { logs: AnalysisLogEntry[] }) {
  return (
    <div className="log-list">
      {logs.map((log) => (
        <article className="log-item" key={log.id}>
          <strong>
            {log.result.status} em {formatDateTime(log.createdAt)}
          </strong>
          <span>
            Cliente de {log.result.clientData.age} anos, renda de{" "}
            {formatCurrency(log.result.clientData.monthlyIncome)} e empréstimo de{" "}
            {formatCurrency(log.result.clientData.requestedLoanAmount)}.
          </span>
        </article>
      ))}
    </div>
  );
}

function EmptyResult() {
  return (
    <div className="result-box">
      <p className="result-empty">
        Nenhuma análise realizada ainda. Preencha o formulário para visualizar o
        resultado entre <strong>Aprovado</strong> ou <strong>Reprovado</strong>.
      </p>
    </div>
  );
}

function EmptyLog() {
  return (
    <p className="log-empty">
      Nenhum log salvo ainda. Os registros aparecerão aqui após o envio do
      formulário.
    </p>
  );
}
