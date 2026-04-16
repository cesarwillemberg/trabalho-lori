/**
 * CAMADA DE SERVIÇO (Service Layer)
 * Contém a lógica de negócio para análise de crédito.
 * Não acessa penyimpanan diretamente - usa o Repository.
 */

import { CreditInput, ValidationError } from '../validation/creditValidation';
import { saveAnalysisLog } from '../repository/creditRepository';

export interface AnalysisResult {
  approved: boolean;
  installmentValue: number;
  incomePercentage: number;
  rejectionReasons: string[];
}

const INSTALLMENTS = 12;
const MAX_INCOME_PERCENTAGE = 30;

const calculateInstallment = (loanAmount: number): number => {
  return loanAmount / INSTALLMENTS;
};

const calculateIncomePercentage = (installment: number, income: number): number => {
  return (installment / income) * 100;
};

const checkMinimumAge = (age: number): boolean => {
  return age >= 18;
};

const checkInstallmentLimit = (percentage: number): boolean => {
  return percentage <= MAX_INCOME_PERCENTAGE;
};

const checkDebtHistory = (history: string): boolean => {
  return history === 'limpo';
};

const addAgeReason = (reasons: string[], age: number): string[] => {
  if (!checkMinimumAge(age)) {
    reasons.push('Cliente menor de 18 anos');
  }
  return reasons;
};

const addIncomeReason = (reasons: string[], percentage: number): string[] => {
  if (!checkInstallmentLimit(percentage)) {
    reasons.push('Parcela exceeds 30% da renda');
  }
  return reasons;
};

const addDebtReason = (reasons: string[], history: string): string[] => {
  if (!checkDebtHistory(history)) {
    reasons.push('Histórico negativado');
  }
  return reasons;
};

const createRejectionReasons = (
  input: CreditInput,
  percentage: number
): string[] => {
  let reasons: string[] = [];
  reasons = addAgeReason(reasons, input.age);
  reasons = addIncomeReason(reasons, percentage);
  reasons = addDebtReason(reasons, input.debtHistory);
  return reasons;
};

const buildLogEntry = (input: CreditInput, result: AnalysisResult): object => {
  return {
    timestamp: new Date().toISOString(),
    clientData: {
      age: input.age,
      monthlyIncome: input.monthlyIncome,
      debtHistory: input.debtHistory,
      loanAmount: input.loanAmount
    },
    result: result.approved ? 'Aprovado' : 'Reprovado',
    details: {
      installmentValue: result.installmentValue,
      incomePercentage: result.incomePercentage.toFixed(2),
      reasons: result.rejectionReasons
    }
  };
};

export const analyzeCredit = (input: CreditInput): AnalysisResult => {
  const installment = calculateInstallment(input.loanAmount);
  const percentage = calculateIncomePercentage(installment, input.monthlyIncome);
  
  const isApproved = 
    checkMinimumAge(input.age) &&
    checkInstallmentLimit(percentage) &&
    checkDebtHistory(input.debtHistory);

  const result: AnalysisResult = {
    approved: isApproved,
    installmentValue: installment,
    incomePercentage: percentage,
    rejectionReasons: isApproved ? [] : createRejectionReasons(input, percentage)
  };

  const logEntry = buildLogEntry(input, result);
  saveAnalysisLog(logEntry);

  return result;
};

export const processCreditAnalysis = (
  input: CreditInput,
  validationErrors: ValidationError[]
): AnalysisResult | null => {
  if (validationErrors.length > 0) return null;
  return analyzeCredit(input);
};