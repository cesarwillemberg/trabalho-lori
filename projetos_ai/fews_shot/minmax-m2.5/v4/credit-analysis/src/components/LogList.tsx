"use client";

import { useEffect, useState } from "react";
import { CreditLog } from "@/types/credit";
import { getAllLogs, clearLogs } from "@/repository/logRepository";

export default function LogList() {
  const [logs, setLogs] = useState<CreditLog[]>([]);

  useEffect(() => {
    setLogs(getAllLogs());
  }, []);

  const handleRefresh = () => {
    setLogs(getAllLogs());
  };

  const handleClear = () => {
    clearLogs();
    setLogs([]);
  };

  const formatDate = (timestamp: string) => {
    return new Date(timestamp).toLocaleString("pt-BR", {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit"
    });
  };

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL"
    }).format(value);
  };

  if (logs.length === 0) {
    return (
      <div className="log-section">
        <h2>Histórico de Análises</h2>
        <p className="no-logs">Nenhuma análise realizada ainda.</p>
      </div>
    );
  }

  return (
    <div className="log-section">
      <div className="log-header">
        <h2>Histórico de Análises</h2>
        <div className="log-actions">
          <button onClick={handleRefresh} className="refresh-btn">
            Atualizar
          </button>
          <button onClick={handleClear} className="clear-btn">
            Limpar
          </button>
        </div>
      </div>

      <div className="log-list">
        {logs.map((log) => (
          <div
            key={log.id}
            className={`log-item ${log.result.approved ? "approved" : "declined"}`}
          >
            <div className="log-timestamp">{formatDate(log.timestamp)}</div>
            <div className="log-details">
              <span>Idade: {log.request.age} anos</span>
              <span>Renda: {formatCurrency(log.request.monthlyIncome)}</span>
              <span>Empréstimo: {formatCurrency(log.request.loanAmount)}</span>
              <span>Histórico: {log.request.debtHistory === "clean" ? "Limpo" : "Negativado"}</span>
            </div>
            <div className="log-result">
              {log.result.approved ? "Aprovado" : "Reprovado"}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}