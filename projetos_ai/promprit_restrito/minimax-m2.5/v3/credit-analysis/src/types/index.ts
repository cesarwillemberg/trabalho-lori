export interface CreditRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: 'clean' | 'negative';
  loanAmount: number;
}

export interface CreditResult {
  approved: boolean;
  installmentValue: number;
  installmentPercentage: number;
  reasons: string[];
}

export interface LogEntry {
  id: string;
  timestamp: string;
  request: CreditRequest;
  result: CreditResult;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}
