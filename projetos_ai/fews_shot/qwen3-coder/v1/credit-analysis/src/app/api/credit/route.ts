import { NextRequest, NextResponse } from 'next/server';
import { analyzeAndLogCredit } from '@/service/creditService';

/**
 * POST handler for credit analysis API endpoint
 * Receives credit application data and returns analysis result
 */
export async function POST(request: NextRequest) {
  try {
    // Parse request body
    const body = await request.json();
    
    // Extract and validate input data
    const { age, monthlyIncome, debtHistory, loanAmount } = body;
    
    // Validate required fields are present
    if (age === undefined || monthlyIncome === undefined || !debtHistory || loanAmount === undefined) {
      return NextResponse.json(
        { error: 'Todos os campos são obrigatórios: age, monthlyIncome, debtHistory, loanAmount' },
        { status: 400 }
      );
    }
    
    // Convert to numbers
    const requestData = {
      age: Number(age),
      monthlyIncome: Number(monthlyIncome),
      debtHistory: debtHistory as 'clean' | 'negative',
      loanAmount: Number(loanAmount)
    };
    
    // Perform credit analysis with logging
    const { result, log } = analyzeAndLogCredit(requestData);
    
    // Return successful response
    return NextResponse.json({
      success: true,
      result,
      logId: log.id
    });
    
  } catch (error) {
    // Handle unexpected errors
    console.error('Error processing credit analysis:', error);
    return NextResponse.json(
      { error: 'Erro interno ao processar análise de crédito' },
      { status: 500 }
    );
  }
}

/**
 * GET handler to retrieve credit analysis logs
 * Note: In Next.js App Router, localStorage only works on client side
 * This endpoint returns a message explaining logs are stored client-side
 */
export async function GET() {
  return NextResponse.json({
    message: 'Logs de análise de crédito são armazenados no localStorage do navegador',
    instruction: 'Acesse a interface web para visualizar o histórico de análises'
  });
}
