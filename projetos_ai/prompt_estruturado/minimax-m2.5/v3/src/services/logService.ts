import { LogEntry, CreditAnalysisRequest, CreditAnalysisResult } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

export class LogService {
  static generateId(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  static saveLog(request: CreditAnalysisRequest, result: CreditAnalysisResult): LogEntry {
    const log: LogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      request,
      result,
    };

    const logs = this.getLogs();
    logs.push(log);

    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }

    return log;
  }

  static getLogs(): LogEntry[] {
    if (typeof window === 'undefined') {
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

  static clearLogs(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}