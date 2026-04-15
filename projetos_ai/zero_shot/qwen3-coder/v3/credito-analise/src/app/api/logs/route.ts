/**
 * API Route para leitura dos logs de análises.
 * Endpoint GET /api/logs
 * 
 * Retorna todos os logs de análises armazenados.
 */

import { NextResponse } from 'next/server';
import { lerLogs } from '@/lib/log-service';

/**
 * Handler para requisições GET na rota /api/logs.
 * 
 * @returns Resposta JSON com lista de todos os logs
 */
export async function GET() {
  try {
    // Lê todos os logs do arquivo JSON
    const logs = lerLogs();
    
    return NextResponse.json(logs, { status: 200 });
  } catch (error) {
    console.error('Erro ao ler logs:', error);
    
    return NextResponse.json(
      { error: 'Erro interno ao ler os logs' },
      { status: 500 }
    );
  }
}
