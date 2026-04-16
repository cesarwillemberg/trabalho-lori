/**
 * Implementação de persistência usando LocalStorage
 */

import { CreditAnalysisLog, StorageRepository } from '@/types/credit';

const STORAGE_KEY = 'credit_analysis_logs';

export class LocalStorageRepository implements StorageRepository {
  /**
   * Salva um log de análise no LocalStorage
   */
  saveLog(log: CreditAnalysisLog): void {
    const logs = this.getLogs();
    logs.push(log);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  }

  /**
   * Recupera todos os logs do LocalStorage
   */
  getLogs(): CreditAnalysisLog[] {
    if (typeof window === 'undefined') {
      return [];
    }
    
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    
    try {
      return JSON.parse(data) as CreditAnalysisLog[];
    } catch {
      return [];
    }
  }

  /**
   * Limpa todos os logs do LocalStorage
   */
  clearLogs(): void {
    localStorage.removeItem(STORAGE_KEY);
  }
}

export const logRepository = new LocalStorageRepository();
