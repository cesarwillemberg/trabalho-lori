/**
 * CAMADA DE REPOSITORY (Repository Layer)
 * Responsável pela persistência de dados.
 * Abstração sobre o LocalStorage - a Service Layer não acessa diretamente.
 */

const STORAGE_KEY = 'credit_analysis_logs';

const getStorageData = (): string | null => {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(STORAGE_KEY);
};

const parseLogs = (data: string | null): object[] => {
  if (!data) return [];
  try {
    return JSON.parse(data);
  } catch {
    return [];
  }
};

const stringifyLogs = (logs: object[]): string => {
  return JSON.stringify(logs);
};

export const saveAnalysisLog = (logEntry: object): void => {
  if (typeof window === 'undefined') return;
  
  const existingData = getStorageData();
  const logs = parseLogs(existingData);
  
  logs.push(logEntry);
  
  localStorage.setItem(STORAGE_KEY, stringifyLogs(logs));
};

export const getAnalysisLogs = (): object[] => {
  const data = getStorageData();
  return parseLogs(data);
};

export const clearAnalysisLogs = (): void => {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
};

export const getLogCount = (): number => {
  const data = getStorageData();
  return parseLogs(data).length;
};