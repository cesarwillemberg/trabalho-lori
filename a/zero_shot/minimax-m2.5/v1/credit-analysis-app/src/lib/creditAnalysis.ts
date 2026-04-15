import { CreditAnalysisInput, CreditAnalysisResult } from '@/types';

const MINIMUM_AGE = 18;
const MAX_INCOME_PERCENTAGE = 0.30;
const INSTALLMENTS = 12;

export function analyzeCredit(input: CreditAnalysisInput): CreditAnalysisResult {
  const installmentAmount = input.loanAmount / INSTALLMENTS;
  const incomePercentage = installmentAmount / input.monthlyIncome;

  const isAdult = input.age >= MINIMUM_AGE;
  const isIncomeValid = incomePercentage <= MAX_INCOME_PERCENTAGE;
  const isDebtHistoryClean = input.debtHistory === 'limpo';

  const approved = isAdult && isIncomeValid && isDebtHistoryClean;

  return {
    approved,
    reasons: {
      age: isAdult,
      income: isIncomeValid,
      debtHistory: isDebtHistoryClean,
    },
    installmentAmount,
    incomePercentage,
  };
}

export function validateInput(input: Partial<CreditAnalysisInput>): string | null {
  if (!input.age || input.age < 1) {
    return 'Idade inválida';
  }

  if (!input.monthlyIncome || input.monthlyIncome <= 0) {
    return 'Renda mensal inválida';
  }

  if (!input.loanAmount || input.loanAmount <= 0) {
    return 'Valor do empréstimo inválido';
  }

  if (!input.debtHistory) {
    return 'Selecione o histórico de dívidas';
  }

  return null;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return `${(value * 100).toFixed(1)}%`;
}

export function formatDate(dateString: string): string {
  const date = new Date(dateString);
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(date);
}