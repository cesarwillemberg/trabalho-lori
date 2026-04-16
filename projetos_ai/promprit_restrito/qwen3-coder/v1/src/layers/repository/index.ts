// CAMADA DE REPOSITORY (Persistencia)
// Responsável por toda comunicação com LocalStorage
// A lógica de negócio NUNCA acessa LocalStorage diretamente
// Todas as operações de leitura/escrita passam por aqui

import { LogEntry } from '@/types';

const LOGS_KEY = 'credit_analysis_logs';

export function gerarId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function obterDataHoraAtual(): string {
  return new Date().toISOString();
}

export function obterLogsDoStorage(): LogEntry[] {
  if (typeof window === 'undefined') return [];
  
  const dados = localStorage.getItem(LOGS_KEY);
  return dados ? JSON.parse(dados) : [];
}

export function salvarLogsNoStorage(logs: LogEntry[]): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(LOGS_KEY, JSON.stringify(logs));
}

export function criarLog(cliente: any, resultado: any): LogEntry {
  return {
    id: gerarId(),
    dataHora: obterDataHoraAtual(),
    cliente,
    resultado,
  };
}

export function adicionarLog(log: LogEntry): void {
  const logs = obterLogsDoStorage();
  salvarLogsNoStorage([log, ...logs]);
}

export function limparLogs(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(LOGS_KEY);
}

export function obterTodosLogs(): LogEntry[] {
  return obterLogsDoStorage();
}
