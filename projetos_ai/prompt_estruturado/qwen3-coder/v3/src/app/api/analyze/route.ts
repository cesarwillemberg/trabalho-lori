import { NextResponse } from 'next/server';
import { CreditRequest, ApiResponse } from '@/types';
import { analisarCredito } from '@/services/creditService';

export async function POST(request: Request): Promise<NextResponse<ApiResponse>> {
  try {
    const dados: CreditRequest = await request.json();

    if (!dados || typeof dados.idade !== 'number' || typeof dados.rendaMensal !== 'number') {
      return NextResponse.json(
        {
          sucesso: false,
          erro: 'Dados inválidos. Verifique os campos obrigatórios.',
        },
        { status: 400 }
      );
    }

    const resultado = analisarCredito(dados);

    return NextResponse.json({
      sucesso: true,
      dados: resultado,
    });
  } catch (erro) {
    console.error('Erro na API de análise:', erro);
    return NextResponse.json(
      {
        sucesso: false,
        erro: 'Erro interno do servidor ao processar a análise.',
      },
      { status: 500 }
    );
  }
}
