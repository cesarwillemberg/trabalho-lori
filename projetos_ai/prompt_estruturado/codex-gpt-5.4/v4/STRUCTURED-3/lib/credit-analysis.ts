import type { AnalysisInput, AnalysisResult } from "@/types/credit";

const INSTALLMENT_COUNT = 12;
const MAX_INCOME_COMMITMENT_PERCENT = 30;

export function analyzeCredit(input: AnalysisInput): AnalysisResult {
  // A parcela é sempre calculada com base em 12 meses fixos.
  const installmentAmount = input.requestedLoanAmount / INSTALLMENT_COUNT;
  const incomeCommitmentPercent =
    input.monthlyIncome > 0 ? (installmentAmount / input.monthlyIncome) * 100 : 100;

  const conditions = {
    isAdult: input.age >= 18,
    hasValidIncome: input.monthlyIncome > 0,
    incomeWithinLimit: incomeCommitmentPercent <= MAX_INCOME_COMMITMENT_PERCENT,
    hasCleanDebtHistory: input.debtHistory === "limpo"
  };

  const status =
    conditions.isAdult &&
    conditions.hasValidIncome &&
    conditions.incomeWithinLimit &&
    conditions.hasCleanDebtHistory
      ? "Aprovado"
      : "Reprovado";

  return {
    status,
    installmentAmount,
    incomeCommitmentPercent,
    clientData: input,
    reasons: buildReasons(conditions, installmentAmount, incomeCommitmentPercent)
  };
}

function buildReasons(
  conditions: {
    isAdult: boolean;
    hasValidIncome: boolean;
    incomeWithinLimit: boolean;
    hasCleanDebtHistory: boolean;
  },
  installmentAmount: number,
  incomeCommitmentPercent: number
) {
  const reasons = [
    `Parcela calculada em 12x fixas: ${installmentAmount.toFixed(2)}.`,
    `Comprometimento de renda estimado em ${incomeCommitmentPercent.toFixed(2)}%.`
  ];

  if (!conditions.isAdult) {
    reasons.push("Cliente menor de 18 anos.");
  }

  if (!conditions.hasValidIncome) {
    reasons.push("Renda mensal deve ser maior que zero.");
  }

  if (!conditions.incomeWithinLimit) {
    reasons.push("Parcela excede 30% da renda mensal.");
  }

  if (!conditions.hasCleanDebtHistory) {
    reasons.push("Cliente possui histórico de dívidas negativado.");
  }

  if (
    conditions.isAdult &&
    conditions.hasValidIncome &&
    conditions.incomeWithinLimit &&
    conditions.hasCleanDebtHistory
  ) {
    reasons.push("Todas as regras foram atendidas para aprovação.");
  }

  return reasons;
}
