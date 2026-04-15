import { CreditLog } from '../app/types';

/*
 * Chave utilizada para armazenar os logs no LocalStorage
 */
const STORAGE_KEY = 'credit_analysis_logs';

/*
 * Recupera todos os logs do LocalStorage
 * Retorna array vazio se não houver dados
 */
export function getLogs(): CreditLog[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const data = localStorage.getItem(STORAGE_KEY);
    if (!data) {
      return [];
    }
    return JSON.parse(data) as CreditLog[];
  } catch {
    console.error('Erro ao ler logs do LocalStorage');
    return [];
  }
}

/*
 * Salva um novo log no LocalStorage
 * Adiciona ao final da lista existente
 */
export function saveLog(log: CreditLog): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    const existingLogs = getLogs();
    const updatedLogs = [...existingLogs, log];
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch {
    console.error('Erro ao salvar log no LocalStorage');
  }
}

/*
 * Limpa todos os logs do LocalStorage
 */
export function clearLogs(): void {
  if (typeof window === 'undefined') {
    return;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch {
    console.error('Erro ao limpar logs do LocalStorage');
  }
}