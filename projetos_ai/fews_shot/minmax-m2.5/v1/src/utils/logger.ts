/**
 * Módulo de Logger para Registro de Análises de Crédito
 * Responsável por registrar logs de análise no localStorage
 */

import { CreditFormData } from "../validation/creditValidation";
import { CreditAnalysisResult } from "../service/creditService";

export interface CreditLogEntry {
  id: string;
  timestamp: string;
  customerData: CreditFormData;
  result: CreditAnalysisResult;
}

export function generateLogId(): string {
  return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

export function formatTimestamp(date: Date): string {
  return date.toISOString();
}

export function createLogEntry(
  customerData: CreditFormData,
  result: CreditAnalysisResult
): CreditLogEntry {
  return {
    id: generateLogId(),
    timestamp: formatTimestamp(new Date()),
    customerData,
    result
  };
}

export function logData(key: string, data: CreditLogEntry): void {
  if (typeof window === "undefined") return;
  
  const existing = JSON.parse(localStorage.getItem(key) || "[]") as CreditLogEntry[];
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getLogs(key: string): CreditLogEntry[] {
  if (typeof window === "undefined") return [];
  
  return JSON.parse(localStorage.getItem(key) || "[]") as CreditLogEntry[];
}

export function clearLogs(key: string): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(key);
}

export function formatLogForDisplay(log: CreditLogEntry): {
  date: string;
  age: number;
  income: string;
  debtHistory: string;
  loanAmount: string;
  result: string;
  status: "approved" | "rejected";
} {
  const date = new Date(log.timestamp).toLocaleString("pt-BR", {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit"
  });

  return {
    date,
    age: log.customerData.age,
    income: `R$ ${log.customerData.monthlyIncome.toFixed(2)}`,
    debtHistory: log.customerData.debtHistory === "limpo" ? "Limpo" : "Negativado",
    loanAmount: `R$ ${log.customerData.loanAmount.toFixed(2)}`,
    result: log.result.approved ? "Aprovado" : "Reprovado",
    status: log.result.approved ? "approved" : "rejected"
  };
}