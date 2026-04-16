/**
 * CAMADA DE VALIDAÇÃO (Validation Layer)
 * Responsável por validar os dados de entrada do formulário.
 * Não contém lógica de negócio, apenas verificações de formato e requisitos.
 */

export interface ValidationError {
  field: string;
  message: string;
}

export interface CreditInput {
  age: number;
  monthlyIncome: number;
  debtHistory: string;
  loanAmount: number;
}

const isValidNumber = (value: unknown): value is number => {
  return typeof value === 'number' && !isNaN(value) && isFinite(value);
};

const isNonEmptyString = (value: unknown): value is string => {
  return typeof value === 'string' && value.trim().length > 0;
};

export const validateAge = (age: number): string | null => {
  if (!isValidNumber(age)) return 'Idade deve ser um número';
  if (age < 18) return 'Idade mínima: 18 anos';
  if (age > 120) return 'Idade inválida';
  return null;
};

export const validateIncome = (income: number): string | null => {
  if (!isValidNumber(income)) return 'Renda deve ser um número';
  if (income <= 0) return 'Renda deve ser maior que zero';
  return null;
};

export const validateDebtHistory = (history: string): string | null => {
  if (!isNonEmptyString(history)) return 'Histórico de dívidas é obrigatório';
  const validOptions = ['limpo', 'negativado'];
  if (!validOptions.includes(history)) return 'Opção inválida';
  return null;
};

export const validateLoanAmount = (amount: number): string | null => {
  if (!isValidNumber(amount)) return 'Valor do empréstimo deve ser um número';
  if (amount <= 0) return 'Valor deve ser maior que zero';
  return null;
};

export const validateCreditInput = (input: CreditInput): ValidationError[] => {
  const errors: ValidationError[] = [];
  
  const ageError = validateAge(input.age);
  if (ageError) errors.push({ field: 'age', message: ageError });

  const incomeError = validateIncome(input.monthlyIncome);
  if (incomeError) errors.push({ field: 'monthlyIncome', message: incomeError });

  const debtError = validateDebtHistory(input.debtHistory);
  if (debtError) errors.push({ field: 'debtHistory', message: debtError });

  const loanError = validateLoanAmount(input.loanAmount);
  if (loanError) errors.push({ field: 'loanAmount', message: loanError });

  return errors;
};