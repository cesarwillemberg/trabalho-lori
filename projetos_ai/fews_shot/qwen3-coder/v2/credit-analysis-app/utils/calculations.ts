export const FIXED_INSTALLMENTS = 12;

export function calculateMonthlyInstallment(
  loanAmount: number,
  months: number = FIXED_INSTALLMENTS
): number {
  if (months <= 0) {
    throw new Error('Numero de parcelas deve ser maior que zero');
  }
  return loanAmount / months;
}

export function calculateInstallmentPercentage(
  installmentAmount: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) {
    throw new Error('Renda mensal deve ser maior que zero');
  }
  return (installmentAmount / monthlyIncome) * 100;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${value.toFixed(2)}%`;
}
