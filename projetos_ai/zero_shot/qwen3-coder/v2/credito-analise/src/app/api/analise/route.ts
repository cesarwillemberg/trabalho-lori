/**
 * API Route POST /api/analise
 *
 * Recebe os dados do cliente, executa a análise de crédito
 * e persiste o log da operação.
 */

import { NextRequest, NextResponse } from 'next/server';
import { analisarCredito } from '@/lib/analiseCredito';
import { adicionarLog } from '@/lib/logStorage';
import { ClienteData } from '@/types/credito';

export async function POST(req: NextRequest) {
  try {
    const body: ClienteData = await req.json();

    // Validação básica dos campos obrigatórios
    const { idade, rendaMensal, historicoDividas, valorEmprestimo } = body;
    if (
      idade == null ||
      rendaMensal == null ||
      !historicoDividas ||
      valorEmprestimo == null
    ) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios' },
        { status: 400 }
      );
    }

    // Executa a lógica de análise de crédito
    const resultado = analisarCredito(body);

    // Cria o registro de log com data/hora e ID único
    const log = {
      id: crypto.randomUUID(),
      dataHora: new Date().toISOString(),
      cliente: body,
      resultado,
    };

    // Persiste o log no arquivo JSON
    adicionarLog(log);

    return NextResponse.json({ resultado, logId: log.id }, { status: 200 });
  } catch (err) {
    console.error('Erro ao processar análise:', err);
    return NextResponse.json(
      { error: 'Erro interno ao processar a análise' },
      { status: 500 }
    );
  }
}
