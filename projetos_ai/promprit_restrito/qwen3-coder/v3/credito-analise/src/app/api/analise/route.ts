import { NextRequest, NextResponse } from 'next/server';
import * as Service from '@/core/service';

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();

    const resultado = Service.processarAnaliseCredito(body);

    if (!resultado.sucesso) {
      return NextResponse.json(
        { sucesso: false, erros: resultado.erros },
        { status: 400 }
      );
    }

    return NextResponse.json({ sucesso: true, analise: resultado.analise });
  } catch (error) {
    return NextResponse.json(
      { sucesso: false, erros: ['Erro interno do servidor'] },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const analises = Service.obterHistoricoAnalises();
    return NextResponse.json({ sucesso: true, analises });
  } catch {
    return NextResponse.json(
      { sucesso: false, erros: ['Erro ao buscar histórico'] },
      { status: 500 }
    );
  }
}