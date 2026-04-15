// src/utils/calculation.ts
// Responsável por realizar cálculos financeiros

/**
 * Calcula o valor da parcela do empréstimo
 * @param amount - Valor total do empréstimo
 * @param installments - Número de parcelas (padrão: 12)
 * @returns Valor de cada parcela
 */
export function calculateInstallment(amount: number, installments: number = 12): number {
  return amount / installments;
}

/**
 * Calcula o percentual de comprometimento da renda
 * @param installment - Valor da parcela
 * @param monthlyIncome - Renda mensal
 * @returns Percentual comprometido (0 a 1)
 */
export function calculateIncomeRatio(installment: number, monthlyIncome: number): number {
  if (monthlyIncome <= 0) return 0;
  return installment / monthlyIncome;
}

/**
 * Verifica se o comprometimento excede o limite permitido
 * @param ratio - Ratio de comprometimento (0 a 1)
 * @param limit - Limite máximo (padrão: 0.30 = 30%)
 * @returns true se estiver dentro do limite
 */
export function isWithinLimit(ratio: number, limit: number = 0.30): boolean {
  return ratio <= limit;
}