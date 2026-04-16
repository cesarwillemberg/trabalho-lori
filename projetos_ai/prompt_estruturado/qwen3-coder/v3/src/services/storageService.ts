/**
 * Serviço de Persistência
 * Responsável por salvar e recuperar logs de análise no LocalStorage
 */

import { AnalysisLog } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

/**
 * Recupera todos os logs salvos no LocalStorage
 */
export function obterLogs(): AnalysisLog[] {
  if (typeof window === 'undefined') {
    return [];
  }

  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) {
      return [];
    }
    return JSON.parse(dados) as AnalysisLog[];
  } catch (erro) {
    console.error('Erro ao recuperar logs:', erro);
    return [];
  }
}

/**
 * Salva um novo log no LocalStorage
 */
export function salvarLog(log: AnalysisLog): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const logsExistentes = obterLogs();
    logsExistentes.push(log);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logsExistentes));
    return true;
  } catch (erro) {
    console.error('Erro ao salvar log:', erro);
    return false;
  }
}

/**
 * Remove um log específico pelo ID
 */
export function removerLog(id: string): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    const logs = obterLogs();
    const logsFiltrados = logs.filter((log) => log.id !== id);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logsFiltrados));
    return true;
  } catch (erro) {
    console.error('Erro ao remover log:', erro);
    return false;
  }
}

/**
 * Limpa todos os logs salvos
 */
export function limparLogs(): boolean {
  if (typeof window === 'undefined') {
    return false;
  }

  try {
    localStorage.removeItem(STORAGE_KEY);
    return true;
  } catch (erro) {
    console.error('Erro ao limpar logs:', erro);
    return false;
  }
}

/**
 * Conta o número total de análises realizadas
 */
export function contarAnalises(): number {
  return obterLogs().length;
}

/**
 * Conta o número de aprovações
 */
export function contarAprovações(): number {
  return obterLogs().filter((log) => log.resultado.aprovado).length;
}
