// src/repository/localStorageRepository.ts
// Responsável pela persistência de dados no localStorage

/**
 * Salva dados no localStorage
 * @param key - Chave para armazenamento
 * @param data - Dados a serem salvos
 */
export function saveToLocalStorage(key: string, data: any): void {
  const existing = JSON.parse(localStorage.getItem(key) || '[]');
  existing.push(data);
  localStorage.setItem(key, JSON.stringify(existing));
}

/**
 * Recupera dados do localStorage
 * @param key - Chave para recuperação
 * @returns Dados recuperados
 */
export function getFromLocalStorage(key: string): any[] {
  return JSON.parse(localStorage.getItem(key) || '[]');
}

/**
 * Remove dados do localStorage
 * @param key - Chave para remoção
 */
export function removeFromLocalStorage(key: string): void {
  localStorage.removeItem(key);
}

/**
 * Limpa todos os dados de uma chave
 * @param key - Chave para limpeza
 */
export function clearLocalStorage(key: string): void {
  localStorage.setItem(key, JSON.stringify([]));
}