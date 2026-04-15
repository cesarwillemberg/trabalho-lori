import { NextResponse } from "next/server";
import { analyzeCredit, normalizeCreditInput } from "@/lib/credit-analysis";
import { appendAnalysisLog, readAnalysisLogs } from "@/lib/log-service";

export async function POST(request) {
  try {
    const body = await request.json();
    const clientData = normalizeCreditInput(body);
    const analysis = analyzeCredit(clientData);

    await appendAnalysisLog({
      timestamp: new Date().toISOString(),
      client: clientData,
      result: analysis
    });

    const logs = await readAnalysisLogs();

    return NextResponse.json({
      analysis,
      logs
    });
  } catch (error) {
    return NextResponse.json(
      {
        error: error.message || "Não foi possível concluir a análise."
      },
      { status: 400 }
    );
  }
}
