/**
 * Tipos TypeScript para o sistema de análise de crédito
 * Define as estruturas de dados utilizadas na aplicação
 */

export type DebtHistory = 'limpo' | 'negativado';

export interface ClientData {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

export interface AnalysisResult {
  monthlyPayment: number;
  percentageOfIncome: number;
  approved: boolean;
  reasons: string[];
}

export interface CreditLog {
  id: string;
  timestamp: string;
  clientData: ClientData;
  analysis: AnalysisResult;
}

export interface CreditAnalysisInput {
  idade: number;
  rendaMensal: number;
  historicoDividas: DebtHistory;
  valorEmprestimo: number;
}

export interface ValidationError {
  field: string;
  message: string;
}