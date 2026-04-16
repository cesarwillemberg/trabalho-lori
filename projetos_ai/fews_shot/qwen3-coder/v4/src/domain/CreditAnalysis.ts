/**
 * Tipos e entidades do domínio de Análise de Crédito
 * Centraliza todas as interfaces e tipos usados na aplicação
 */

/**
 * Tipos de histórico de dívidas do cliente
 */
export type DebtHistory = 'clean' | 'negative';

/**
 * Interface que representa os dados de entrada para análise de crédito
 */
export interface CreditApplication {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

/**
 * Interface que representa os motivos de reprovação
 */
export interface RejectionReasons {
  isAdult: boolean;
  installmentPercentage: boolean;
  noRestrictions: boolean;
}

/**
 * Interface que representa o resultado da análise de crédito
 */
export interface CreditResult {
  approved: boolean;
  message: string;
  rejectionReasons: RejectionReasons;
  analysisDetails: {
    installmentAmount: number;
    installmentPercentageOfIncome: number;
    isAdult: boolean;
    hasRestrictions: boolean;
  };
}

/**
 * Interface que representa um registro de log de análise
 */
export interface AnalysisLog {
  id: string;
  timestamp: string;
  clientData: CreditApplication;
  result: CreditResult;
}

/**
 * Interface para erros de validação
 */
export interface ValidationError {
  field: string;
  message: string;
}

/**
 * Interface para resultado de validação
 */
export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}
