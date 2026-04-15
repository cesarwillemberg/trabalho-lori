import { calculateInstallment, calculateIncomeCommitment } from "@/utils/calculation";
import type {
  CreditAnalysisRequest,
  CreditAnalysisResult
} from "@/types/credit";
import {
  validateDebtHistory,
  validateLoanAmount,
  validateMonthlyIncome,
  validateUserAge
} from "@/validation/creditValidation";

const INSTALLMENT_MONTHS = 12;
const MAX_INCOME_COMMITMENT_PERCENTAGE = 30;

export function analyzeCredit(
  customer: CreditAnalysisRequest
): CreditAnalysisResult {
  validateAnalysisPayload(customer);

  const installment = calculateInstallment(
    customer.loanAmount,
    INSTALLMENT_MONTHS
  );
  const incomeCommitmentPercentage = calculateIncomeCommitment(
    installment,
    customer.monthlyIncome
  );

  const reasons: string[] = [];

  if (!validateUserAge(customer.age)) {
    reasons.push("O cliente precisa ser maior de idade.");
  }

  if (!validateDebtHistory(customer.debtHistory)) {
    reasons.push("O histórico de dívidas contém restrição.");
  }

  if (incomeCommitmentPercentage > MAX_INCOME_COMMITMENT_PERCENTAGE) {
    reasons.push("A parcela compromete mais de 30% da renda mensal.");
  }

  const approved = reasons.length === 0;

  return {
    approved,
    installment,
    incomeCommitmentPercentage,
    message: approved
      ? "Crédito aprovado com base nas regras atuais."
      : "Crédito reprovado pelas regras de elegibilidade.",
    reasons
  };
}

function validateAnalysisPayload(customer: CreditAnalysisRequest) {
  if (!validateMonthlyIncome(customer.monthlyIncome)) {
    throw new Error("A renda mensal deve ser maior que zero.");
  }

  if (!validateLoanAmount(customer.loanAmount)) {
    throw new Error("O valor do empréstimo deve ser maior que zero.");
  }

  if (!Number.isFinite(customer.age) || customer.age < 0) {
    throw new Error("A idade informada é inválida.");
  }
}
