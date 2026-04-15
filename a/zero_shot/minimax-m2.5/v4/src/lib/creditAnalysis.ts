/**
 * Lógica de negócio para análise de crédito
 * Contém as regras de validação e aprovação de crédito
 */

import { 
  CreditAnalysisInput, 
  AnalysisResult, 
  ValidationError,
  DebtHistory 
} from './types';

/**
 * Constantes de configuração para análise de crédito
 */
const CONFIG = {
  MIN_AGE: 18,
  MAX_AGE: 120,
  INSTALLMENTS: 12,
  MAX_PERCENTAGE_OF_INCOME: 30,
} as const;

/**
 * Valida os dados de entrada do formulário
 * @param data - Dados do cliente enviados pelo formulário
 * @returns Array de erros de validação (vazio se válido)
 */
export function validateInput(data: CreditAnalysisInput): ValidationError[] {
  const errors: ValidationError[] = [];

  if (data.idade < CONFIG.MIN_AGE || data.idade > CONFIG.MAX_AGE) {
    errors.push({
      field: 'idade',
      message: `Idade deve ser entre ${CONFIG.MIN_AGE} e ${CONFIG.MAX_AGE} anos`,
    });
  }

  if (data.rendaMensal <= 0) {
    errors.push({
      field: 'rendaMensal',
      message: 'Renda mensal deve ser maior que zero',
    });
  }

  if (!isValidDebtHistory(data.historicoDividas)) {
    errors.push({
      field: 'historicoDividas',
      message: 'Histórico de dívidas inválido',
    });
  }

  if (data.valorEmprestimo <= 0) {
    errors.push({
      field: 'valorEmprestimo',
      message: 'Valor do empréstimo deve ser maior que zero',
    });
  }

  return errors;
}

/**
 * Verifica se o histórico de dívidas é válido
 */
function isValidDebtHistory(history: DebtHistory): boolean {
  return history === 'limpo' || history === 'negativado';
}

/**
 * Calcula o valor da parcela mensal
 * @param loanAmount - Valor total do empréstimo
 * @returns Valor da parcela mensal
 */
export function calculateMonthlyPayment(loanAmount: number): number {
  return loanAmount / CONFIG.INSTALLMENTS;
}

/**
 * Calcula o percentual da renda que será comprometida
 * @param monthlyPayment - Valor da parcela mensal
 * @param monthlyIncome - Renda mensal do cliente
 * @returns Percentual comprometido (0-100)
 */
export function calculatePercentageOfIncome(
  monthlyPayment: number, 
  monthlyIncome: number
): number {
  if (monthlyIncome <= 0) return 0;
  return (monthlyPayment / monthlyIncome) * 100;
}

/**
 * Realiza a análise completa de crédito
 * @param data - Dados do cliente para análise
 * @returns Resultado da análise com aprovação e motivos
 */
export function analyzeCredit(data: CreditAnalysisInput): AnalysisResult {
  const monthlyPayment = calculateMonthlyPayment(data.valorEmprestimo);
  const percentageOfIncome = calculatePercentageOfIncome(
    monthlyPayment, 
    data.rendaMensal
  );
  
  const reasons: string[] = [];
  let approved = true;

  // Regra 1: Verificar idade mínima
  if (data.idade < CONFIG.MIN_AGE) {
    approved = false;
    reasons.push(`Idade mínima de ${CONFIG.MIN_AGE} anos não atendida`);
  }

  // Regra 2: Verificar comprometimento de renda
  if (percentageOfIncome > CONFIG.MAX_PERCENTAGE_OF_INCOME) {
    approved = false;
    reasons.push(
      `Parcela compromete ${percentageOfIncome.toFixed(1)}% da renda ` +
      `(máximo permitido: ${CONFIG.MAX_PERCENTAGE_OF_INCOME}%)`
    );
  }

  // Regra 3: Verificar histórico de dívidas
  if (data.historicoDividas === 'negativado') {
    approved = false;
    reasons.push('Cliente com histórico de dívidas negativado');
  }

  // Se aprovado, adicionar mensagem de sucesso
  if (approved) {
    reasons.push('Todas as condições de crédito atendidas');
  }

  return {
    monthlyPayment: Math.round(monthlyPayment * 100) / 100,
    percentageOfIncome: Math.round(percentageOfIncome * 100) / 100,
    approved,
    reasons,
  };
}

/**
 * Gera um ID único para o log
 * @returns UUID v4 simples baseado em timestamp
 */
export function generateLogId(): string {
  return `log_${Date.now()}_${Math.random().toString(36).substring(2, 11)}`;
}

/**
 * Formata um valor monetário para exibição
 * @param value - Valor numérico
 * @returns String formatada em reais
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata uma data para exibição
 * @param dateString - String de data ISO
 * @returns Data formatada em português brasileiro
 */
export function formatDate(dateString: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
}

export { CONFIG };