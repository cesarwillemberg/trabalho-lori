/**
 * Componente de Resultado da Análise
 * Exibe o resultado da análise de crédito com detalhes
 */

import { CreditResult, CreditApplication } from '@/domain/CreditAnalysis';
import { formatCurrency, formatPercentage } from '@/utils/logger';
import styles from './ResultCard.module.css';

interface ResultCardProps {
  result: CreditResult | null;
  clientData: CreditApplication | null;
}

export default function ResultCard({ result, clientData }: ResultCardProps) {
  if (!result || !clientData) {
    return (
      <div className={styles.container}>
        <div className={styles.placeholder}>
          <div className={styles.placeholderIcon}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="1.5">
              <path d="M9 12l2 2 4-4" />
              <circle cx="12" cy="12" r="10" />
            </svg>
          </div>
          <p className={styles.placeholderText}>
            Preencha o formulário e clique em "Analisar Crédito" para ver o resultado
          </p>
        </div>
      </div>
    );
  }

  const { analysisDetails, rejectionReasons } = result;

  return (
    <div className={styles.container}>
      <div className={`${styles.card} ${result.approved ? styles.approved : styles.rejected}`}>
        <div className={styles.header}>
          <div className={`${styles.icon} ${result.approved ? styles.iconApproved : styles.iconRejected}`}>
            {result.approved ? (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M20 6L9 17l-5-5" />
              </svg>
            ) : (
              <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5">
                <path d="M18 6L6 18M6 6l12 12" />
              </svg>
            )}
          </div>
          <h3 className={styles.title}>
            {result.approved ? 'Crédito Aprovado!' : 'Crédito Reprovado'}
          </h3>
        </div>

        <div className={styles.details}>
          <h4 className={styles.detailsTitle}>Detalhes da Análise</h4>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Idade:</span>
            <span className={`${styles.detailValue} ${rejectionReasons.isAdult ? styles.success : styles.error}`}>
              {clientData.age} anos
              {rejectionReasons.isAdult && <span className={styles.check}>✓</span>}
              {!rejectionReasons.isAdult && <span className={styles.cross}>✗</span>}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Renda Mensal:</span>
            <span className={styles.detailValue}>
              {formatCurrency(clientData.monthlyIncome)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Valor do Empréstimo:</span>
            <span className={styles.detailValue}>
              {formatCurrency(clientData.loanAmount)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Valor da Parcela (12x):</span>
            <span className={`${styles.detailValue} ${styles.installment}`}>
              {formatCurrency(analysisDetails.installmentAmount)}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>% da Renda:</span>
            <span className={`${styles.detailValue} ${rejectionReasons.installmentPercentage ? styles.success : styles.error}`}>
              {formatPercentage(analysisDetails.installmentPercentageOfIncome)}
              {rejectionReasons.installmentPercentage && <span className={styles.check}>✓</span>}
              {!rejectionReasons.installmentPercentage && <span className={styles.cross}>✗</span>}
            </span>
          </div>

          <div className={styles.detailItem}>
            <span className={styles.detailLabel}>Histórico de Dívidas:</span>
            <span className={`${styles.detailValue} ${rejectionReasons.noRestrictions ? styles.success : styles.error}`}>
              {clientData.debtHistory === 'clean' ? 'Limpo' : 'Negativado'}
              {rejectionReasons.noRestrictions && <span className={styles.check}>✓</span>}
              {!rejectionReasons.noRestrictions && <span className={styles.cross}>✗</span>}
            </span>
          </div>
        </div>

        {!result.approved && (
          <div className={styles.reasons}>
            <h4 className={styles.reasonsTitle}>Motivos da Reprovação:</h4>
            <ul className={styles.reasonsList}>
              {!rejectionReasons.isAdult && (
                <li>Cliente menor de 18 anos</li>
              )}
              {!rejectionReasons.noRestrictions && (
                <li>Cliente possui restrições financeiras (negativado)</li>
              )}
              {!rejectionReasons.installmentPercentage && (
                <li>Parcela compromete mais de 30% da renda mensal</li>
              )}
            </ul>
          </div>
        )}

        <div className={styles.footer}>
          <p className={styles.footerText}>
            {result.approved
              ? 'Parabéns! Sua análise de crédito foi aprovada.'
              : 'Infelizmente, não foi possível aprovar o crédito neste momento.'}
          </p>
        </div>
      </div>
    </div>
  );
}
