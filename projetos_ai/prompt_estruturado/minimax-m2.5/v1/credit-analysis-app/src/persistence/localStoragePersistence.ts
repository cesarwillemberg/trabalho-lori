import { AnalysisResult } from '../business_logic/creditAnalysis';

const STORAGE_KEY = 'credit_analysis_logs';

export class LocalStoragePersistence {
  public save(result: AnalysisResult): void {
    const logs = this.getAll();
    logs.push(result);
    if (typeof window !== 'undefined') {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
    }
  }

  public getAll(): AnalysisResult[] {
    if (typeof window === 'undefined') {
      return [];
    }
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  }

  public clear(): void {
    if (typeof window !== 'undefined') {
      localStorage.removeItem(STORAGE_KEY);
    }
  }
}