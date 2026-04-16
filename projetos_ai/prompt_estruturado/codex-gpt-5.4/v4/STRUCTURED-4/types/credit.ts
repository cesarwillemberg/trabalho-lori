export type DebtHistory = "limpo" | "negativado";
export type AnalysisStatus = "Aprovado" | "Reprovado";

export type AnalysisInput = {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  requestedLoanAmount: number;
};

export type AnalysisFormValues = {
  age: string;
  monthlyIncome: string;
  debtHistory: DebtHistory;
  requestedLoanAmount: string;
};

export type AnalysisResult = {
  status: AnalysisStatus;
  installmentAmount: number;
  incomeCommitmentPercent: number;
  clientData: AnalysisInput;
  reasons: string[];
};

export type AnalysisLogEntry = {
  id: string;
  createdAt: string;
  result: AnalysisResult;
};
