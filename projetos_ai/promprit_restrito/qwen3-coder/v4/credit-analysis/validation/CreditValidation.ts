import { CreditRequest, ValidationError } from '@/types';

const MIN_AGE = 18;
const MIN_INCOME = 0;
const MIN_LOAN = 1;

export function validateAge(age: number): ValidationError | null {
  if (isNaN(age) || age < MIN_AGE) {
    return { field: 'age', message: `Idade deve ser maior ou igual a ${MIN_AGE} anos` };
  }
  return null;
}

export function validateIncome(income: number): ValidationError | null {
  if (isNaN(income) || income <= MIN_INCOME) {
    return { field: 'monthlyIncome', message: 'Renda mensal deve ser maior que zero' };
  }
  return null;
}

export function validateLoanAmount(amount: number): ValidationError | null {
  if (isNaN(amount) || amount < MIN_LOAN) {
    return { field: 'loanAmount', message: 'Valor do empréstimo deve ser maior que zero' };
  }
  return null;
}

export function validateDebtHistory(history: string): ValidationError | null {
  if (history !== 'limpo' && history !== 'negativado') {
    return { field: 'debtHistory', message: 'Histórico de dívidas inválido' };
  }
  return null;
}

export function validateCreditRequest(request: CreditRequest): ValidationError[] {
  const errors: ValidationError[] = [];
  
  const ageError = validateAge(request.age);
  const incomeError = validateIncome(request.monthlyIncome);
  const loanError = validateLoanAmount(request.loanAmount);
  const debtError = validateDebtHistory(request.debtHistory);
  
  if (ageError) errors.push(ageError);
  if (incomeError) errors.push(incomeError);
  if (loanError) errors.push(loanError);
  if (debtError) errors.push(debtError);
  
  return errors;
}