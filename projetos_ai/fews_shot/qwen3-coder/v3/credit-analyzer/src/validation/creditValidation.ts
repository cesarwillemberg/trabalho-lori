/**
 * Validação de dados de entrada para análise de crédito
 * Responsabilidade: Validar formato e valores permitidos dos campos do formulário
 */

import { CreditApplication, DebtHistory } from "../types";

const DEBT_HISTORY_VALUES: DebtHistory[] = ["limpo", "negativado"];

export function validateAge(age: unknown): { valid: boolean; error?: string } {
  if (age === undefined || age === null || age === "") {
    return { valid: false, error: "Idade é obrigatória" };
  }

  const ageNumber = Number(age);

  if (isNaN(ageNumber)) {
    return { valid: false, error: "Idade deve ser um número" };
  }

  if (ageNumber < 0 || ageNumber > 150) {
    return { valid: false, error: "Idade deve estar entre 0 e 150 anos" };
  }

  return { valid: true };
}

export function validateMonthlyIncome(
  income: unknown
): { valid: boolean; error?: string } {
  if (income === undefined || income === null || income === "") {
    return { valid: false, error: "Renda mensal é obrigatória" };
  }

  const incomeNumber = Number(income);

  if (isNaN(incomeNumber)) {
    return { valid: false, error: "Renda mensal deve ser um número" };
  }

  if (incomeNumber < 0) {
    return { valid: false, error: "Renda mensal não pode ser negativa" };
  }

  return { valid: true };
}

export function validateLoanAmount(
  amount: unknown
): { valid: boolean; error?: string } {
  if (amount === undefined || amount === null || amount === "") {
    return { valid: false, error: "Valor do empréstimo é obrigatório" };
  }

  const amountNumber = Number(amount);

  if (isNaN(amountNumber)) {
    return { valid: false, error: "Valor do empréstimo deve ser um número" };
  }

  if (amountNumber <= 0) {
    return { valid: false, error: "Valor do empréstimo deve ser maior que zero" };
  }

  return { valid: true };
}

export function validateDebtHistory(
  history: unknown
): { valid: boolean; error?: string } {
  if (history === undefined || history === null || history === "") {
    return { valid: false, error: "Histórico de dívidas é obrigatório" };
  }

  if (!DEBT_HISTORY_VALUES.includes(history as DebtHistory)) {
    return {
      valid: false,
      error: `Histórico de dívidas deve ser: ${DEBT_HISTORY_VALUES.join(" ou ")}`,
    };
  }

  return { valid: true };
}

export function validateCreditApplication(
  data: Partial<CreditApplication>
): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  const ageResult = validateAge(data.age);
  if (!ageResult.valid && ageResult.error) {
    errors.age = ageResult.error;
  }

  const incomeResult = validateMonthlyIncome(data.monthlyIncome);
  if (!incomeResult.valid && incomeResult.error) {
    errors.monthlyIncome = incomeResult.error;
  }

  const loanResult = validateLoanAmount(data.loanAmount);
  if (!loanResult.valid && loanResult.error) {
    errors.loanAmount = loanResult.error;
  }

  const debtResult = validateDebtHistory(data.debtHistory);
  if (!debtResult.valid && debtResult.error) {
    errors.debtHistory = debtResult.error;
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors,
  };
}
