import { CreditRequest, ValidationError } from '../types/credit';

const MIN_AGE = 18;
const MAX_AGE = 150;
const MIN_INCOME = 0;
const MIN_LOAN_AMOUNT = 100;

export function validateCreditRequest(request: CreditRequest): ValidationError[] {
  const errors: ValidationError[] = [];

  if (request.age < MIN_AGE || request.age > MAX_AGE || !Number.isInteger(request.age)) {
    errors.push({
      field: 'age',
      message: `Idade deve ser entre ${MIN_AGE} e ${MAX_AGE} anos`,
    });
  }

  if (request.monthlyIncome < MIN_INCOME) {
    errors.push({
      field: 'monthlyIncome',
      message: 'Renda mensal deve ser maior que zero',
    });
  }

  if (request.debtHistory !== 'limpo' && request.debtHistory !== 'negativado') {
    errors.push({
      field: 'debtHistory',
      message: 'Histórico de dívidas deve ser "limpo" ou "negativado"',
    });
  }

  if (request.loanAmount < MIN_LOAN_AMOUNT) {
    errors.push({
      field: 'loanAmount',
      message: `Valor do empréstimo deve ser pelo menos R$ ${MIN_LOAN_AMOUNT}`,
    });
  }

  return errors;
}

export function validateAge(age: number): boolean {
  return age >= MIN_AGE;
}

export function validateMonthlyIncome(income: number): boolean {
  return income > MIN_INCOME;
}

export function validateDebtHistory(history: 'limpo' | 'negativado'): boolean {
  return history === 'limpo';
}

export function validateInstallmentPercentage(percentage: number): boolean {
  return percentage <= 30;
}
