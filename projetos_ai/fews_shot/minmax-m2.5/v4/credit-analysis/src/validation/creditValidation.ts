import { CreditRequest, CreditResult } from "../types/credit";

const MINIMUM_AGE = 18;
const INSTALLMENTS = 12;
const MAX_INCOME_COMMITMENT = 0.30;

export function validateAge(age: number): boolean {
  return age >= MINIMUM_AGE;
}

export function validateIncomeCommitment(
  monthlyIncome: number,
  loanAmount: number
): boolean {
  const installmentAmount = loanAmount / INSTALLMENTS;
  const commitmentRatio = installmentAmount / monthlyIncome;
  return commitmentRatio <= MAX_INCOME_COMMITMENT;
}

export function validateDebtHistory(debtHistory: "clean" | "negative"): boolean {
  return debtHistory === "clean";
}

export function validateCreditRequest(request: CreditRequest): {
  valid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  if (!request.age || request.age < 0 || request.age > 120) {
    errors.push("Idade inválida");
  }

  if (!request.monthlyIncome || request.monthlyIncome <= 0) {
    errors.push("Renda mensal inválida");
  }

  if (!request.loanAmount || request.loanAmount <= 0) {
    errors.push("Valor do empréstimo inválido");
  }

  if (!request.debtHistory) {
    errors.push("Histórico de dívidas não selecionado");
  }

  return {
    valid: errors.length === 0,
    errors
  };
}