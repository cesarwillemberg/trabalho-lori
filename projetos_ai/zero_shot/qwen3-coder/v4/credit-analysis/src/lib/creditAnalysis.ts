/**
 * Credit Analysis Logic Module
 * 
 * This module contains the core business logic for credit analysis.
 * It validates client eligibility based on:
 * - Age validation (must be 18 or older)
 * - Income vs installment ratio (installments cannot exceed 30% of monthly income)
 * - Debt history check (must be "clean")
 */

/**
 * Interface defining the credit analysis request data
 */
export interface CreditAnalysisRequest {
  /** Client age in years */
  idade: number;
  /** Client monthly income in BRL */
  rendaMensal: number;
  /** Client debt history: "limpo" (clean) or "negativado" (in default) */
  historicoDividas: 'limpo' | 'negativado';
  /** Requested loan amount in BRL */
  valorEmprestimo: number;
}

/**
 * Interface defining the credit analysis result
 */
export interface CreditAnalysisResult {
  /** Whether the credit was approved */
  aprovado: boolean;
  /** Array of reasons for approval/rejection */
  motivos: string[];
  /** Number of installments (fixed at 12) */
  numeroParcelas: number;
  /** Value of each installment */
  valorParcela: number;
  /** Percentage of income committed to installments */
  percentualRendaComprometida: number;
}

/**
 * Fixed number of installments for loan calculation
 */
const NUMERO_PARCELAS = 12;

/**
 * Maximum percentage of income that can be committed to installments (30%)
 */
const MAX_PERCENTUAL_RENDA = 0.30;

/**
 * Minimum age required for credit approval
 */
const IDADE_MINIMA = 18;

/**
 * Performs credit analysis based on client data
 * 
 * @param data - The credit analysis request containing client information
 * @returns CreditAnalysisResult with approval status and details
 */
export function analisarCredito(data: CreditAnalysisRequest): CreditAnalysisResult {
  const motivos: string[] = [];
  let aprovado = true;

  // Calculate installment value (loan amount divided by fixed number of installments)
  const valorParcela = data.valorEmprestimo / NUMERO_PARCELAS;
  
  // Calculate percentage of income committed to installments
  const percentualRendaComprometida = (valorParcela / data.rendaMensal) * 100;

  // Rule 1: Age validation - client must be 18 or older
  if (data.idade < IDADE_MINIMA) {
    aprovado = false;
    motivos.push(`Cliente menor de idade (${data.idade} anos). Idade mínima requerida: ${IDADE_MINIMA} anos.`);
  }

  // Rule 2: Income vs installment ratio - installment cannot exceed 30% of monthly income
  if (valorParcela > data.rendaMensal * MAX_PERCENTUAL_RENDA) {
    aprovado = false;
    motivos.push(
      `A parcela de R$ ${valorParcela.toFixed(2)} compromete ${percentualRendaComprometida.toFixed(1)}% da renda mensal, ` +
      `excedendo o limite máximo de ${(MAX_PERCENTUAL_RENDA * 100).toFixed(0)}%.`
    );
  }

  // Rule 3: Debt history check - client must have clean debt history
  if (data.historicoDividas !== 'limpo') {
    aprovado = false;
    motivos.push('Cliente possui restrições no histórico de dívidas (negativado).');
  }

  // If all conditions are met, add approval message
  if (aprovado) {
    motivos.push('Todas as condições para aprovação foram atendidas.');
  }

  return {
    aprovado,
    motivos,
    numeroParcelas: NUMERO_PARCELAS,
    valorParcela,
    percentualRendaComprometida,
  };
}

/**
 * Validates the credit analysis request data
 * 
 * @param data - The data to validate
 * @returns Array of validation error messages (empty if valid)
 */
export function validarDadosCredito(data: CreditAnalysisRequest): string[] {
  const erros: string[] = [];

  if (!data.idade || data.idade <= 0) {
    erros.push('Idade deve ser um valor positivo.');
  }

  if (!data.rendaMensal || data.rendaMensal <= 0) {
    erros.push('Renda mensal deve ser um valor positivo.');
  }

  if (!data.historicoDividas || !['limpo', 'negativado'].includes(data.historicoDividas)) {
    erros.push('Histórico de dívidas deve ser "limpo" ou "negativado".');
  }

  if (!data.valorEmprestimo || data.valorEmprestimo <= 0) {
    erros.push('Valor do empréstimo deve ser um valor positivo.');
  }

  return erros;
}
