/**
 * TypeScript types for Credit Analysis application
 * Centralizes all type definitions for the application
 */

export type DebtHistory = 'limpo' | 'negativado';

export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: DebtHistory;
  valorEmprestimo: number;
}

export interface CreditResult {
  aprovado: boolean;
  motivo?: string;
  valorParcela: number;
  percentualComprometimento: number;
}

export interface CreditLog {
  id: string;
  dataHora: string;
  cliente: CreditRequest;
  resultado: CreditResult;
}

export interface ValidationResult {
  valido: boolean;
  erros: string[];
}

export interface LogRepository {
  salvar(log: CreditLog): void;
  obterTodos(): CreditLog[];
  limpar(): void;
}
