'use client';

/**
 * Componente de exibição do resultado da análise de crédito
 * Apresenta o status de aprovação com detalhes visuais
 */

import React from 'react';
import { AnalysisResult, ClientData } from '@/lib/types';
import { formatCurrency } from '@/lib/creditAnalysis';

interface ResultDisplayProps {
  result: AnalysisResult | null;
  clientData: ClientData | null;
}

export function ResultDisplay({ result, clientData }: ResultDisplayProps) {
  if (!result || !clientData) {
    return (
      <div className="result-container result-empty">
        <p className="result-empty-text">Preencha o formulário para analisar o crédito</p>
      </div>
    );
  }

  return (
    <div className={`result-container ${result.approved ? 'result-approved' : 'result-rejected'}`}>
      <div className="result-header">
        <span className={`result-badge ${result.approved ? 'badge-success' : 'badge-error'}`}>
          {result.approved ? 'APROVADO' : 'REPROVADO'}
        </span>
      </div>

      <div className="result-details">
        {clientData && (
          <div className="result-client-info">
            <h3 className="result-section-title">Dados do Cliente</h3>
            <div className="result-info-grid">
              <div className="result-info-item">
                <span className="result-label">Idade:</span>
                <span className="result-value">{clientData.age} anos</span>
              </div>
              <div className="result-info-item">
                <span className="result-label">Renda Mensal:</span>
                <span className="result-value">{formatCurrency(clientData.monthlyIncome)}</span>
              </div>
              <div className="result-info-item">
                <span className="result-label">Valor do Empréstimo:</span>
                <span className="result-value">{formatCurrency(clientData.loanAmount)}</span>
              </div>
              <div className="result-info-item">
                <span className="result-label">Histórico:</span>
                <span className={`result-value ${clientData.debtHistory === 'limpo' ? 'text-success' : 'text-error'}`}>
                  {clientData.debtHistory === 'limpo' ? 'Limpo' : 'Negativado'}
                </span>
              </div>
            </div>
          </div>
        )}

        <div className="result-analysis">
          <h3 className="result-section-title">Análise Técnica</h3>
          <div className="result-info-grid">
            <div className="result-info-item">
              <span className="result-label">Parcela Mensal (12x):</span>
              <span className="result-value">{formatCurrency(result.monthlyPayment)}</span>
            </div>
            <div className="result-info-item">
              <span className="result-label">% da Renda:</span>
              <span className={`result-value ${result.percentageOfIncome > 30 ? 'text-error' : 'text-success'}`}>
                {result.percentageOfIncome.toFixed(1)}%
              </span>
            </div>
          </div>
        </div>

        <div className="result-reasons">
          <h3 className="result-section-title">Detalhes da Análise</h3>
          <ul className="reasons-list">
            {result.reasons.map((reason, index) => (
              <li 
                key={index} 
                className={`reason-item ${result.approved ? 'reason-success' : 'reason-error'}`}
              >
                {reason}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}