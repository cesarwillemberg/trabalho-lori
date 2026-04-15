import { CreditLog, CreditRequest, CreditResult } from '@/types';

const CHAVE_STORAGE = 'credit_logs';

export function obterDataAtual(): string {
  return new Date().toISOString();
}

export function criarLogAnalise(cliente: CreditRequest, resultado: CreditResult): CreditLog {
  return {
    dataHora: obterDataAtual(),
    cliente,
    resultado
  };
}

export function converterParaJson(logs: CreditLog[]): string {
  return JSON.stringify(logs, null, 2);
}

export function converterDeJson(json: string): CreditLog[] {
  try {
    const parsed = JSON.parse(json);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export function salvarNoStorage(chave: string, valor: string): void {
  if (typeof window !== 'undefined') {
    window.localStorage.setItem(chave, valor);
  }
}

export function lerDoStorage(chave: string): string | null {
  if (typeof window !== 'undefined') {
    return window.localStorage.getItem(chave);
  }
  return null;
}

export function salvarLogs(logs: CreditLog[]): void {
  const json = converterParaJson(logs);
  salvarNoStorage(CHAVE_STORAGE, json);
}

export function carregarLogs(): CreditLog[] {
  const json = lerDoStorage(CHAVE_STORAGE);
  if (!json) return [];
  return converterDeJson(json);
}

export function adicionarLog(cliente: CreditRequest, resultado: CreditResult): void {
  const logs = carregarLogs();
  const novoLog = criarLogAnalise(cliente, resultado);
  logs.push(novoLog);
  salvarLogs(logs);
}

export function limparLogs(): void {
  salvarNoStorage(CHAVE_STORAGE, '[]');
}