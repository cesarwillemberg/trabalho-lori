export type DebtHistory = 'limpo' | 'negativado';

export interface CreditAnalysisInput {
  age: number;
  monthlyIncome: number;
  debtHistory: DebtHistory;
  loanAmount: number;
}

export interface CreditAnalysisResult {
  approved: boolean;
  reasons: {
    age: boolean;
    income: boolean;
    debtHistory: boolean;
  };
  installmentAmount: number;
  incomePercentage: number;
}

export interface CreditLog {
  id: string;
  timestamp: string;
  age: number;
  monthlyIncome: number;
  loanAmount: number;
  debtHistory: DebtHistory;
  result: 'Aprovado' | 'Reprovado';
  reasons: CreditAnalysisResult['reasons'];
}