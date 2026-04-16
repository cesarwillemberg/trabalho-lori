export type DebtHistory = 'limpo' | 'negativado';

export interface CreditApplication {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

export interface CreditAnalysisResult {
  approved: boolean;
  reasons: {
    ageValid: boolean;
    incomeValid: boolean;
    debtHistoryValid: boolean;
  };
  details: {
    installmentAmount: number;
    installmentPercentage: number;
    maxAllowedPercentage: number;
  };
  message: string;
}

export interface CreditAnalysisLog {
  id: string;
  timestamp: string;
  application: CreditApplication;
  result: CreditAnalysisResult;
}
