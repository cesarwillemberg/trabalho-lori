/**
 * API Route para análise de crédito.
 * Endpoint POST /api/analise
 * 
 * Recebe os dados do cliente no corpo da requisição,
 * realiza a análise de crédito e registra o log.
 */

import { NextRequest, NextResponse } from 'next/server';
import { ClienteDados } from '@/lib/types';
import { analisarCredito } from '@/lib/credito-validator';
import { registrarLog } from '@/lib/log-service';

/**
 * Handler para requisições POST na rota /api/analise.
 * 
 * @param request - Requisição HTTP com dados do cliente no corpo
 * @returns Resposta JSON com resultado da análise
 */
export async function POST(request: NextRequest) {
  try {
    // Parse do corpo da requisição
    const body: ClienteDados = await request.json();

    // Validação básica dos campos obrigatórios
    const { idade, rendaMensal, historicoDividas, valorEmprestimo } = body;

    if (
      idade === undefined ||
      rendaMensal === undefined ||
      !historicoDividas ||
      valorEmprestimo === undefined
    ) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios: idade, rendaMensal, historicoDividas, valorEmprestimo' },
        { status: 400 }
      );
    }

    // Validações de tipo e faixa de valores
    if (typeof idade !== 'number' || idade < 0 || idade > 150) {
      return NextResponse.json(
        { error: 'Idade deve ser um número válido entre 0 e 150' },
        { status: 400 }
      );
    }

    if (typeof rendaMensal !== 'number' || rendaMensal <= 0) {
      return NextResponse.json(
        { error: 'Renda mensal deve ser um número positivo' },
        { status: 400 }
      );
    }

    if (typeof valorEmprestimo !== 'number' || valorEmprestimo <= 0) {
      return NextResponse.json(
        { error: 'Valor do empréstimo deve ser um número positivo' },
        { status: 400 }
      );
    }

    if (!['limpo', 'negativado'].includes(historicoDividas)) {
      return NextResponse.json(
        { error: 'Histórico de dívidas deve ser "limpo" ou "negativado"' },
        { status: 400 }
      );
    }

    // Realiza a análise de crédito
    const resultado = analisarCredito(body);

    // Registra o log da análise com data/hora atual
    registrarLog({
      dataHora: new Date().toISOString(),
      clienteDados: body,
      resultado,
    });

    // Retorna o resultado para o cliente
    return NextResponse.json(resultado, { status: 200 });
  } catch (error) {
    // Log de erro no console para depuração
    console.error('Erro na análise de crédito:', error);

    return NextResponse.json(
      { error: 'Erro interno ao processar a análise de crédito' },
      { status: 500 }
    );
  }
}
