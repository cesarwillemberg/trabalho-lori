export type DebtHistory = 'limpo' | 'negativado';

export interface CreditAnalysisRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

export interface CreditAnalysisResult {
  approved: boolean;
  monthlyPayment: number;
  incomePercentage: number;
  reasons: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  request: CreditAnalysisRequest;
  result: CreditAnalysisResult;
}