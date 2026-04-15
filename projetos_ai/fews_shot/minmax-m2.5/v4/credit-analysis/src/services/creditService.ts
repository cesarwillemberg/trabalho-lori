import { CreditRequest, CreditResult } from "@/types/credit";
import {
  validateAge,
  validateIncomeCommitment,
  validateDebtHistory,
  validateCreditRequest
} from "@/validation/creditValidation";
import { saveCreditLog } from "@/repository/logRepository";

const INSTALLMENTS = 12;

export function analyzeCredit(request: CreditRequest): CreditResult {
  const validation = validateCreditRequest(request);

  if (!validation.valid) {
    const result: CreditResult = {
      approved: false,
      message: "Dados inválidos",
      reasons: validation.errors
    };
    saveCreditLog(request, result);
    return result;
  }

  const reasons: string[] = [];

  const isAdult = validateAge(request.age);
  if (!isAdult) {
    reasons.push("Cliente menor de idade (mínimo 18 anos)");
  }

  const isAffordable = validateIncomeCommitment(
    request.monthlyIncome,
    request.loanAmount
  );
  if (!isAffordable) {
    reasons.push(
      `Parcela de R$ ${(request.loanAmount / INSTALLMENTS).toFixed(2)} compromete mais de 30% da renda`
    );
  }

  const hasCleanHistory = validateDebtHistory(request.debtHistory);
  if (!hasCleanHistory) {
    reasons.push("Cliente possui restrições no histórico de dívidas");
  }

  const approved = isAdult && isAffordable && hasCleanHistory;

  const result: CreditResult = {
    approved,
    message: approved ? "Crédito aprovado!" : "Crédito reprovado",
    reasons: approved ? undefined : reasons
  };

  saveCreditLog(request, result);

  return result;
}

export function calculateInstallment(
  loanAmount: number,
  installments: number = INSTALLMENTS
): number {
  return loanAmount / installments;
}

export function calculateIncomeCommitment(
  monthlyIncome: number,
  loanAmount: number
): number {
  const installment = calculateInstallment(loanAmount);
  return (installment / monthlyIncome) * 100;
}