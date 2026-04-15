import { LogEntry } from '@/types';

const STORAGE_KEY = 'credit_logs';

/**
 * Repository Layer - Responsável pela persistência de dados
 * Esta camada abstractiona o acesso ao LocalStorage, isolando a lógica de persistência
 * das outras camadas da aplicação.
 */
export const CreditRepository = {
  /**
   * Salva um novo log de análise de crédito
   */
  saveLog: (log: LogEntry): void => {
    const logs = CreditRepository.getAll();
    logs.push(log);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  },

  /**
   * Recupera todos os logs salvos
   */
  getAll: (): LogEntry[] => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) return [];
    try {
      return JSON.parse(data);
    } catch {
      return [];
    }
  },

  /**
   * Limpa todos os logs
   */
  clearAll: (): void => {
    localStorage.removeItem(STORAGE_KEY);
  }
};