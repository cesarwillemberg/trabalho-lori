/**
 * Repositório para persistência de logs de análise de crédito
 * Responsabilidade: Armazenar e recuperar logs de análises realizadas
 */

import { CreditLogEntry } from "../types";
import { generateId } from "../utils/idGenerator";

const STORAGE_KEY = "credit_analysis_logs";

export function saveCreditLog(log: Omit<CreditLogEntry, "id" | "createdAt">): void {
  const logs = getAllLogs();

  const newLog: CreditLogEntry = {
    ...log,
    id: generateId(),
    createdAt: new Date().toISOString(),
  };

  logs.push(newLog);

  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getAllLogs(): CreditLogEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const stored = localStorage.getItem(STORAGE_KEY);

  if (!stored) {
    return [];
  }

  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearAllLogs(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export function deleteLog(id: string): void {
  const logs = getAllLogs();
  const filtered = logs.filter((log) => log.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}
