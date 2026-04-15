/**
 * Módulo de Repositório para Persistência de Dados
 * Responsável por salvar e recuperar dados do localStorage
 */

import { CreditLogEntry } from "../utils/logger";

export const LOGS_STORAGE_KEY = "credit_analysis_logs";

export function saveToLocalStorage(key: string, data: any): void {
  if (typeof window === "undefined") return;
  
  const existing = JSON.parse(localStorage.getItem(key) || "[]");
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

export function getFromLocalStorage(key: string): any[] {
  if (typeof window === "undefined") return [];
  
  return JSON.parse(localStorage.getItem(key) || "[]");
}

export function removeFromLocalStorage(key: string): void {
  if (typeof window === "undefined") return;
  
  localStorage.removeItem(key);
}

export function saveCreditLog(log: CreditLogEntry): void {
  saveToLocalStorage(LOGS_STORAGE_KEY, log);
}

export function getCreditLogs(): CreditLogEntry[] {
  return getFromLocalStorage(LOGS_STORAGE_KEY);
}

export function clearCreditLogs(): void {
  removeFromLocalStorage(LOGS_STORAGE_KEY);
}