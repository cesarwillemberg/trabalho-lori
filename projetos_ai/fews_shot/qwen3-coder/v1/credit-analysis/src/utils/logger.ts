import { CreditAnalysisLog } from '../types/credit';

/**
 * Logs a credit analysis entry to localStorage
 * @param data - The credit analysis log data to store
 * @param storageKey - The localStorage key to use (default: 'credit_analysis_logs')
 */
export function logCreditAnalysis(data: CreditAnalysisLog, storageKey: string = 'credit_analysis_logs'): void {
  try {
    // Only run in browser environment (not during SSR)
    if (typeof window === 'undefined') {
      return;
    }

    // Retrieve existing logs from localStorage
    const existingLogs = JSON.parse(localStorage.getItem(storageKey) || '[]');
    
    // Add the new log entry
    existingLogs.push(data);
    
    // Save back to localStorage
    localStorage.setItem(storageKey, JSON.stringify(existingLogs));
  } catch (error) {
    console.error('Error saving to localStorage:', error);
  }
}

/**
 * Retrieves all credit analysis logs from localStorage
 * @param storageKey - The localStorage key to use (default: 'credit_analysis_logs')
 * @returns Array of log entries
 */
export function getCreditAnalysisLogs(storageKey: string = 'credit_analysis_logs'): CreditAnalysisLog[] {
  try {
    // Only run in browser environment (not during SSR)
    if (typeof window === 'undefined') {
      return [];
    }

    // Retrieve and parse logs from localStorage
    const logs = JSON.parse(localStorage.getItem(storageKey) || '[]');
    return logs;
  } catch (error) {
    console.error('Error reading from localStorage:', error);
    return [];
  }
}

/**
 * Clears all credit analysis logs from localStorage
 * @param storageKey - The localStorage key to use (default: 'credit_analysis_logs')
 */
export function clearCreditAnalysisLogs(storageKey: string = 'credit_analysis_logs'): void {
  try {
    // Only run in browser environment (not during SSR)
    if (typeof window === 'undefined') {
      return;
    }

    localStorage.removeItem(storageKey);
  } catch (error) {
    console.error('Error clearing logs:', error);
  }
}
