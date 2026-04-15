/**
 * Calculates the monthly installment value for a loan
 * @param loanAmount - The total loan amount in BRL
 * @param months - Number of installments (default: 12)
 * @returns The monthly installment value
 */
export function calculateInstallment(loanAmount: number, months: number = 12): number {
  // Divide the total loan amount by the number of months
  return loanAmount / months;
}

/**
 * Calculates what percentage of the monthly income is committed to the loan
 * @param installmentValue - The monthly installment value
 * @param monthlyIncome - The client's monthly income
 * @returns The percentage of income committed to the loan
 */
export function calculateIncomeCommitment(installmentValue: number, monthlyIncome: number): number {
  // Calculate the percentage of income that goes to the installment
  return (installmentValue / monthlyIncome) * 100;
}

/**
 * Checks if the installment value exceeds the maximum allowed percentage of income
 * @param installmentValue - The monthly installment value
 * @param monthlyIncome - The client's monthly income
 * @param maxPercentage - Maximum allowed percentage (default: 30%)
 * @returns true if the installment is within the limit, false if it exceeds
 */
export function isWithinIncomeLimit(installmentValue: number, monthlyIncome: number, maxPercentage: number = 30): boolean {
  const commitmentPercentage = calculateIncomeCommitment(installmentValue, monthlyIncome);
  return commitmentPercentage <= maxPercentage;
}
