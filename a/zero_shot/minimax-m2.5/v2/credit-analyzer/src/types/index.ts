export interface ClientData {
  age: number;
  monthlyIncome: number;
  debtHistory: 'limpo' | 'negativado';
  loanAmount: number;
}

export interface AnalysisConditions {
  ageValid: boolean;
  installmentValid: boolean;
  debtHistoryValid: boolean;
}

export interface AnalysisResult {
  approved: boolean;
  conditions: AnalysisConditions;
  installmentValue: number;
  installmentPercentage: number;
}

export interface CreditLog {
  id: string;
  timestamp: string;
  clientData: ClientData;
  analysisResult: AnalysisResult;
}

export interface CreditAnalysisResponse {
  clientData: ClientData;
  result: AnalysisResult;
}
