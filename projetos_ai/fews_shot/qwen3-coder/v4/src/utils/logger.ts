/**
 * Utilitário de Logger
 * Responsável por formatar e registrar logs da aplicação
 */

import { AnalysisLog, CreditApplication, CreditResult } from '@/domain/CreditAnalysis';

/**
 * Gera um ID único para cada registro de log
 * @returns UUID v4 simplificado
 */
export function generateLogId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Formata a data atual para ISO string
 * @returns Data e hora atual formatada
 */
export function getCurrentTimestamp(): string {
  return new Date().toISOString();
}

/**
 * Cria um registro de log de análise
 * @param clientData - Dados do cliente
 * @param result - Resultado da análise
 * @returns Registro de log completo
 */
export function createAnalysisLog(clientData: CreditApplication, result: CreditResult): AnalysisLog {
  return {
    id: generateLogId(),
    timestamp: getCurrentTimestamp(),
    clientData,
    result,
  };
}

/**
 * Formata um valor monetário para exibição
 * @param value - Valor numérico
 * @returns Valor formatado em reais brasileiros
 */
export function formatCurrency(value: number): string {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
}

/**
 * Formata uma data ISO para exibição em português
 * @param isoDate - Data no formato ISO
 * @returns Data formatada
 */
export function formatDate(isoDate: string): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(isoDate));
}

/**
 * Formata o histórico de dívidas para exibição
 * @param history - Histórico em código
 * @returns Descrição amigável
 */
export function formatDebtHistory(history: string): string {
  return history === 'clean' ? 'Limpo' : 'Negativado';
}

/**
 * Formata o percentual para exibição
 * @param value - Valor percentual
 * @returns Percentual formatado
 */
export function formatPercentage(value: number): string {
  return `${value.toFixed(2).replace('.', ',')}%`;
}
