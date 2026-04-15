/**
 * Validates the loan amount
 * @param loanAmount - The requested loan amount in BRL
 * @returns true if the loan amount is valid, false otherwise
 */
export function validateLoanAmount(loanAmount: number): boolean {
  // Loan amount must be a positive number
  if (isNaN(loanAmount) || loanAmount <= 0) {
    return false;
  }
  
  return true;
}
