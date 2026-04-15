// Type definitions for credit analysis application

/**
 * Represents the credit analysis request data from the form
 */
export interface CreditAnalysisRequest {
  age: number;           // Client's age in years
  monthlyIncome: number; // Client's monthly income in BRL
  debtHistory: 'clean' | 'negative'; // Client's debt history status
  loanAmount: number;    // Requested loan amount in BRL
}

/**
 * Represents the credit analysis result
 */
export interface CreditAnalysisResult {
  approved: boolean;     // Whether the credit was approved
  message: string;       // Human-readable result message
  details: {
    isAdult: boolean;           // Age validation result
    installmentValue: number;   // Calculated monthly installment
    incomeCommitment: number;   // Percentage of income committed
    isWithinIncomeLimit: boolean; // Whether installment is within 30% limit
    hasCleanDebtHistory: boolean; // Whether client has clean debt history
  };
}

/**
 * Represents a credit analysis log entry
 */
export interface CreditAnalysisLog {
  id: string;            // Unique identifier for the log entry
  timestamp: string;     // ISO 8601 timestamp
  requestData: CreditAnalysisRequest; // Original request data
  result: CreditAnalysisResult;       // Analysis result
}
