'use client';

import { CreditAnalysisResult, CreditApplication } from '@/types';
import { formatCurrency, formatPercentage } from '@/utils';
import styles from './ResultDisplay.module.css';

interface ResultDisplayProps {
  result: CreditAnalysisResult;
  application: CreditApplication;
}

export default function ResultDisplay({ result, application }: ResultDisplayProps) {
  return (
    <div className={`${styles.container} ${result.approved ? styles.approved : styles.rejected}`}>
      <div className={styles.header}>
        <h2 className={styles.title}>
          {result.approved ? 'Aprovado' : 'Reprovado'}
        </h2>
        <span className={`${styles.badge} ${result.approved ? styles.badgeApproved : styles.badgeRejected}`}>
          {result.approved ? 'Credito Aprovado' : 'Credito Reprovado'}
        </span>
      </div>

      <p className={styles.message}>{result.message}</p>

      <div className={styles.details}>
        <h3 className={styles.detailsTitle}>Detalhes da Analise</h3>
        
        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Valor Solicitado:</span>
          <span className={styles.detailValue}>{formatCurrency(application.loanAmount)}</span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Parcela Mensal (12x):</span>
          <span className={styles.detailValue}>
            {formatCurrency(result.details.installmentAmount)}
          </span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Percentual da Renda:</span>
          <span className={styles.detailValue}>
            {formatPercentage(result.details.installmentPercentage)}
          </span>
        </div>

        <div className={styles.detailItem}>
          <span className={styles.detailLabel}>Limite Permitido:</span>
          <span className={styles.detailValue}>
            {formatPercentage(result.details.maxAllowedPercentage)}
          </span>
        </div>

        <div className={styles.criteria}>
          <h4 className={styles.criteriaTitle}>Criterios Avaliados</h4>
          
          <div className={styles.criteriaList}>
            <div className={styles.criteriaItem}>
              <span className={`${styles.criteriaIcon} ${result.reasons.ageValid ? styles.iconValid : styles.iconInvalid}`}>
                {result.reasons.ageValid ? '✓' : '✗'}
              </span>
              <span>Idade minima (18 anos): {application.age} anos</span>
            </div>

            <div className={styles.criteriaItem}>
              <span className={`${styles.criteriaIcon} ${result.reasons.debtHistoryValid ? styles.iconValid : styles.iconInvalid}`}>
                {result.reasons.debtHistoryValid ? '✓' : '✗'}
              </span>
              <span>Historico: {application.debtHistory === 'limpo' ? 'Sem restricoes' : 'Com restricoes'}</span>
            </div>

            <div className={styles.criteriaItem}>
              <span className={`${styles.criteriaIcon} ${result.reasons.incomeValid ? styles.iconValid : styles.iconInvalid}`}>
                {result.reasons.incomeValid ? '✓' : '✗'}
              </span>
              <span>Comprometimento da renda dentro do limite</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
