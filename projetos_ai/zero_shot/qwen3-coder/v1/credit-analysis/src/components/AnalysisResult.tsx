/**
 * Componente que exibe o resultado da análise de crédito.
 * 
 * Mostra se o crédito foi "Aprovado" ou "Reprovado",
 * junto com detalhes como valor da parcela e percentual comprometido.
 */

import { CreditAnalysisResult } from "@/types";

interface AnalysisResultProps {
  /** Resultado da análise a ser exibido */
  result: CreditAnalysisResult | null;
}

export default function AnalysisResult({ result }: AnalysisResultProps) {
  // Não exibe nada se ainda não houve análise
  if (!result) return null;

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
    <div className={`result-card ${result.aprovado ? "approved" : "rejected"}`}>
      {/* Ícone e título do resultado */}
      <div className="result-header">
        <span className="result-icon">{result.aprovado ? "✓" : "✗"}</span>
        <h2 className="result-title">
          {result.aprovado ? "Crédito Aprovado!" : "Crédito Reprovado"}
        </h2>
      </div>

      {/* Detalhes da análise */}
      <div className="result-details">
        <div className="detail-row">
          <span className="detail-label">Número de parcelas:</span>
          <span className="detail-value">{result.numeroParcelas}x</span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Valor de cada parcela:</span>
          <span className="detail-value">
            {formatCurrency(result.valorParcela)}
          </span>
        </div>
        <div className="detail-row">
          <span className="detail-label">Renda comprometida:</span>
          <span className="detail-value">
            {(result.percentualComprometido * 100).toFixed(1)}%
          </span>
        </div>
      </div>

      {/* Motivos de reprovação (se houver) */}
      {result.motivosReprovacao.length > 0 && (
        <div className="rejection-reasons">
          <h3 className="reasons-title">Motivos da reprovação:</h3>
          <ul className="reasons-list">
            {result.motivosReprovacao.map((motivo, index) => (
              <li key={index} className="reason-item">
                {motivo}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}
