/**
 * Módulo de registro de logs de análises de crédito.
 * Persiste os dados em um arquivo JSON no sistema de arquivos.
 * 
 * O arquivo de logs é criado no diretório `data/` na raiz do projeto.
 * Cada registro contém data/hora, dados do cliente e resultado da análise.
 */

import fs from 'fs';
import path from 'path';
import { LogAnalise, LogsStorage } from './types';

/** Caminho relativa ao diretório raiz do projeto para o arquivo de logs */
const LOGS_DIR = path.join(process.cwd(), 'data');
const LOGS_FILE = path.join(LOGS_DIR, 'logs.json');

/**
 * Garante que o diretório de logs exista.
 * Cria o diretório caso não exista.
 */
function garantirDiretorioLogs(): void {
  if (!fs.existsSync(LOGS_DIR)) {
    fs.mkdirSync(LOGS_DIR, { recursive: true });
  }
}

/**
 * Garante que o arquivo de logs exista com estrutura inicial.
 * Se o arquivo não existir, cria com lista vazia de logs.
 */
function garantirArquivoLogs(): void {
  garantirDiretorioLogs();
  
  if (!fs.existsSync(LOGS_FILE)) {
    const storageInicial: LogsStorage = { logs: [] };
    fs.writeFileSync(
      LOGS_FILE,
      JSON.stringify(storageInicial, null, 2),
      'utf-8'
    );
  }
}

/**
 * Lê todos os logs armazenados no arquivo JSON.
 *
 * @returns Objeto contendo a lista de logs de análise
 */
export function lerLogs(): LogsStorage {
  garantirArquivoLogs();
  
  const conteudo = fs.readFileSync(LOGS_FILE, 'utf-8');
  return JSON.parse(conteudo) as LogsStorage;
}

/**
 * Adiciona um novo registro de log ao arquivo JSON.
 * Gera um ID único baseado em timestamp + random para cada registro.
 *
 * @param log - Dados do log a ser registrado
 */
export function registrarLog(log: Omit<LogAnalise, 'id'>): void {
  const storage = lerLogs();
  
  // Gera ID único para o registro
  const novoLog: LogAnalise = {
    ...log,
    id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
  };
  
  // Adiciona ao final da lista
  storage.logs.push(novoLog);
  
  // Persiste no arquivo JSON
  fs.writeFileSync(
    LOGS_FILE,
    JSON.stringify(storage, null, 2),
    'utf-8'
  );
}

/**
 * Limpa todos os logs armazenados no arquivo JSON.
 * Útil para testes e manutenção do sistema.
 */
export function limparLogs(): void {
  const storage: LogsStorage = { logs: [] };
  fs.writeFileSync(
    LOGS_FILE,
    JSON.stringify(storage, null, 2),
    'utf-8'
  );
}
