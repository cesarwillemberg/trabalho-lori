/**
 * Serviço de Análise de Crédito
 * Contém toda a lógica de negócio para análise de crédito
 */

import { CreditApplication, CreditResult, RejectionReasons } from '@/domain/CreditAnalysis';
import { validateCreditApplication, VALIDATION_CONSTANTS } from '@/validation/creditValidation';

/**
 * Constantes do negócio
 */
const BUSINESS_CONSTANTS = {
  MAX_INSTALLMENT_PERCENTAGE: 30,
  INSTALLMENT_MONTHS: 12,
} as const;

/**
 * Mensagens de resultado
 */
const RESULT_MESSAGES = {
  APPROVED: 'Crédito Aprovado',
  REJECTED: 'Crédito Reprovado',
  REASONS: {
    NOT_ADULT: 'Cliente menor de idade',
    HIGH_INSTALLMENT: 'Parcela excede 30% da renda mensal',
    HAS_RESTRICTIONS: 'Cliente possui restrições financeiras',
  },
} as const;

/**
 * Verifica se o cliente é maior de idade
 * @param age - Idade do cliente
 * @returns true se for maior de idade
 */
export function checkMinimumAge(age: number): boolean {
  return age >= VALIDATION_CONSTANTS.MIN_AGE;
}

/**
 * Calcula o valor da parcela mensal
 * @param loanAmount - Valor total do empréstimo
 * @param months - Número de parcelas
 * @returns Valor da parcela mensal
 */
export function calculateMonthlyInstallment(loanAmount: number, months: number = BUSINESS_CONSTANTS.INSTALLMENT_MONTHS): number {
  return loanAmount / months;
}

/**
 * Calcula o percentual que a parcela representa da renda
 * @param installment - Valor da parcela
 * @param monthlyIncome - Renda mensal
 * @returns Percentual da renda (0-100)
 */
export function calculateInstallmentPercentage(installment: number, monthlyIncome: number): number {
  if (monthlyIncome === 0) return 100;
  return (installment / monthlyIncome) * 100;
}

/**
 * Verifica se a parcela compromete menos de 30% da renda
 * @param loanAmount - Valor do empréstimo
 * @param monthlyIncome - Renda mensal
 * @returns true se estiver dentro do limite
 */
export function checkInstallmentLimit(loanAmount: number, monthlyIncome: number): boolean {
  const installment = calculateMonthlyInstallment(loanAmount);
  const percentage = calculateInstallmentPercentage(installment, monthlyIncome);
  return percentage <= BUSINESS_CONSTANTS.MAX_INSTALLMENT_PERCENTAGE;
}

/**
 * Verifica se o cliente não possui restrições financeiras
 * @param debtHistory - Histórico de dívidas
 * @returns true se estiver limpo
 */
export function checkNoRestrictions(debtHistory: string): boolean {
  return debtHistory === 'clean';
}

/**
 * Processa a análise de crédito completa
 * @param application - Dados da aplicação de crédito
 * @returns Resultado da análise com detalhes
 */
export function processCreditAnalysis(application: CreditApplication): CreditResult {
  // Valida os dados de entrada
  const validation = validateCreditApplication(application);
  if (!validation.isValid) {
    return {
      approved: false,
      message: 'Dados inválidos',
      rejectionReasons: {
        isAdult: false,
        installmentPercentage: false,
        noRestrictions: false,
      },
      analysisDetails: {
        installmentAmount: 0,
        installmentPercentageOfIncome: 0,
        isAdult: false,
        hasRestrictions: true,
      },
    };
  }

  // Executa as verificações do negócio
  const isAdult = checkMinimumAge(application.age);
  const hasNoRestrictions = checkNoRestrictions(application.debtHistory);
  const installmentWithinLimit = checkInstallmentLimit(application.loanAmount, application.monthlyIncome);

  // Calcula detalhes para exibição
  const installmentAmount = calculateMonthlyInstallment(application.loanAmount);
  const installmentPercentage = calculateInstallmentPercentage(installmentAmount, application.monthlyIncome);

  // Monta os motivos de reprovação
  const rejectionReasons: RejectionReasons = {
    isAdult,
    installmentPercentage: installmentWithinLimit,
    noRestrictions: hasNoRestrictions,
  };

  // Determina o resultado final
  const approved = isAdult && hasNoRestrictions && installmentWithinLimit;

  // Monta a mensagem de resultado
  let message: string;
  if (approved) {
    message = RESULT_MESSAGES.APPROVED;
  } else {
    const reasons: string[] = [];
    if (!isAdult) reasons.push(RESULT_MESSAGES.REASONS.NOT_ADULT);
    if (!hasNoRestrictions) reasons.push(RESULT_MESSAGES.REASONS.HAS_RESTRICTIONS);
    if (!installmentWithinLimit) reasons.push(RESULT_MESSAGES.REASONS.HIGH_INSTALLMENT);
    message = `${RESULT_MESSAGES.REJECTED}: ${reasons.join(', ')}`;
  }

  return {
    approved,
    message,
    rejectionReasons,
    analysisDetails: {
      installmentAmount,
      installmentPercentageOfIncome: installmentPercentage,
      isAdult,
      hasRestrictions: !hasNoRestrictions,
    },
  };
}
