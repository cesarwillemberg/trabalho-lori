import { CreditRequest, CreditResult } from '@/types';

const FIXED_INSTALLMENTS = 12;
const MAX_INSTALLMENT_PERCENTAGE = 30;

export function calculateInstallmentValue(loanAmount: number): number {
  return loanAmount / FIXED_INSTALLMENTS;
}

export function calculateInstallmentPercentage(installment: number, income: number): number {
  return (installment / income) * 100;
}

export function isIncomeCompromised(percentage: number): boolean {
  return percentage > MAX_INSTALLMENT_PERCENTAGE;
}

export function hasDebtRestrictions(history: string): boolean {
  return history === 'negative';
}

export function analyzeCredit(request: CreditRequest): CreditResult {
  const installment = calculateInstallmentValue(request.loanAmount);
  const percentage = calculateInstallmentPercentage(installment, request.monthlyIncome);
  const reasons: string[] = [];
  let approved = true;

  if (hasDebtRestrictions(request.debtHistory)) {
    reasons.push('Histórico de dívidas negativado');
    approved = false;
  }

  if (isIncomeCompromised(percentage)) {
    reasons.push('Parcela excede 30% da renda mensal');
    approved = false;
  }

  return {
    approved,
    installmentValue: installment,
    installmentPercentage: percentage,
    reasons
  };
}
