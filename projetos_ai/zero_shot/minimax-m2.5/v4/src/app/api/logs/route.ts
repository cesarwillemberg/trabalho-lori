/**
 * API Route para gerenciamento de logs de análise de crédito
 * Endpoints: GET (listar todos os logs) e POST (criar novo log)
 * Persistência em arquivo JSON no servidor
 */

import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';
import { CreditLog } from '@/lib/types';

const LOGS_FILE_PATH = join(process.cwd(), 'src', 'data', 'logs.json');

/**
 * Garante que o arquivo de logs existe
 */
function ensureLogsFile(): void {
  if (!existsSync(LOGS_FILE_PATH)) {
    writeFileSync(LOGS_FILE_PATH, JSON.stringify([], null, 2));
  }
}

/**
 * Lê todos os logs do arquivo
 */
function readLogs(): CreditLog[] {
  ensureLogsFile();
  try {
    const data = readFileSync(LOGS_FILE_PATH, 'utf-8');
    return JSON.parse(data) as CreditLog[];
  } catch (error) {
    console.error('Erro ao ler logs:', error);
    return [];
  }
}

/**
 * Escreve logs no arquivo
 */
function writeLogs(logs: CreditLog[]): void {
  try {
    writeFileSync(LOGS_FILE_PATH, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Erro ao salvar logs:', error);
  }
}

/**
 * GET /api/logs
 * Retorna todos os logs de análise de crédito
 */
export async function GET() {
  const logs = readLogs();
  return NextResponse.json(logs);
}

/**
 * POST /api/logs
 * Cria um novo log de análise de crédito
 */
export async function POST(request: NextRequest) {
  try {
    const log = await request.json() as CreditLog;
    
    if (!log.id || !log.timestamp || !log.clientData || !log.analysis) {
      return NextResponse.json(
        { error: 'Dados do log inválidos' },
        { status: 400 }
      );
    }

    const logs = readLogs();
    const updatedLogs = [log, ...logs].slice(0, 100);
    writeLogs(updatedLogs);

    return NextResponse.json(log, { status: 201 });
  } catch (error) {
    console.error('Erro ao criar log:', error);
    return NextResponse.json(
      { error: 'Erro ao salvar log' },
      { status: 500 }
    );
  }
}