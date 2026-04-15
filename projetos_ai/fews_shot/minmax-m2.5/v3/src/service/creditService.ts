// src/service/creditService.ts
// Responsável pela lógica de negócio de análise de crédito

import { validateCreditForm } from '../validation/creditValidation';
import { calculateInstallment, calculateIncomeRatio, isWithinLimit } from '../utils/calculation';
import { logData } from '../utils/logger';

const CREDIT_LOGS_KEY = 'credit_analysis_logs';

export interface CreditAnalysisData {
  age: number;
  monthlyIncome: number;
  loanAmount: number;
  debtHistory: string;
}

export interface CreditAnalysisResult {
  approved: boolean;
  message: string;
  details: {
    isAdult: boolean;
    incomeRatio: number;
    isWithinLimit: boolean;
    hasCleanDebtHistory: boolean;
    installmentValue: number;
  };
  timestamp: string;
  clientData: CreditAnalysisData;
}

export interface AnalysisLog {
  timestamp: string;
  clientData: CreditAnalysisData;
  result: {
    approved: boolean;
    message: string;
  };
}

export function analyzeCredit(data: CreditAnalysisData): CreditAnalysisResult {
  const validation = validateCreditForm(data);

  if (!validation.isValid) {
    const result: CreditAnalysisResult = {
      approved: false,
      message: `Dados inválidos: ${validation.errors.join(', ')}`,
      details: {
        isAdult: false,
        incomeRatio: 0,
        isWithinLimit: false,
        hasCleanDebtHistory: false,
        installmentValue: 0
      },
      timestamp: new Date().toISOString(),
      clientData: data
    };

    logAnalysis(result);
    return result;
  }

  const isAdult = data.age >= 18;
  const installmentValue = calculateInstallment(data.loanAmount, 12);
  const incomeRatio = calculateIncomeRatio(installmentValue, data.monthlyIncome);
  const withinLimit = isWithinLimit(incomeRatio, 0.30);
  const hasCleanDebtHistory = data.debtHistory.toLowerCase() === 'limpo';

  const approved = isAdult && withinLimit && hasCleanDebtHistory;

  let message = '';
  if (!isAdult) {
    message = 'Reprovado: Cliente menor de idade';
  } else if (!withinLimit) {
    message = 'Reprovado: Parcela compromete mais de 30% da renda';
  } else if (!hasCleanDebtHistory) {
    message = 'Reprovado: Histórico com restrições';
  } else {
    message = 'Aprovado: Crédito aprovado para cliente';
  }

  const result: CreditAnalysisResult = {
    approved,
    message,
    details: {
      isAdult,
      incomeRatio: Math.round(incomeRatio * 100) / 100,
      isWithinLimit: withinLimit,
      hasCleanDebtHistory,
      installmentValue: Math.round(installmentValue * 100) / 100
    },
    timestamp: new Date().toISOString(),
    clientData: data
  };

  logAnalysis(result);
  return result;
}

function logAnalysis(result: CreditAnalysisResult): void {
  const log: AnalysisLog = {
    timestamp: result.timestamp,
    clientData: result.clientData,
    result: {
      approved: result.approved,
      message: result.message
    }
  };

  logData(CREDIT_LOGS_KEY, log);
}

export function getAnalysisLogs(): AnalysisLog[] {
  const logs = localStorage.getItem(CREDIT_LOGS_KEY);
  return logs ? JSON.parse(logs) : [];
}

export function clearAnalysisLogs(): void {
  localStorage.removeItem(CREDIT_LOGS_KEY);
}