/**
 * Validates the debt history status
 * @param debtHistory - The client's debt history status ('clean' or 'negative')
 * @returns true if the debt history is valid, false otherwise
 */
export function validateDebtHistory(debtHistory: string): boolean {
  // Debt history must be one of the allowed values
  return debtHistory === 'clean' || debtHistory === 'negative';
}
