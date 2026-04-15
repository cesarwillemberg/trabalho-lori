import { LogEntry } from './types';

const STORAGE_KEY = 'credit-analysis-logs';

export function getLogs(): LogEntry[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error reading logs from localStorage:', error);
    return [];
  }
}

export function saveLog(log: LogEntry): LogEntry[] {
  try {
    const logs = getLogs();
    const updatedLogs = [log, ...logs];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (error) {
    console.error('Error saving log to localStorage:', error);
    return [];
  }
}

export function clearLogs(): void {
  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Error clearing logs from localStorage:', error);
  }
}

export function deleteLog(id: string): LogEntry[] {
  try {
    const logs = getLogs();
    const updatedLogs = logs.filter(log => log.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
    return updatedLogs;
  } catch (error) {
    console.error('Error deleting log from localStorage:', error);
    return [];
  }
}