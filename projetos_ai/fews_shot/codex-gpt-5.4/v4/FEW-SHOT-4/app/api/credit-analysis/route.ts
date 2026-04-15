import { NextResponse } from "next/server";
import { analyzeCredit } from "@/service/creditAnalysisService";
import { getAnalysisLogs, saveAnalysisLog } from "@/utils/logger";
import type { CreditAnalysisRequest } from "@/types/credit";

export const runtime = "nodejs";

export async function GET() {
  try {
    const logs = await getAnalysisLogs();

    return NextResponse.json({ logs });
  } catch (error) {
    console.error("Erro ao buscar logs de análise:", error);

    return NextResponse.json(
      { message: "Não foi possível carregar os logs." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as CreditAnalysisRequest;
    const result = analyzeCredit(body);

    await saveAnalysisLog({
      analyzedAt: new Date().toISOString(),
      customer: body,
      result
    });

    const logs = await getAnalysisLogs();

    return NextResponse.json({
      result,
      logs
    });
  } catch (error) {
    const message =
      error instanceof Error
        ? error.message
        : "Erro inesperado ao processar a análise.";

    return NextResponse.json({ message }, { status: 400 });
  }
}
