'use client'

import { CreditResult } from '../business/creditAnalyzer'

interface ResultDisplayProps {
  result: CreditResult
}

export default function ResultDisplay({ result }: ResultDisplayProps) {
  return (
    <div className={`result ${result.approved ? 'approved' : 'rejected'}`}>
      <h2>{result.approved ? 'Aprovado' : 'Reprovado'}</h2>
      <p>
        {result.approved
          ? 'Parabéns! Seu crédito foi aprovado.'
          : 'Infelizmente, seu crédito não foi aprovado.'}
      </p>

      <div className="details">
        <p>
          <strong>Valor da parcela:</strong>{' '}
          {result.installmentValue.toLocaleString('pt-BR', {
            style: 'currency',
            currency: 'BRL',
          })}
        </p>
        <p>
          <strong>Parcela da renda:</strong> {result.installmentPercentage.toFixed(1)}%
        </p>

        {result.reasons.length > 0 && (
          <>
            <hr style={{ margin: '1rem 0', border: 'none', borderTop: '1px solid rgba(0,0,0,0.1)' }} />
            <p><strong>Motivos:</strong></p>
            {result.reasons.map((reason, index) => (
              <p key={index} style={{ marginLeft: '0.5rem' }}>
                • {reason}
              </p>
            ))}
          </>
        )}
      </div>
    </div>
  )
}
