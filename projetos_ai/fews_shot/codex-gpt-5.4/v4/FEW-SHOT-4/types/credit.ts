export type DebtHistoryStatus = "limpo" | "negativado";

export type CreditAnalysisRequest = {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistoryStatus;
  loanAmount: number;
};

export type CreditAnalysisResult = {
  approved: boolean;
  installment: number;
  incomeCommitmentPercentage: number;
  message: string;
  reasons: string[];
};

export type CreditAnalysisLog = {
  id: string;
  analyzedAt: string;
  customer: CreditAnalysisRequest;
  result: CreditAnalysisResult;
};

export type CreditAnalysisResponse = {
  result: CreditAnalysisResult;
  logs: CreditAnalysisLog[];
};
