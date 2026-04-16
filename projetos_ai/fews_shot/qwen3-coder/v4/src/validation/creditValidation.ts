/**
 * Camada de Validação
 * Responsável por validar os dados de entrada da aplicação de crédito
 */

import { CreditApplication, ValidationResult, ValidationError } from '@/domain/CreditAnalysis';

/**
 * Constantes de validação
 */
export const VALIDATION_CONSTANTS = {
  MIN_AGE: 18,
  MAX_AGE: 120,
  MIN_INCOME: 0,
  MAX_INSTALLMENT_PERCENTAGE: 30,
  INSTALLMENT_MONTHS: 12,
} as const;

/**
 * Valida se a idade está dentro do intervalo permitido
 */
export function validateAge(age: number | undefined): ValidationError | null {
  if (age === undefined || age === null || isNaN(age)) {
    return { field: 'age', message: 'Idade é obrigatória' };
  }
  if (age < VALIDATION_CONSTANTS.MIN_AGE) {
    return { field: 'age', message: `Idade deve ser maior ou igual a ${VALIDATION_CONSTANTS.MIN_AGE} anos` };
  }
  if (age > VALIDATION_CONSTANTS.MAX_AGE) {
    return { field: 'age', message: `Idade deve ser menor ou igual a ${VALIDATION_CONSTANTS.MAX_AGE} anos` };
  }
  return null;
}

/**
 * Valida se a renda mensal é válida
 */
export function validateMonthlyIncome(income: number | undefined): ValidationError | null {
  if (income === undefined || income === null || isNaN(income)) {
    return { field: 'monthlyIncome', message: 'Renda mensal é obrigatória' };
  }
  if (income < VALIDATION_CONSTANTS.MIN_INCOME) {
    return { field: 'monthlyIncome', message: 'Renda mensal não pode ser negativa' };
  }
  if (income === 0) {
    return { field: 'monthlyIncome', message: 'Renda mensal deve ser maior que zero' };
  }
  return null;
}

/**
 * Valida se o valor do empréstimo é válido
 */
export function validateLoanAmount(amount: number | undefined): ValidationError | null {
  if (amount === undefined || amount === null || isNaN(amount)) {
    return { field: 'loanAmount', message: 'Valor do empréstimo é obrigatório' };
  }
  if (amount <= 0) {
    return { field: 'loanAmount', message: 'Valor do empréstimo deve ser maior que zero' };
  }
  return null;
}

/**
 * Valida se o histórico de dívidas é válido
 */
export function validateDebtHistory(history: string | undefined): ValidationError | null {
  if (!history || history === '') {
    return { field: 'debtHistory', message: 'Histórico de dívidas é obrigatório' };
  }
  if (history !== 'clean' && history !== 'negative') {
    return { field: 'debtHistory', message: 'Histórico de dívidas deve ser "Limpo" ou "Negativado"' };
  }
  return null;
}

/**
 * Valida todos os campos de uma aplicação de crédito
 * @param application - Dados da aplicação de crédito
 * @returns Resultado da validação com lista de erros se houver
 */
export function validateCreditApplication(application: Partial<CreditApplication>): ValidationResult {
  const errors: ValidationError[] = [];

  const ageError = validateAge(application.age);
  if (ageError) errors.push(ageError);

  const incomeError = validateMonthlyIncome(application.monthlyIncome);
  if (incomeError) errors.push(incomeError);

  const loanError = validateLoanAmount(application.loanAmount);
  if (loanError) errors.push(loanError);

  const historyError = validateDebtHistory(application.debtHistory);
  if (historyError) errors.push(historyError);

  return {
    isValid: errors.length === 0,
    errors,
  };
}
