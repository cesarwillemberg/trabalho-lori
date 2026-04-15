/**
 * Módulo de Serviço para Análise de Crédito
 * Contém a lógica de negócio para avaliação de crédito
 */

import {
  validateUserAge,
  validateMonthlyIncome,
  validateDebtHistory,
  validateLoanAmount,
  CreditFormData
} from "../validation/creditValidation";

export interface CreditAnalysisResult {
  approved: boolean;
  message: string;
  reasons: string[];
  installmentAmount: number;
  incomePercentage: number;
}

const FIXED_INSTALLMENTS = 12;
const MAX_INCOME_PERCENTAGE = 0.30;

export function calculateInstallmentAmount(
  loanAmount: number,
  installments: number = FIXED_INSTALLMENTS
): number {
  return loanAmount / installments;
}

export function calculateIncomePercentage(
  installmentAmount: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 0;
  return installmentAmount / monthlyIncome;
}

export function analyzeCredit(data: CreditFormData): CreditAnalysisResult {
  const reasons: string[] = [];
  let approved = true;

  const isAdult = validateUserAge(data.age);
  const hasIncome = validateMonthlyIncome(data.monthlyIncome);
  const hasCleanDebtHistory = validateDebtHistory(data.debtHistory);
  const hasLoanAmount = validateLoanAmount(data.loanAmount);

  if (!hasLoanAmount || !hasIncome) {
    return {
      approved: false,
      message: "Dados inválidos. Preencha todos os campos corretamente.",
      reasons: ["Dados do formulário inválidos"],
      installmentAmount: 0,
      incomePercentage: 0
    };
  }

  if (!isAdult) {
    approved = false;
    reasons.push("Cliente menor de idade (menos de 18 anos)");
  }

  if (!hasCleanDebtHistory) {
    approved = false;
    reasons.push("Cliente com histórico de dívidas negativado");
  }

  const installmentAmount = calculateInstallmentAmount(
    data.loanAmount,
    FIXED_INSTALLMENTS
  );
  const incomePercentage = calculateIncomePercentage(
    installmentAmount,
    data.monthlyIncome
  );

  if (incomePercentage > MAX_INCOME_PERCENTAGE) {
    approved = false;
    reasons.push(
      `Parcela (R$ ${installmentAmount.toFixed(2)}) compromete ${(
        incomePercentage * 100
      ).toFixed(1)}% da renda (limite: 30%)`
    );
  }

  if (approved) {
    return {
      approved: true,
      message: "Crédito aprovado! Todas as condições foram atendidas.",
      reasons: [],
      installmentAmount,
      incomePercentage
    };
  }

  return {
    approved: false,
    message: "Crédito reprovado. Verifique os motivos abaixo.",
    reasons,
    installmentAmount,
    incomePercentage
  };
}

export function processCredit(data: CreditFormData): CreditAnalysisResult {
  return analyzeCredit(data);
}