import { CreditAnalysisLog } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

export function saveToLocalStorage(log: CreditAnalysisLog): void {
  if (typeof window === 'undefined') return;
  
  const existingLogs = getAllLogs();
  existingLogs.push(log);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existingLogs));
}

export function getAllLogs(): CreditAnalysisLog[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearAllLogs(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

export function getLogById(id: string): CreditAnalysisLog | undefined {
  const logs = getAllLogs();
  return logs.find(log => log.id === id);
}

export function deleteLogById(id: string): boolean {
  if (typeof window === 'undefined') return false;
  
  const logs = getAllLogs();
  const filteredLogs = logs.filter(log => log.id !== id);
  
  if (filteredLogs.length === logs.length) return false;
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredLogs));
  return true;
}
