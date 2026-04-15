import { CreditRequest, CreditResult } from '../types/credit';
import {
  validateAge,
  validateDebtHistory,
  validateInstallmentPercentage,
  validateCreditRequest,
} from '../validation/creditValidation';
import { calculateInstallment, calculateInstallmentPercentage } from '../utils/calculation';
import { saveCreditAnalysis } from '../repository/creditRepository';

const INSTALLMENTS = 12;
const MAX_INSTALLMENT_PERCENTAGE = 30;

export function processCreditAnalysis(request: CreditRequest): CreditResult {
  const validationErrors = validateCreditRequest(request);

  if (validationErrors.length > 0) {
    return {
      approved: false,
      message: 'Dados inválidos. Por favor, corrija os erros.',
      details: {
        ageValid: false,
        installmentValid: false,
        debtHistoryValid: false,
        installmentAmount: 0,
        installmentPercentage: 0,
      },
    };
  }

  const ageValid = validateAge(request.age);
  const installmentAmount = calculateInstallment(request.loanAmount, INSTALLMENTS);
  const installmentPercentage = calculateInstallmentPercentage(
    installmentAmount,
    request.monthlyIncome
  );
  const installmentValid = validateInstallmentPercentage(installmentPercentage);
  const debtHistoryValid = validateDebtHistory(request.debtHistory);

  const approved = ageValid && installmentValid && debtHistoryValid;

  let message = '';
  if (!ageValid) {
    message = 'Reprovado: Cliente deve ter pelo menos 18 anos.';
  } else if (!debtHistoryValid) {
    message = 'Reprovado: Cliente possui histórico de dívidas negativado.';
  } else if (!installmentValid) {
    message = `Reprovado: Parcela de R$ ${installmentAmount.toFixed(2)} (${installmentPercentage.toFixed(1)}% da renda) excede o limite de ${MAX_INSTALLMENT_PERCENTAGE}%.`;
  } else {
    message = 'Aprovado: Cliente atende todos os critérios de crédito.';
  }

  const result: CreditResult = {
    approved,
    message,
    details: {
      ageValid,
      installmentValid,
      debtHistoryValid,
      installmentAmount,
      installmentPercentage,
    },
  };

  saveCreditAnalysis(request, result);

  return result;
}

export function analyzeCredit(request: CreditRequest): CreditResult {
  return processCreditAnalysis(request);
}
