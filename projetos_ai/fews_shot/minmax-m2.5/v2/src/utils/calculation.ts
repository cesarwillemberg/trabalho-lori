export function calculateInstallment(amount: number, months: number): number {
  return amount / months;
}

export function calculateInstallmentPercentage(
  installmentAmount: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 100;
  return (installmentAmount / monthlyIncome) * 100;
}
