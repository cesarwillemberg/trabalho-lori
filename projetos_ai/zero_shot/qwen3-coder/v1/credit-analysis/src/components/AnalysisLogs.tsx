"use client";

/**
 * Componente que exibe o histórico de logs de análises de crédito.
 * 
 * Mostra uma tabela com data/hora, dados do cliente e resultado
 * de cada análise realizada. Permite limpar o histórico.
 */

import { useState, useEffect } from "react";
import { AnalysisLog } from "@/types";
import { obterLogs, limparLogs } from "@/lib/logStorage";

export default function AnalysisLogs() {
  const [logs, setLogs] = useState<AnalysisLog[]>([]);

  /** Carrega os logs do LocalStorage quando o componente monta */
  useEffect(() => {
    setLogs(obterLogs());
  }, []);

  /**
   * Limpa todos os logs e atualiza o estado.
   */
  const handleClearLogs = () => {
    if (confirm("Tem certeza que deseja limpar todo o histórico de análises?")) {
      limparLogs();
      setLogs([]);
    }
  };

  /**
   * Formata um valor numérico para o padrão monetário brasileiro.
   */
  const formatCurrency = (value: number): string => {
    return value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });
  };

  return (
    <div className="logs-section">
      <div className="logs-header">
        <h2 className="logs-title">Histórico de Análises</h2>
        {logs.length > 0 && (
          <button onClick={handleClearLogs} className="clear-button">
            Limpar Histórico
          </button>
        )}
      </div>

      {logs.length === 0 ? (
        <p className="no-logs-message">Nenhuma análise realizada ainda.</p>
      ) : (
        <div className="logs-container">
          {logs.map((log) => (
            <div key={log.id} className="log-card">
              {/* Data e hora da análise */}
              <div className="log-date">{log.dataHora}</div>

              {/* Dados do cliente */}
              <div className="log-data">
                <div className="log-row">
                  <span className="log-label">Idade:</span>
                  <span>{log.dadosCliente.idade} anos</span>
                </div>
                <div className="log-row">
                  <span className="log-label">Renda:</span>
                  <span>{formatCurrency(log.dadosCliente.rendaMensal)}</span>
                </div>
                <div className="log-row">
                  <span className="log-label">Histórico:</span>
                  <span
                    className={
                      log.dadosCliente.historicoDividas === "limpo"
                        ? "status-clean"
                        : "status-bad"
                    }
                  >
                    {log.dadosCliente.historicoDividas === "limpo"
                      ? "Limpo"
                      : "Negativado"}
                  </span>
                </div>
                <div className="log-row">
                  <span className="log-label">Empréstimo:</span>
                  <span>
                    {formatCurrency(log.dadosCliente.valorEmprestimo)}
                  </span>
                </div>
              </div>

              {/* Resultado da análise */}
              <div
                className={`log-result ${log.resultado.aprovado ? "result-approved" : "result-rejected"}`}
              >
                {log.resultado.aprovado ? "Aprovado" : "Reprovado"}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
