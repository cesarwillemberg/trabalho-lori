import { CreditRequest, ValidationResult } from '@/types';

const MIN_AGE = 18;
const MIN_INCOME = 0;
const MIN_LOAN_AMOUNT = 0;

export function validateAge(age: number): boolean {
  return age >= MIN_AGE;
}

export function validateIncome(income: number): boolean {
  return income > MIN_INCOME;
}

export function validateLoanAmount(amount: number): boolean {
  return amount > MIN_LOAN_AMOUNT;
}

export function validateDebtHistory(history: string): boolean {
  return history === 'clean' || history === 'negative';
}

export function validateCreditRequest(request: CreditRequest): ValidationResult {
  const errors: string[] = [];

  if (!validateAge(request.age)) {
    errors.push('Idade mínima é 18 anos');
  }

  if (!validateIncome(request.monthlyIncome)) {
    errors.push('Renda mensal deve ser maior que zero');
  }

  if (!validateLoanAmount(request.loanAmount)) {
    errors.push('Valor do empréstimo deve ser maior que zero');
  }

  if (!validateDebtHistory(request.debtHistory)) {
    errors.push('Histórico de dívidas inválido');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}
