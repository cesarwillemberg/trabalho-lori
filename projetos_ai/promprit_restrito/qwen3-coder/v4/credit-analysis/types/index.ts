export interface CreditRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: 'limpo' | 'negativado';
  loanAmount: number;
}

export interface CreditResult {
  approved: boolean;
  installmentValue: number;
  incomePercentage: number;
  reason?: string;
}

export interface LogEntry {
  id: string;
  timestamp: string;
  request: CreditRequest;
  result: CreditResult;
}

export interface ValidationError {
  field: string;
  message: string;
}