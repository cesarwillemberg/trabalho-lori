/**
 * Regras de negócio para análise de crédito
 * Responsabilidade: Implementar as regras que determinam aprovação ou reprovação
 */

import {
  CreditApplication,
  CreditAnalysisResult,
  DebtHistory,
} from "../types";

const MINIMUM_AGE = 18;
const INSTALLMENT_MONTHS = 12;
const MAX_INSTALLMENT_PERCENTAGE = 30;

export function isAdult(age: number): boolean {
  return age >= MINIMUM_AGE;
}

export function calculateMonthlyInstallment(loanAmount: number): number {
  return loanAmount / INSTALLMENT_MONTHS;
}

export function calculateInstallmentPercentage(
  installment: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 100;
  return (installment / monthlyIncome) * 100;
}

export function isInstallmentAffordable(
  installment: number,
  monthlyIncome: number
): boolean {
  const percentage = calculateInstallmentPercentage(installment, monthlyIncome);
  return percentage <= MAX_INSTALLMENT_PERCENTAGE;
}

export function hasCleanDebtHistory(debtHistory: DebtHistory): boolean {
  return debtHistory === "limpo";
}

export function analyzeCredit(
  application: CreditApplication
): CreditAnalysisResult {
  const ageValid = isAdult(application.age);
  const monthlyInstallment = calculateMonthlyInstallment(application.loanAmount);
  const installmentValid = isInstallmentAffordable(
    monthlyInstallment,
    application.monthlyIncome
  );
  const debtHistoryValid = hasCleanDebtHistory(application.debtHistory);

  const allApproved = ageValid && installmentValid && debtHistoryValid;

  const result: CreditAnalysisResult = {
    approved: allApproved,
    message: allApproved ? "Crédito aprovado!" : "Crédito reprovado",
    reasons: {
      ageValid,
      installmentValid,
      debtHistoryValid,
    },
    details: {
      age: application.age,
      monthlyIncome: application.monthlyIncome,
      loanAmount: application.loanAmount,
      monthlyInstallment,
      installmentPercentage: calculateInstallmentPercentage(
        monthlyInstallment,
        application.monthlyIncome
      ),
      debtHistory: application.debtHistory,
    },
  };

  return result;
}
