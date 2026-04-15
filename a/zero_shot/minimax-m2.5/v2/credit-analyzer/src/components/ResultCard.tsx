'use client';

import { AnalysisResult, ClientData } from '@/types';
import { formatCurrency, formatPercentage } from '@/lib/creditAnalysis';

interface ResultCardProps {
  result: AnalysisResult | null;
  clientData: ClientData | null;
}

export default function ResultCard({ result, clientData }: ResultCardProps) {
  if (!result || !clientData) {
    return (
      <div className="card result-card">
        <div className="placeholder-icon">📋</div>
        <p className="placeholder-text">
          Preencha o formulário e clique em &quot;Analisar Crédito&quot; para ver o resultado
        </p>
      </div>
    );
  }

  const { approved, conditions, installmentValue, installmentPercentage } = result;

  return (
    <div className={`card result-card animate-in`}>
      <div className={`result-icon ${approved ? 'approved animate-icon' : 'rejected'}`}>
        {approved ? '✓' : '✕'}
      </div>
      
      <h2 className={`result-title ${approved ? 'approved' : 'rejected'}`}>
        {approved ? 'Crédito Aprovado' : 'Crédito Reprovado'}
      </h2>
      
      <p className="result-subtitle">
        {approved 
          ? 'Parabéns! Seu crédito foi aprovado conforme os critérios de análise.'
          : 'Infelizmente, o crédito não foi aprovado. Verifique os motivos abaixo.'}
      </p>
      
      <div className="conditions-list">
        <div className="condition-item">
          <span className="condition-label">Idade (mín. 18 anos)</span>
          <span className={`condition-value ${conditions.ageValid ? 'valid' : 'invalid'}`}>
            {conditions.ageValid ? '✓ Validado' : '✕ Inválido'}
          </span>
        </div>
        
        <div className="condition-item">
          <span className="condition-label">Parcela (máx. 30% da renda)</span>
          <span className={`condition-value ${conditions.installmentValid ? 'valid' : 'invalid'}`}>
            {conditions.installmentValid 
              ? `✓ ${formatPercentage(installmentPercentage)}` 
              : `✕ ${formatPercentage(installmentPercentage)}`}
          </span>
        </div>
        
        <div className="condition-item">
          <span className="condition-label">Histórico de Dívidas</span>
          <span className={`condition-value ${conditions.debtHistoryValid ? 'valid' : 'invalid'}`}>
            {conditions.debtHistoryValid ? '✓ Limpo' : '✕ Negativado'}
          </span>
        </div>
        
        <div className="condition-item">
          <span className="condition-label">Valor da Parcela (12x)</span>
          <span className="condition-value" style={{ color: 'var(--text)' }}>
            {formatCurrency(installmentValue)}
          </span>
        </div>
      </div>
    </div>
  );
}
