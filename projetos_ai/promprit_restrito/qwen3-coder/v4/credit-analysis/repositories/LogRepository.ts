import { LogEntry, CreditRequest, CreditResult } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

function formatTimestamp(): string {
  return new Date().toISOString();
}

export function getAllLogs(): LogEntry[] {
  if (typeof window === 'undefined') return [];
  
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
}

export function saveLog(request: CreditRequest, result: CreditResult): LogEntry {
  const log: LogEntry = {
    id: generateId(),
    timestamp: formatTimestamp(),
    request,
    result,
  };
  
  const logs = getAllLogs();
  logs.unshift(log);
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  return log;
}

export function clearLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function getLogCount(): number {
  return getAllLogs().length;
}