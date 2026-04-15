/**
 * Sistema de logs para análise de crédito usando LocalStorage.
 * 
 * Este módulo fornece funções para salvar, recuperar e remover
 * logs de análises de crédito realizadas no navegador.
 */

import { AnalysisLog, CreditFormData, CreditAnalysisResult } from "@/types";

/** Chave usada para armazenar os logs no LocalStorage */
const STORAGE_KEY = "credit_analysis_logs";

/**
 * Gera um identificador único para o log.
 * @returns ID único baseado em timestamp e número aleatório
 */
function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Salva um novo log de análise no LocalStorage.
 * 
 * @param dadosCliente - Dados do cliente usados na análise
 * @param resultado - Resultado da análise de crédito
 * @returns O log criado com ID e data/hora
 */
export function salvarLog(
  dadosCliente: CreditFormData,
  resultado: CreditAnalysisResult
): AnalysisLog {
  // Cria o objeto de log com ID e data/hora atuais
  const novoLog: AnalysisLog = {
    id: generateId(),
    dataHora: new Date().toLocaleString("pt-BR"),
    dadosCliente,
    resultado,
  };

  // Recupera logs existentes
  const logs = obterLogs();

  // Adiciona o novo log no início da lista (mais recente primeiro)
  logs.unshift(novoLog);

  // Salva no LocalStorage
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));

  return novoLog;
}

/**
 * Obtém todos os logs de análise armazenados no LocalStorage.
 * 
 * @returns Array de logs ordenados do mais recente para o mais antigo
 */
export function obterLogs(): AnalysisLog[] {
  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];

    const logs: AnalysisLog[] = JSON.parse(dados);
    return logs;
  } catch (error) {
    console.error("Erro ao obter logs do LocalStorage:", error);
    return [];
  }
}

/**
 * Remove todos os logs do LocalStorage.
 * Útil para limpar o histórico de análises.
 */
export function limparLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}

/**
 * Remove um log específico pelo ID.
 * 
 * @param id - ID do log a ser removido
 */
export function removerLog(id: string): void {
  const logs = obterLogs();
  const logsFiltrados = logs.filter((log) => log.id !== id);
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logsFiltrados));
}
