import { CreditRequest, CreditResult, LogEntry } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

function getTimestamp(): string {
  return new Date().toISOString();
}

export function saveLog(request: CreditRequest, result: CreditResult): void {
  const entry: LogEntry = {
    id: generateId(),
    timestamp: getTimestamp(),
    request,
    result
  };

  const logs = getAllLogs();
  logs.push(entry);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getAllLogs(): LogEntry[] {
  const data = localStorage.getItem(STORAGE_KEY);
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
}

export function clearLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}
