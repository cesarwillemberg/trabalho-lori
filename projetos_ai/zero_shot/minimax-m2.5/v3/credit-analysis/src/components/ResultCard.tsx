'use client';

import { CreditResult } from '@/lib/types';
import { formatCurrency } from '@/lib/creditAnalysis';

interface ResultCardProps {
  result: CreditResult;
}

export default function ResultCard({ result }: ResultCardProps) {
  const isApproved = result.approved;

  return (
    <div className={`result-card ${isApproved ? 'result-approved' : 'result-rejected'}`}>
      <div className="result-header">
        <span className={`result-icon ${isApproved ? 'icon-approved' : 'icon-rejected'}`}>
          {isApproved ? '✓' : '✗'}
        </span>
        <h3 className="result-title">
          {isApproved ? 'Crédito Aprovado!' : 'Crédito Reprovado'}
        </h3>
      </div>

      <div className="result-details">
        <div className="result-item">
          <span className="result-label">Valor da Parcela (12x):</span>
          <span className="result-value">{formatCurrency(result.installmentAmount)}</span>
        </div>
        <div className="result-item">
          <span className="result-label">Percentual da Renda:</span>
          <span className="result-value">{result.installmentPercentage}%</span>
        </div>
      </div>

      {!isApproved && result.reasons.length > 0 && (
        <div className="result-reasons">
          <h4 className="reasons-title">Motivos da Reprovação:</h4>
          <ul className="reasons-list">
            {result.reasons.map((reason, index) => (
              <li key={index} className="reason-item">
                • {reason}
              </li>
            ))}
          </ul>
        </div>
      )}

      {isApproved && (
        <div className="result-success">
          <p>Parabéns! Seu crédito foi aprovado. Todas as condições foram atendidas.</p>
        </div>
      )}
    </div>
  );
}