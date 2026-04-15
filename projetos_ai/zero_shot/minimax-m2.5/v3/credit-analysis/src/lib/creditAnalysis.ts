import { CreditApplication, CreditResult, LogEntry, ValidationError } from './types';

const INSTALLMENTS = 12;
const MAX_INCOME_PERCENTAGE = 0.30;

export function validateApplication(data: CreditApplication): ValidationError[] {
  const errors: ValidationError[] = [];

  if (!data.age || data.age < 1) {
    errors.push({ field: 'age', message: 'Idade é obrigatória' });
  } else if (data.age < 18) {
    errors.push({ field: 'age', message: 'Cliente deve ter pelo menos 18 anos' });
  }

  if (!data.monthlyIncome || data.monthlyIncome <= 0) {
    errors.push({ field: 'monthlyIncome', message: 'Renda mensal é obrigatória' });
  }

  if (!data.debtHistory) {
    errors.push({ field: 'debtHistory', message: 'Histórico de dívidas é obrigatório' });
  }

  if (!data.loanAmount || data.loanAmount <= 0) {
    errors.push({ field: 'loanAmount', message: 'Valor do empréstimo é obrigatório' });
  }

  return errors;
}

export function analyzeCredit(data: CreditApplication): CreditResult {
  const reasons: string[] = [];
  const installmentAmount = data.loanAmount / INSTALLMENTS;
  const installmentPercentage = installmentAmount / data.monthlyIncome;

  if (data.age < 18) {
    reasons.push('Menor de idade');
  }

  if (installmentPercentage > MAX_INCOME_PERCENTAGE) {
    reasons.push('Parcela exceeds 30% da renda');
  }

  if (data.debtHistory === 'negativado') {
    reasons.push('Histórico negativado');
  }

  const approved = reasons.length === 0;

  return {
    approved,
    reasons,
    installmentAmount,
    installmentPercentage: Math.round(installmentPercentage * 100),
    timestamp: new Date().toISOString()
  };
}

export function createLogEntry(data: CreditApplication, result: CreditResult): LogEntry {
  return {
    ...data,
    id: generateId(),
    result
  };
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(value);
}

export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  }).format(new Date(dateString));
}