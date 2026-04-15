'use client';

import { CreditResult } from '../types/credit';

interface CreditResultDisplayProps {
  result: CreditResult | null;
}

export default function CreditResultDisplay({ result }: CreditResultDisplayProps) {
  if (!result) {
    return (
      <div className="result-container result-empty">
        <p className="result-placeholder">Preencha o formulário e clique em "Analisar Crédito" para ver o resultado.</p>
      </div>
    );
  }

  return (
    <div className={`result-container ${result.approved ? 'approved' : 'rejected'}`}>
      <div className="result-header">
        <span className="result-icon">{result.approved ? '✓' : '✗'}</span>
        <h3>{result.approved ? 'APROVADO' : 'REPROVADO'}</h3>
      </div>
      
      <p className="result-message">{result.message}</p>
      
      <div className="result-details">
        <h4>Detalhes da Análise:</h4>
        <ul>
          <li className={result.details.ageValid ? 'valid' : 'invalid'}>
            <span className="check">{result.details.ageValid ? '✓' : '✗'}</span>
            Idade (mín. 18 anos): {result.details.ageValid ? 'OK' : 'Inválida'}
          </li>
          <li className={result.details.installmentValid ? 'valid' : 'invalid'}>
            <span className="check">{result.details.installmentValid ? '✓' : '✗'}</span>
            Parcela (máx. 30%): R$ {result.details.installmentAmount.toFixed(2)} ({result.details.installmentPercentage.toFixed(1)}%)
          </li>
          <li className={result.details.debtHistoryValid ? 'valid' : 'invalid'}>
            <span className="check">{result.details.debtHistoryValid ? '✓' : '✗'}</span>
            Histórico de dívidas: {result.details.debtHistoryValid ? 'Limpo' : 'Negativado'}
          </li>
        </ul>
      </div>
    </div>
  );
}
