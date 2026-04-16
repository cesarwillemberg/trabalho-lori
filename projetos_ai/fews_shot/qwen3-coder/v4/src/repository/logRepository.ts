/**
 * Repositório de Logs
 * Responsável pela persistência dos logs de análise no LocalStorage
 */

import { AnalysisLog } from '@/domain/CreditAnalysis';

const STORAGE_KEY = 'credit_analysis_logs';

/**
 * Obtém todos os logs do LocalStorage
 * @returns Lista de logs ordenados por data (mais recente primeiro)
 */
export function getLogs(): AnalysisLog[] {
  if (typeof window === 'undefined') return [];

  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) return [];

    const logs: AnalysisLog[] = JSON.parse(stored);
    return logs.sort((a, b) =>
      new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
    );
  } catch (error) {
    console.error('Erro ao recuperar logs:', error);
    return [];
  }
}

/**
 * Salva um novo log no LocalStorage
 * @param log - Registro de log a ser salvo
 */
export function saveLog(log: AnalysisLog): void {
  if (typeof window === 'undefined') return;

  try {
    const logs = getLogs();
    logs.unshift(log); // Adiciona no início (mais recente primeiro)
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Erro ao salvar log:', error);
  }
}

/**
 * Remove um log específico pelo ID
 * @param id - ID do log a ser removido
 */
export function deleteLog(id: string): void {
  if (typeof window === 'undefined') return;

  try {
    const logs = getLogs();
    const filtered = logs.filter(log => log.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
  } catch (error) {
    console.error('Erro ao remover log:', error);
  }
}

/**
 * Limpa todos os logs
 */
export function clearAllLogs(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
}

/**
 * Obtém a quantidade de logs salvos
 * @returns Quantidade de registros
 */
export function getLogsCount(): number {
  return getLogs().length;
}

/**
 * Exporta os logs para um arquivo JSON (para download)
 * @returns Blob com os logs em JSON
 */
export function exportLogsAsJson(): Blob {
  const logs = getLogs();
  const json = JSON.stringify(logs, null, 2);
  return new Blob([json], { type: 'application/json' });
}
