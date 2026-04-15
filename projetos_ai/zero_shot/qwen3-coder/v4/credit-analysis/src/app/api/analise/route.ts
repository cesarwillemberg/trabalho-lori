/**
 * API Route for Credit Analysis
 * 
 * This route handles POST requests for credit analysis.
 * It validates input data, performs the credit analysis,
 * logs the result, and returns the analysis outcome.
 * 
 * Endpoint: POST /api/analise
 */

import { NextRequest, NextResponse } from 'next/server';
import {
  analisarCredito,
  validarDadosCredito,
  CreditAnalysisRequest,
} from '@/lib/creditAnalysis';
import { createAndSaveLog } from '@/lib/logger';

/**
 * Handles POST requests for credit analysis
 * 
 * @param request - The incoming HTTP request
 * @returns JSON response with analysis result or error
 */
export async function POST(request: NextRequest) {
  try {
    // Parse the request body
    const body: CreditAnalysisRequest = await request.json();

    // Validate input data
    const validationErrors = validarDadosCredito(body);
    if (validationErrors.length > 0) {
      return NextResponse.json(
        { 
          error: 'Dados inválidos', 
          detalhes: validationErrors 
        },
        { status: 400 }
      );
    }

    // Perform credit analysis
    const resultado = analisarCredito(body);

    // Log the analysis result
    const logEntry = createAndSaveLog(
      {
        idade: body.idade,
        rendaMensal: body.rendaMensal,
        historicoDividas: body.historicoDividas,
        valorEmprestimo: body.valorEmprestimo,
      },
      resultado
    );

    // Return the analysis result
    return NextResponse.json({
      logId: logEntry.id,
      aprovado: resultado.aprovado,
      motivos: resultado.motivos,
      numeroParcelas: resultado.numeroParcelas,
      valorParcela: resultado.valorParcela,
      percentualRendaComprometida: resultado.percentualRendaComprometida,
    });

  } catch (error) {
    console.error('Error processing credit analysis:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar análise de crédito' },
      { status: 500 }
    );
  }
}
