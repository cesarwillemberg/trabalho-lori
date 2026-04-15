/**
 * Módulo de armazenamento de logs
 * Gerencia a persistência de logs de análise de crédito
 * Suporta LocalStorage (navegador) e API (backend)
 */

import { CreditLog, ClientData, AnalysisResult } from './types';
import { generateLogId } from './creditAnalysis';

const STORAGE_KEY = 'credit_analyzer_logs';
const API_ENDPOINT = '/api/logs';

/**
 * Salva um log no LocalStorage
 * @param log - Log a ser salvo
 */
function saveToLocalStorage(log: CreditLog): void {
  if (typeof window === 'undefined') return;
  
  try {
    const existingLogs = getLocalLogs();
    const updatedLogs = [log, ...existingLogs].slice(0, 50); // Manter máximo 50 logs
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));
  } catch (error) {
    console.error('Erro ao salvar no LocalStorage:', error);
  }
}

/**
 * Recupera logs do LocalStorage
 * @returns Array de logs salvos
 */
export function getLocalLogs(): CreditLog[] {
  if (typeof window === 'undefined') return [];
  
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    return stored ? JSON.parse(stored) : [];
  } catch (error) {
    console.error('Erro ao ler do LocalStorage:', error);
    return [];
  }
}

/**
 * Envia log para a API do backend
 * @param log - Log a ser enviado
 */
async function saveToApi(log: CreditLog): Promise<void> {
  try {
    await fetch(API_ENDPOINT, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(log),
    });
  } catch (error) {
    console.error('Erro ao salvar na API:', error);
  }
}

/**
 * Carrega logs do servidor via API
 * @returns Array de logs do backend
 */
export async function fetchApiLogs(): Promise<CreditLog[]> {
  try {
    const response = await fetch(API_ENDPOINT);
    if (!response.ok) throw new Error('Falha ao buscar logs');
    return await response.json();
  } catch (error) {
    console.error('Erro ao buscar logs da API:', error);
    return [];
  }
}

/**
 * Cria e persiste um novo log de análise
 * Salva tanto no LocalStorage quanto na API
 * @param clientData - Dados do cliente analisado
 * @param analysis - Resultado da análise
 * @returns Log criado
 */
export async function createLog(
  clientData: ClientData,
  analysis: AnalysisResult
): Promise<CreditLog> {
  const log: CreditLog = {
    id: generateLogId(),
    timestamp: new Date().toISOString(),
    clientData,
    analysis,
  };

  // Salvar localmente (síncrono)
  saveToLocalStorage(log);

  // Salvar na API (assíncrono)
  await saveToApi(log);

  return log;
}

/**
 * Limpa todos os logs do LocalStorage
 */
export function clearLocalLogs(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Remove um log específico pelo ID
 * @param logId - ID do log a ser removido
 */
export function removeLog(logId: string): void {
  if (typeof window === 'undefined') return;
  
  const logs = getLocalLogs();
  const filtered = logs.filter(log => log.id !== logId);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
}

/**
 * Obtém todos os logs (combina LocalStorage e API)
 * @returns Array combinado de logs
 */
export async function getAllLogs(): Promise<CreditLog[]> {
  const localLogs = getLocalLogs();
  const apiLogs = await fetchApiLogs();
  
  // Combinar e ordenar por data (mais recente primeiro)
  const combined = [...localLogs, ...apiLogs];
  const uniqueMap = new Map<string, CreditLog>();
  
  combined.forEach(log => {
    if (!uniqueMap.has(log.id)) {
      uniqueMap.set(log.id, log);
    }
  });
  
  return Array.from(uniqueMap.values()).sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
}