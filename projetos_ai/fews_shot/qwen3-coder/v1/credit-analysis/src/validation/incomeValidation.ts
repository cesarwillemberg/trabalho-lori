/**
 * Validates if the monthly income is valid (positive and reasonable)
 * @param monthlyIncome - The client's monthly income in BRL
 * @returns true if the income is valid, false otherwise
 */
export function validateMonthlyIncome(monthlyIncome: number): boolean {
  // Income must be a positive number
  if (isNaN(monthlyIncome) || monthlyIncome <= 0) {
    return false;
  }
  
  return true;
}
