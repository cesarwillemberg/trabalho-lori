export interface CreditRequest {
  age: number;
  monthlyIncome: number;
  debtHistory: "clean" | "negative";
  loanAmount: number;
}

export interface CreditResult {
  approved: boolean;
  message: string;
  reasons?: string[];
}

export interface CreditLog {
  id: string;
  timestamp: string;
  request: CreditRequest;
  result: CreditResult;
}