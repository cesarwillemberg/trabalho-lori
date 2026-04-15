export interface CreditRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: 'limpo' | 'negativado';
  loanAmount: number;
}

export interface CreditResult {
  approved: boolean;
  message: string;
  details: {
    ageValid: boolean;
    installmentValid: boolean;
    debtHistoryValid: boolean;
    installmentAmount: number;
    installmentPercentage: number;
  };
}

export interface CreditLog {
  id: string;
  timestamp: string;
  request: CreditRequest;
  result: CreditResult;
}

export interface ValidationError {
  field: string;
  message: string;
}
