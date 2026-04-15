/**
 * Logging System Module
 * 
 * This module handles logging of credit analysis operations.
 * Logs are persisted to a JSON file and contain:
 * - Date and time of the analysis
 * - Client data (age, income, debt history, loan amount)
 * - Analysis result (approved/rejected, reasons)
 */

import fs from 'fs';
import path from 'path';

/**
 * Interface defining a log entry for credit analysis
 */
export interface AnalysisLogEntry {
  /** Unique identifier for the log entry (timestamp) */
  id: string;
  /** Date and time when the analysis was performed */
  dataHora: string;
  /** Client age */
  idade: number;
  /** Client monthly income */
  rendaMensal: number;
  /** Client debt history status */
  historicoDividas: 'limpo' | 'negativado';
  /** Requested loan amount */
  valorEmprestimo: number;
  /** Whether the credit was approved */
  resultado: 'Aprovado' | 'Reprovado';
  /** Reasons for the decision */
  motivos: string[];
  /** Number of installments */
  numeroParcelas: number;
  /** Installment value */
  valorParcela: number;
  /** Percentage of income committed */
  percentualRendaComprometida: number;
}

/**
 * Path to the log file (stored in the data directory at project root)
 */
const LOG_FILE_PATH = path.join(process.cwd(), 'data', 'analysis-logs.json');

/**
 * Ensures the log file exists, creating it if necessary
 */
function ensureLogFileExists(): void {
  const dir = path.dirname(LOG_FILE_PATH);
  
  // Create directory if it doesn't exist
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  // Create log file with empty array if it doesn't exist
  if (!fs.existsSync(LOG_FILE_PATH)) {
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Reads all log entries from the log file
 * 
 * @returns Array of all analysis log entries
 */
export function readLogs(): AnalysisLogEntry[] {
  ensureLogFileExists();
  
  try {
    const data = fs.readFileSync(LOG_FILE_PATH, 'utf-8');
    return JSON.parse(data) as AnalysisLogEntry[];
  } catch (error) {
    console.error('Error reading log file:', error);
    return [];
  }
}

/**
 * Appends a new log entry to the log file
 * 
 * @param entry - The log entry to save
 */
export function appendLog(entry: AnalysisLogEntry): void {
  ensureLogFileExists();
  
  try {
    const logs = readLogs();
    logs.push(entry);
    fs.writeFileSync(LOG_FILE_PATH, JSON.stringify(logs, null, 2), 'utf-8');
  } catch (error) {
    console.error('Error writing to log file:', error);
    throw new Error('Failed to save analysis log');
  }
}

/**
 * Creates a new log entry from analysis data and saves it
 * 
 * @param analysisData - The client data submitted for analysis
 * @param result - The analysis result
 * @returns The created log entry
 */
export function createAndSaveLog(
  analysisData: {
    idade: number;
    rendaMensal: number;
    historicoDividas: 'limpo' | 'negativado';
    valorEmprestimo: number;
  },
  result: {
    aprovado: boolean;
    motivos: string[];
    numeroParcelas: number;
    valorParcela: number;
    percentualRendaComprometida: number;
  }
): AnalysisLogEntry {
  const logEntry: AnalysisLogEntry = {
    id: Date.now().toString(),
    dataHora: new Date().toISOString(),
    idade: analysisData.idade,
    rendaMensal: analysisData.rendaMensal,
    historicoDividas: analysisData.historicoDividas,
    valorEmprestimo: analysisData.valorEmprestimo,
    resultado: result.aprovado ? 'Aprovado' : 'Reprovado',
    motivos: result.motivos,
    numeroParcelas: result.numeroParcelas,
    valorParcela: result.valorParcela,
    percentualRendaComprometida: result.percentualRendaComprometida,
  };

  appendLog(logEntry);
  return logEntry;
}
