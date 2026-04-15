import { NextResponse } from 'next/server';
import { CreditAnalysisService } from '@/business_logic/creditAnalysis';
import { LocalStoragePersistence } from '@/persistence/localStoragePersistence';

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idade, rendaMensal, historicoDivida, valorEmprestimo } = body;

    const service = new CreditAnalysisService();
    const result = service.analyze({
      idade,
      rendaMensal,
      historicoDivida,
      valorEmprestimo,
    });

    const persistence = new LocalStoragePersistence();
    persistence.save(result);

    return NextResponse.json(result);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao processar análise de crédito' },
      { status: 500 }
    );
  }
}

export async function GET() {
  try {
    const persistence = new LocalStoragePersistence();
    const logs = persistence.getAll();
    return NextResponse.json(logs);
  } catch (error) {
    return NextResponse.json(
      { error: 'Erro ao buscar logs' },
      { status: 500 }
    );
  }
}