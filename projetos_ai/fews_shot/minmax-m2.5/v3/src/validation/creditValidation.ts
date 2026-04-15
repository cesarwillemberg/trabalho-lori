// src/validation/creditValidation.ts
// Responsável por validar os dados de entrada do formulário de crédito

/**
 * Valida se o cliente é maior de idade (18 anos ou mais)
 * @param age - Idade do cliente
 * @returns true se for maior de idade, false caso contrário
 */
export function validateUserAge(age: number): boolean {
  return age >= 18;
}

/**
 * Valida se a renda mensal é um valor positivo
 * @param income - Renda mensal do cliente
 * @returns true se for válida, false caso contrário
 */
export function validateMonthlyIncome(income: number): boolean {
  return income > 0;
}

/**
 * Valida se o valor do empréstimo é positivo
 * @param amount - Valor do empréstimo solicitado
 * @returns true se for válido, false caso contrário
 */
export function validateLoanAmount(amount: number): boolean {
  return amount > 0;
}

/**
 * Valida se o histórico de dívidas é um valor válido
 * @param history - Histórico de dívidas (limpo ou negativado)
 * @returns true se for válido, false caso contrário
 */
export function validateDebtHistory(history: string): boolean {
  const validHistories = ['limpo', 'negativado'];
  return validHistories.includes(history.toLowerCase());
}

/**
 * Valida todos os campos do formulário de crédito
 * @param data - Dados do formulário
 * @returns { isValid: boolean, errors: string[] }
 */
export function validateCreditForm(data: {
  age: number;
  monthlyIncome: number;
  loanAmount: number;
  debtHistory: string;
}): { isValid: boolean; errors: string[] } {
  const errors: string[] = [];

  if (!validateUserAge(data.age)) {
    errors.push('Cliente deve ser maior de 18 anos');
  }

  if (!validateMonthlyIncome(data.monthlyIncome)) {
    errors.push('Renda mensal deve ser maior que zero');
  }

  if (!validateLoanAmount(data.loanAmount)) {
    errors.push('Valor do empréstimo deve ser maior que zero');
  }

  if (!validateDebtHistory(data.debtHistory)) {
    errors.push('Histórico de dívidas deve ser "limpo" ou "negativado"');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
}