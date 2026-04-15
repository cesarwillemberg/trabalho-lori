import { ClientData, AnalysisResult } from '@/types';

const MIN_AGE = 18;
const MAX_INSTALLMENT_PERCENTAGE = 30;
const INSTALLMENTS = 12;

export function analyzeCredit(clientData: ClientData): AnalysisResult {
  const installmentValue = clientData.loanAmount / INSTALLMENTS;
  const installmentPercentage = (installmentValue / clientData.monthlyIncome) * 100;

  const ageValid = clientData.age >= MIN_AGE;
  const installmentValid = installmentPercentage <= MAX_INSTALLMENT_PERCENTAGE;
  const debtHistoryValid = clientData.debtHistory === 'limpo';

  const approved = ageValid && installmentValid && debtHistoryValid;

  return {
    approved,
    conditions: {
      ageValid,
      installmentValid,
      debtHistoryValid,
    },
    installmentValue,
    installmentPercentage,
  };
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

export function formatPercentage(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'percent',
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value / 100);
}

export function formatDate(date: Date | string): string {
  const d = typeof date === 'string' ? new Date(date) : date;
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(d);
}

export function generateId(): string {
  return crypto.randomUUID();
}
