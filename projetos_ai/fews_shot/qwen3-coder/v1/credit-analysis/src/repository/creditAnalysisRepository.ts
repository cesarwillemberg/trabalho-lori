import { CreditAnalysisLog } from '../types/credit';
import { logCreditAnalysis, getCreditAnalysisLogs } from '../utils/logger';

/**
 * Repository module for persisting credit analysis logs
 * Provides a clean API for saving and retrieving analysis logs
 */

/**
 * Saves a credit analysis log to persistent storage (localStorage)
 * @param logData - The log data to save
 * @returns The saved log data
 */
export function saveCreditAnalysisLog(logData: CreditAnalysisLog): CreditAnalysisLog {
  // Use the logger utility to persist the log
  logCreditAnalysis(logData);
  
  return logData;
}

/**
 * Retrieves all credit analysis logs from persistent storage
 * @returns Array of log entries
 */
export function getAllCreditAnalysisLogs(): CreditAnalysisLog[] {
  // Use the logger utility to retrieve logs
  return getCreditAnalysisLogs();
}

/**
 * Generates a unique ID for a log entry
 * @returns A unique identifier string
 */
export function generateLogId(): string {
  return `log_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}
