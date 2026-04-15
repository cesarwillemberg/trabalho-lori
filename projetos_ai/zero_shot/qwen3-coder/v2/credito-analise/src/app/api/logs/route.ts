/**
 * API Route GET/DELETE /api/logs
 *
 * GET    - Retorna todos os logs de análise
 * DELETE - Limpa todos os logs armazenados
 */

import { NextRequest, NextResponse } from 'next/server';
import { lerLogs, limparLogs } from '@/lib/logStorage';

export async function GET() {
  try {
    const logs = lerLogs();
    return NextResponse.json(logs, { status: 200 });
  } catch (err) {
    console.error('Erro ao ler logs:', err);
    return NextResponse.json(
      { error: 'Erro interno ao ler logs' },
      { status: 500 }
    );
  }
}

export async function DELETE() {
  try {
    limparLogs();
    return NextResponse.json({ message: 'Logs limpos com sucesso' }, { status: 200 });
  } catch (err) {
    console.error('Erro ao limpar logs:', err);
    return NextResponse.json(
      { error: 'Erro interno ao limpar logs' },
      { status: 500 }
    );
  }
}
