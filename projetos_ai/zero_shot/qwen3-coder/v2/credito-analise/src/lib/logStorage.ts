/**
 * Módulo de persistência de logs de análise de crédito
 *
 * Os logs são armazenados em um arquivo JSON localizado
 * na pasta /data do projeto.
 */

import fs from 'fs';
import path from 'path';
import { LogAnalise } from '@/types/credito';

/** Caminho absoluta para o arquivo de logs JSON */
const LOGS_FILE = path.resolve(process.cwd(), 'data', 'logs.json');

/**
 * Garante que o arquivo de logs existe; se não, cria com array vazio
 */
function ensureLogFile(): void {
  const dir = path.dirname(LOGS_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  if (!fs.existsSync(LOGS_FILE)) {
    fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), 'utf-8');
  }
}

/**
 * Lê todos os logs armazenados no arquivo JSON
 *
 * @returns Array de registros de log
 */
export function lerLogs(): LogAnalise[] {
  ensureLogFile();
  const conteudo = fs.readFileSync(LOGS_FILE, 'utf-8');
  return JSON.parse(conteudo) as LogAnalise[];
}

/**
 * Adiciona um novo registro de log ao arquivo JSON
 *
 * @param log - Registro de análise a ser persistido
 */
export function adicionarLog(log: LogAnalise): void {
  ensureLogFile();
  const logs = lerLogs();
  logs.unshift(log); // mais recente primeiro
  fs.writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2), 'utf-8');
}

/**
 * Remove todos os logs do arquivo JSON
 */
export function limparLogs(): void {
  ensureLogFile();
  fs.writeFileSync(LOGS_FILE, JSON.stringify([], null, 2), 'utf-8');
}
