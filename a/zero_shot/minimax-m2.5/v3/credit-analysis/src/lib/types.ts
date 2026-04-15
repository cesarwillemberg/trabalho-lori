export interface CreditApplication {
  age: number;
  monthlyIncome: number;
  debtHistory: 'limpo' | 'negativado';
  loanAmount: number;
}

export interface CreditResult {
  approved: boolean;
  reasons: string[];
  installmentAmount: number;
  installmentPercentage: number;
  timestamp: string;
}

export interface LogEntry extends CreditApplication {
  id: string;
  result: CreditResult;
}

export interface ValidationError {
  field: string;
  message: string;
}