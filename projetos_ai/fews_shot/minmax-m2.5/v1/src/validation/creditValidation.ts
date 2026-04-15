/**
 * Módulo de Validação para Análise de Crédito
 * Responsável por validar os campos do formulário de crédito
 */

export interface CreditFormData {
  age: number;
  monthlyIncome: number;
  debtHistory: string;
  loanAmount: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export function validateCreditForm(data: CreditFormData): ValidationResult {
  const errors: string[] = [];

  if (!data.age || data.age < 1) {
    errors.push("Idade é obrigatória");
  } else if (data.age < 18) {
    errors.push("O cliente deve ter pelo menos 18 anos");
  }

  if (!data.monthlyIncome || data.monthlyIncome <= 0) {
    errors.push("Renda mensal é obrigatória e deve ser maior que zero");
  }

  if (!data.debtHistory) {
    errors.push("Histórico de dívidas é obrigatório");
  } else if (data.debtHistory !== "limpo" && data.debtHistory !== "negativado") {
    errors.push("Histórico de dívidas deve ser 'limpo' ou 'negativado'");
  }

  if (!data.loanAmount || data.loanAmount <= 0) {
    errors.push("Valor do empréstimo é obrigatório e deve ser maior que zero");
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}

export function validateUserAge(age: number): boolean {
  return age >= 18;
}

export function validateMonthlyIncome(income: number): boolean {
  return income > 0;
}

export function validateDebtHistory(history: string): boolean {
  return history === "limpo";
}

export function validateLoanAmount(amount: number): boolean {
  return amount > 0;
}