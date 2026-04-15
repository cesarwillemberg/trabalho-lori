import { CreditAnalysisRequest, CreditAnalysisResult } from '@/types';

const FIXED_INSTALLMENTS = 12;
const MAX_INCOME_PERCENTAGE = 0.30;
const MINIMUM_AGE = 18;

export class CreditAnalysisService {
  static calculateMonthlyPayment(loanAmount: number): number {
    return loanAmount / FIXED_INSTALLMENTS;
  }

  static calculateIncomePercentage(monthlyPayment: number, monthlyIncome: number): number {
    if (monthlyIncome <= 0) return 0;
    return monthlyPayment / monthlyIncome;
  }

  static validateAge(age: number): boolean {
    return age >= MINIMUM_AGE;
  }

  static validateIncomePercentage(percentage: number): boolean {
    return percentage <= MAX_INCOME_PERCENTAGE;
  }

  static validateDebtHistory(debtHistory: string): boolean {
    return debtHistory === 'limpo';
  }

  static analyze(request: CreditAnalysisRequest): CreditAnalysisResult {
    const reasons: string[] = [];
    let approved = true;

    const isValidAge = this.validateAge(request.age);
    if (!isValidAge) {
      reasons.push(`Idade menor que ${MINIMUM_AGE} anos`);
      approved = false;
    }

    const monthlyPayment = this.calculateMonthlyPayment(request.loanAmount);
    const incomePercentage = this.calculateIncomePercentage(monthlyPayment, request.monthlyIncome);

    const isValidIncomePercentage = this.validateIncomePercentage(incomePercentage);
    if (!isValidIncomePercentage) {
      reasons.push(`Parcela (${(incomePercentage * 100).toFixed(2)}%) excede 30% da renda`);
      approved = false;
    }

    const isValidDebtHistory = this.validateDebtHistory(request.debtHistory);
    if (!isValidDebtHistory) {
      reasons.push('Histórico de dívidas negativado');
      approved = false;
    }

    if (approved) {
      reasons.push('Todas as condições atendidas');
    }

    return {
      approved,
      monthlyPayment: Math.round(monthlyPayment * 100) / 100,
      incomePercentage: Math.round(incomePercentage * 10000) / 100,
      reasons,
    };
  }
}