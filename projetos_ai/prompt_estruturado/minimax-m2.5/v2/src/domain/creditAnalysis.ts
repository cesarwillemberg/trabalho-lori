import {
  CreditAnalysisRequest,
  CreditAnalysisResult,
  CreditLog
} from '../app/types';

/*
 * Constantes de negócio para análise de crédito
 * Define os parâmetros regras de aprovação
 */
const BUSINESS_RULES = {
  MINIMUM_AGE: 18,
  INSTALLMENT_MONTHS: 12,
  MAX_INSTALLMENT_PERCENTAGE: 30, // 30% máximo da renda
} as const;

/*
 * Gera um ID único para cada análise
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/*
 * Calcula o valor da parcela mensal
 * Considera 12 parcelas fixas sem juros para simplificar
 */
function calculateMonthlyInstallment(loanAmount: number): number {
  return loanAmount / BUSINESS_RULES.INSTALLMENT_MONTHS;
}

/*
 * Calcula o percentual da parcela em relação à renda mensal
 */
function calculateInstallmentPercentage(
  monthlyInstallment: number,
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 0;
  return (monthlyInstallment / monthlyIncome) * 100;
}

/*
 * Valida se o cliente tem idade mínima requerida
 */
function validateMinimumAge(age: number): boolean {
  return age >= BUSINESS_RULES.MINIMUM_AGE;
}

/*
 * Valida se a parcela não compromete mais de 30% da renda
 */
function validateInstallmentPercentage(
  installmentPercentage: number
): boolean {
  return installmentPercentage <= BUSINESS_RULES.MAX_INSTALLMENT_PERCENTAGE;
}

/*
 * Valida o histórico de dívidas do cliente
 */
function validateDebtHistory(debtHistory: 'clean' | 'negative'): boolean {
  return debtHistory === 'clean';
}

/*
 * Função principal de análise de crédito
 * Avalia todos os critérios de negócio e retorna o resultado
 */
export function analyzeCredit(
  request: CreditAnalysisRequest
): CreditAnalysisResult {
  const reasons: string[] = [];
  let approved = true;

  // Calcula valor da parcela
  const monthlyInstallment = calculateMonthlyInstallment(request.loanAmount);
  const installmentPercentage = calculateInstallmentPercentage(
    monthlyInstallment,
    request.monthlyIncome
  );

  // Validação 1: Idade mínima
  if (!validateMinimumAge(request.age)) {
    approved = false;
    reasons.push(`Idade menor que ${BUSINESS_RULES.MINIMUM_AGE} anos`);
  }

  // Validação 2: Percentual da parcela
  if (!validateInstallmentPercentage(installmentPercentage)) {
    approved = false;
    reasons.push(
      `Parcela (${installmentPercentage.toFixed(1)}%) excede ${BUSINESS_RULES.MAX_INSTALLMENT_PERCENTAGE}% da renda`
    );
  }

  // Validação 3: Histórico de dívidas
  if (!validateDebtHistory(request.debtHistory)) {
    approved = false;
    reasons.push('Cliente possui histórico negativado');
  }

  // Se nenhuma validação falhou, adiciona motivo de aprovação
  if (approved) {
    reasons.push('Todas as condições atendidas');
  }

  return {
    approved,
    monthlyInstallment,
    installmentPercentage,
    reasons,
  };
}

/*
 * Cria um registro de log para a análise
 */
export function createLog(
  request: CreditAnalysisRequest,
  result: CreditAnalysisResult
): CreditLog {
  return {
    id: generateId(),
    timestamp: new Date().toISOString(),
    request,
    result,
  };
}