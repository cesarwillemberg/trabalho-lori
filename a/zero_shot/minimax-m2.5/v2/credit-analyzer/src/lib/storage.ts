import { CreditLog } from '@/types';

const STORAGE_KEY = 'credit_analyzer_logs';

export function saveLog(log: CreditLog): void {
  const logs = getLogs();
  logs.unshift(log);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getLogs(): CreditLog[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function maskClientData(age: number): string {
  return `Cliente (${age} anos)`;
}
