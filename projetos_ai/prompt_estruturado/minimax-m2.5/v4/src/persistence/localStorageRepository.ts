import { LogEntry, CreditRequest, CreditAnalysisResult } from '../types';

const STORAGE_KEY = 'credit_analysis_logs';

export function gerarId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function salvarLog(
  dadosCliente: CreditRequest,
  resultado: CreditAnalysisResult
): LogEntry {
  const logs = obterLogs();
  
  const novoLog: LogEntry = {
    id: gerarId(),
    dataHora: new Date().toISOString(),
    dadosCliente,
    resultado
  };
  
  logs.push(novoLog);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  
  return novoLog;
}

export function obterLogs(): LogEntry[] {
  if (typeof window === 'undefined') return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function limparLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

export function obterLogPorId(id: string): LogEntry | undefined {
  const logs = obterLogs();
  return logs.find(log => log.id === id);
}
