import type { DebtHistoryStatus } from "@/types/credit";

export function validateUserAge(age: number): boolean {
  return age >= 18;
}

export function validateMonthlyIncome(monthlyIncome: number): boolean {
  return Number.isFinite(monthlyIncome) && monthlyIncome > 0;
}

export function validateLoanAmount(loanAmount: number): boolean {
  return Number.isFinite(loanAmount) && loanAmount > 0;
}

export function validateDebtHistory(debtHistory: DebtHistoryStatus): boolean {
  return debtHistory === "limpo";
}
