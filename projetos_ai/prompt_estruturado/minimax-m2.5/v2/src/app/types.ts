export interface CreditAnalysisRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: 'clean' | 'negative';
  loanAmount: number;
}

export interface CreditAnalysisResult {
  approved: boolean;
  monthlyInstallment: number;
  installmentPercentage: number;
  reasons: string[];
}

export interface CreditLog {
  id: string;
  timestamp: string;
  request: CreditAnalysisRequest;
  result: CreditAnalysisResult;
}