import { CreditLog } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

export function saveLog(log: CreditLog): void {
  const logs = getLogs();
  logs.unshift(log);
  
  if (logs.length > 50) {
    logs.pop();
  }
  
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

export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}