"use client";

import { FormEvent, useEffect, useState } from "react";
import type {
  CreditAnalysisLog,
  CreditAnalysisRequest,
  CreditAnalysisResponse,
  DebtHistoryStatus
} from "@/types/credit";

const initialForm: CreditAnalysisRequest = {
  age: 18,
  monthlyIncome: 0,
  debtHistory: "limpo",
  loanAmount: 0
};

export function CreditAnalysisForm() {
  const [formData, setFormData] = useState<CreditAnalysisRequest>(initialForm);
  const [result, setResult] = useState<CreditAnalysisResponse["result"] | null>(
    null
  );
  const [logs, setLogs] = useState<CreditAnalysisLog[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingLogs, setLoadingLogs] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadLogs = async () => {
      try {
        const response = await fetch("/api/credit-analysis");
        const data = (await response.json()) as { logs?: CreditAnalysisLog[] };

        if (!response.ok) {
          throw new Error("Não foi possível carregar o histórico.");
        }

        setLogs(data.logs ?? []);
      } catch (loadError) {
        setError(
          loadError instanceof Error
            ? loadError.message
            : "Não foi possível carregar o histórico."
        );
      } finally {
        setLoadingLogs(false);
      }
    };

    void loadLogs();
  }, []);

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await fetch("/api/credit-analysis", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });

      const data = (await response.json()) as
        | CreditAnalysisResponse
        | { message: string };

      if (!response.ok || !("result" in data)) {
        throw new Error(
          "message" in data
            ? data.message
            : "Falha ao executar a análise de crédito."
        );
      }

      setResult(data.result);
      setLogs(data.logs);
    } catch (submitError) {
      setResult(null);
      setError(
        submitError instanceof Error
          ? submitError.message
          : "Falha ao executar a análise de crédito."
      );
    } finally {
      setLoading(false);
    }
  };

  const updateNumberField = (
    field: "age" | "monthlyIncome" | "loanAmount",
    value: string
  ) => {
    setFormData((current) => ({
      ...current,
      [field]: Number(value)
    }));
  };

  const updateDebtHistory = (value: DebtHistoryStatus) => {
    setFormData((current) => ({
      ...current,
      debtHistory: value
    }));
  };

  return (
    <div className="panel panel-grid">
      <form className="panel-grid" onSubmit={handleSubmit}>
        <div className="form-grid">
          <div className="field">
            <label htmlFor="age">Idade</label>
            <input
              id="age"
              min="0"
              name="age"
              type="number"
              value={formData.age}
              onChange={(event) =>
                updateNumberField("age", event.currentTarget.value)
              }
            />
            <small>O cliente precisa ter 18 anos ou mais.</small>
          </div>

          <div className="field">
            <label htmlFor="monthlyIncome">Renda mensal</label>
            <input
              id="monthlyIncome"
              min="0"
              name="monthlyIncome"
              step="0.01"
              type="number"
              value={formData.monthlyIncome}
              onChange={(event) =>
                updateNumberField("monthlyIncome", event.currentTarget.value)
              }
            />
            <small>Usada para calcular o limite de comprometimento.</small>
          </div>

          <div className="field">
            <label htmlFor="debtHistory">Histórico de dívidas</label>
            <select
              id="debtHistory"
              name="debtHistory"
              value={formData.debtHistory}
              onChange={(event) =>
                updateDebtHistory(event.currentTarget.value as DebtHistoryStatus)
              }
            >
              <option value="limpo">Limpo</option>
              <option value="negativado">Negativado</option>
            </select>
            <small>Clientes negativados não são aprovados.</small>
          </div>

          <div className="field">
            <label htmlFor="loanAmount">Valor do empréstimo</label>
            <input
              id="loanAmount"
              min="0"
              name="loanAmount"
              step="0.01"
              type="number"
              value={formData.loanAmount}
              onChange={(event) =>
                updateNumberField("loanAmount", event.currentTarget.value)
              }
            />
            <small>O valor será dividido em 12 parcelas fixas.</small>
          </div>
        </div>

        <button className="submit-button" disabled={loading} type="submit">
          {loading ? "Analisando..." : "Analisar crédito"}
        </button>
      </form>

      {error ? <div className="error-state">{error}</div> : null}

      {result ? (
        <section className="result-card">
          <span>Resultado da análise</span>
          <strong
            className={
              result.approved ? "result-approved" : "result-rejected"
            }
          >
            {result.approved ? "Aprovado" : "Reprovado"}
          </strong>
          <div>Parcela estimada: R$ {result.installment.toFixed(2)}</div>
          <div>
            Comprometimento da renda:{" "}
            {result.incomeCommitmentPercentage.toFixed(2)}%
          </div>
          <div>{result.message}</div>
          {result.reasons.length > 0 ? (
            <ul className="reason-list">
              {result.reasons.map((reason) => (
                <li key={reason}>{reason}</li>
              ))}
            </ul>
          ) : null}
        </section>
      ) : null}

      <section className="panel-grid">
        <div>
          <h2>Últimas análises</h2>
          <p>
            Cada envio registra data, dados informados e o resultado da
            avaliação.
          </p>
        </div>

        {loadingLogs ? (
          <div className="empty-state">Carregando histórico...</div>
        ) : logs.length === 0 ? (
          <div className="empty-state">
            Nenhuma análise registrada até o momento.
          </div>
        ) : (
          <div className="history-grid">
            {logs.map((log) => (
              <article className="history-card" key={log.id}>
                <header>
                  <strong>{new Date(log.analyzedAt).toLocaleString("pt-BR")}</strong>
                  <span
                    className={`status-pill ${
                      log.result.approved
                        ? "status-approved"
                        : "status-rejected"
                    }`}
                  >
                    {log.result.approved ? "Aprovado" : "Reprovado"}
                  </span>
                </header>

                <dl>
                  <div>
                    <dt>Idade</dt>
                    <dd>{log.customer.age} anos</dd>
                  </div>
                  <div>
                    <dt>Renda mensal</dt>
                    <dd>R$ {log.customer.monthlyIncome.toFixed(2)}</dd>
                  </div>
                  <div>
                    <dt>Histórico</dt>
                    <dd>{log.customer.debtHistory}</dd>
                  </div>
                  <div>
                    <dt>Empréstimo</dt>
                    <dd>R$ {log.customer.loanAmount.toFixed(2)}</dd>
                  </div>
                </dl>
              </article>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
