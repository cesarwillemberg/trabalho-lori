import { CreditAnalysisRequest, CreditAnalysisResult, CreditAnalysisLog } from '../types/credit';
import { validateUserAge, validateMonthlyIncome, validateDebtHistory, validateLoanAmount } from '../validation';
import { calculateInstallment, isWithinIncomeLimit } from '../utils/calculation';
import { saveCreditAnalysisLog, generateLogId } from '../repository/creditAnalysisRepository';

/**
 * Service module for credit analysis business logic
 * Orchestrates validation, calculations, and persistence
 */

/**
 * Performs a complete credit analysis for a client
 * @param requestData - The client's credit application data
 * @returns The analysis result with approval status and details
 */
export function analyzeCredit(requestData: CreditAnalysisRequest): CreditAnalysisResult {
  // Step 1: Validate age - client must be 18 or older
  const isAdult = validateUserAge(requestData.age);
  
  // Step 2: Validate monthly income
  const isIncomeValid = validateMonthlyIncome(requestData.monthlyIncome);
  
  // Step 3: Validate debt history
  const isDebtHistoryValid = validateDebtHistory(requestData.debtHistory);
  
  // Step 4: Validate loan amount
  const isLoanAmountValid = validateLoanAmount(requestData.loanAmount);
  
  // If any basic validation fails, return rejected result
  if (!isAdult || !isIncomeValid || !isDebtHistoryValid || !isLoanAmountValid) {
    return {
      approved: false,
      message: 'Solicitação de crédito reprovada devido a dados inválidos',
      details: {
        isAdult,
        installmentValue: 0,
        incomeCommitment: 0,
        isWithinIncomeLimit: false,
        hasCleanDebtHistory: requestData.debtHistory === 'clean'
      }
    };
  }
  
  // Step 5: Calculate monthly installment (12 fixed installments)
  const installmentValue = calculateInstallment(requestData.loanAmount, 12);
  
  // Step 6: Check if installment exceeds 30% of monthly income
  const withinIncomeLimit = isWithinIncomeLimit(installmentValue, requestData.monthlyIncome, 30);
  
  // Step 7: Check if client has clean debt history
  const hasCleanDebtHistory = requestData.debtHistory === 'clean';
  
  // Step 8: Determine approval - all conditions must be met
  const approved = isAdult && withinIncomeLimit && hasCleanDebtHistory;
  
  // Step 9: Build result message
  const message = buildResultMessage(approved, {
    isAdult,
    withinIncomeLimit,
    hasCleanDebtHistory
  });
  
  // Step 10: Create result object
  const result: CreditAnalysisResult = {
    approved,
    message,
    details: {
      isAdult,
      installmentValue,
      incomeCommitment: (installmentValue / requestData.monthlyIncome) * 100,
      isWithinIncomeLimit: withinIncomeLimit,
      hasCleanDebtHistory
    }
  };
  
  return result;
}

/**
 * Performs credit analysis and logs the result
 * @param requestData - The client's credit application data
 * @returns Object containing the result and the log entry
 */
export function analyzeAndLogCredit(requestData: CreditAnalysisRequest): { result: CreditAnalysisResult; log: CreditAnalysisLog } {
  // Perform the analysis
  const result = analyzeCredit(requestData);
  
  // Create log entry
  const log: CreditAnalysisLog = {
    id: generateLogId(),
    timestamp: new Date().toISOString(),
    requestData,
    result
  };
  
  // Persist the log
  saveCreditAnalysisLog(log);
  
  return { result, log };
}

/**
 * Builds a human-readable result message
 * @param approved - Whether the credit was approved
 * @param conditions - The individual condition results
 * @returns A descriptive message
 */
function buildResultMessage(
  approved: boolean,
  conditions: { isAdult: boolean; withinIncomeLimit: boolean; hasCleanDebtHistory: boolean }
): string {
  if (approved) {
    return 'Crédito aprovado! Sua solicitação foi processada com sucesso.';
  }
  
  // Build specific rejection reasons
  const reasons: string[] = [];
  
  if (!conditions.isAdult) {
    reasons.push('Cliente deve ser maior de idade (18+ anos)');
  }
  
  if (!conditions.withinIncomeLimit) {
    reasons.push('Parcela compromete mais de 30% da renda mensal');
  }
  
  if (!conditions.hasCleanDebtHistory) {
    reasons.push('Cliente possui restrições no histórico de dívidas');
  }
  
  return `Crédito reprovado. Motivos: ${reasons.join('; ')}`;
}
