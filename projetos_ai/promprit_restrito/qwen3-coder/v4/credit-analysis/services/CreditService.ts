import { CreditRequest, CreditResult } from '@/types';

const INSTALLMENTS = 12;
const MAX_INCOME_PERCENTAGE = 30;

export function calculateInstallment(loanAmount: number): number {
  return loanAmount / INSTALLMENTS;
}

export function calculateIncomePercentage(installment: number, income: number): number {
  return (installment / income) * 100;
}

export function isInstallmentWithinLimit(percentage: number): boolean {
  return percentage <= MAX_INCOME_PERCENTAGE;
}

export function hasCleanDebtHistory(debtHistory: string): boolean {
  return debtHistory === 'limpo';
}

export function isAdult(age: number): boolean {
  return age >= 18;
}

export function createApprovedResult(installment: number, percentage: number): CreditResult {
  return {
    approved: true,
    installmentValue: installment,
    incomePercentage: percentage,
  };
}

export function createRejectedResult(reason: string): CreditResult {
  return {
    approved: false,
    installmentValue: 0,
    incomePercentage: 0,
    reason,
  };
}

export function analyzeCredit(request: CreditRequest): CreditResult {
  if (!isAdult(request.age)) {
    return createRejectedResult('Cliente menor de 18 anos');
  }
  
  if (!hasCleanDebtHistory(request.debtHistory)) {
    return createRejectedResult('Histórico de dívidas negativado');
  }
  
  const installment = calculateInstallment(request.loanAmount);
  const percentage = calculateIncomePercentage(installment, request.monthlyIncome);
  
  if (!isInstallmentWithinLimit(percentage)) {
    return createRejectedResult('Parcela compromete mais de 30% da renda');
  }
  
  return createApprovedResult(installment, percentage);
}