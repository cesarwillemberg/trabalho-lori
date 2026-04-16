export type DebtHistory = "limpo" | "negativado";

export interface CreditApplication {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

export interface CreditAnalysisResult {
  approved: boolean;
  message: string;
  reasons: {
    ageValid: boolean;
    installmentValid: boolean;
    debtHistoryValid: boolean;
  };
  details: {
    age: number;
    monthlyIncome: number;
    loanAmount: number;
    monthlyInstallment: number;
    installmentPercentage: number;
    debtHistory: DebtHistory;
  };
}

export interface CreditLogEntry {
  id: string;
  timestamp: string;
  application: CreditApplication;
  result: CreditAnalysisResult;
  createdAt: string;
}
