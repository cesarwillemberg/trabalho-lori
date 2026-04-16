import { CreditApplication } from '@/types';

const MINIMUM_AGE = 18;

export function validateMinimumAge(age: number): boolean {
  return age >= MINIMUM_AGE;
}

export function validateDebtHistory(debtHistory: string): boolean {
  return debtHistory === 'limpo';
}

export function validateMonthlyIncome(
  loanAmount: number,
  monthlyIncome: number,
  installmentAmount: number
): boolean {
  const MAX_ALLOWED_PERCENTAGE = 0.30;
  const installmentPercentage = installmentAmount / monthlyIncome;
  return installmentPercentage <= MAX_ALLOWED_PERCENTAGE;
}

export function validateCreditApplication(application: CreditApplication): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (application.age < MINIMUM_AGE) {
    errors.push(`Idade minima: ${MINIMUM_AGE} anos`);
  }

  if (application.monthlyIncome <= 0) {
    errors.push('Renda mensal deve ser maior que zero');
  }

  if (application.loanAmount <= 0) {
    errors.push('Valor do emprestimo deve ser maior que zero');
  }

  if (!['limpo', 'negativado'].includes(application.debtHistory)) {
    errors.push('Historico de dividas invalido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
