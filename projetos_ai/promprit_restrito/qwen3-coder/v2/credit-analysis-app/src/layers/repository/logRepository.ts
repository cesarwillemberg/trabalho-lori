/**
 * Repository Layer (Persistência de Dados)
 * 
 * Camada responsável por toda a comunicação com armazenamento de dados.
 * Abstrai a fonte de dados (LocalStorage, API, arquivo JSON, etc.)
 * da lógica de negócio e da interface do usuário.
 * 
 * Toda persistência da aplicação deve passar por esta camada.
 */

import { CreditLog, LogRepository } from '@/types/credit';

const CHAVE_STORAGE = 'credit-analysis-logs';

/**
 * Implementação do Repository usando LocalStorage
 * Pode ser facilmente substituída por outra implementação (API, arquivo, etc.)
 */
export const criarLogRepositoryLocalStorage = (): LogRepository => ({
  salvar: (log: CreditLog): void => {
    const logs: CreditLog[] = obterTodosLogsLocalStorage();
    logs.unshift(log);
    localStorage.setItem(CHAVE_STORAGE, JSON.stringify(logs));
  },

  obterTodos: (): CreditLog[] => {
    return obterTodosLogsLocalStorage();
  },

  limpar: (): void => {
    localStorage.removeItem(CHAVE_STORAGE);
  },
});

/**
 * Auxiliar para obter todos os logs do LocalStorage
 */
const obterTodosLogsLocalStorage = (): CreditLog[] => {
  if (typeof window === 'undefined') return [];
  
  const dados = localStorage.getItem(CHAVE_STORAGE);
  if (!dados) return [];

  try {
    return JSON.parse(dados) as CreditLog[];
  } catch {
    return [];
  }
};

/**
 * Singleton do repository para uso na aplicação
 */
let repositoryInstance: LogRepository | null = null;

export const obterRepository = (): LogRepository => {
  if (!repositoryInstance) {
    repositoryInstance = criarLogRepositoryLocalStorage();
  }
  return repositoryInstance;
};
