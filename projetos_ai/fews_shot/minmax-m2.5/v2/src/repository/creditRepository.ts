import { CreditRequest, CreditResult, CreditLog } from '../types/credit';

const STORAGE_KEY = 'credit_analysis_logs';

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substring(2);
}

export function saveCreditAnalysis(request: CreditRequest, result: CreditResult): void {
  if (typeof window === 'undefined') return;

  const log: CreditLog = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    request,
    result,
  };

  const existingLogs = getAllLogs();
  existingLogs.push(log);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(existingLogs));
  } catch (error) {
    console.error('Erro ao salvar log:', error);
  }
}

export function getAllLogs(): CreditLog[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];
    return JSON.parse(stored);
  } catch (error) {
    console.error('Erro ao recuperar logs:', error);
    return [];
  }
}

export function clearLogs(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
}
