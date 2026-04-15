// src/utils/logger.ts
// Responsável por registrar logs de análises realizadas

/**
 * Registra dados no localStorage
 * @param key - Chave para armazenamento
 * @param data - Dados a serem armazenados
 */
export function logData(key: string, data: any): void {
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push({
    ...data,
    createdAt: new Date().toISOString()
  });
  localStorage.setItem(key, JSON.stringify(existing));
}

/**
 * Recupera dados do localStorage
 * @param key - Chave para recuperação
 * @returns Dados recuperados
 */
export function getLogs(key: string): any[] {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Limpa todos os logs do localStorage
 * @param key - Chave para limpeza
 */
export function clearLogs(key: string): void {
  localStorage.removeItem(key);
}