import { CreditAnalysisRequest, CreditAnalysisResult } from '@/types';

interface ResultDisplayProps {
  request: CreditAnalysisRequest;
  result: CreditAnalysisResult;
}

export function ResultDisplay({ request, result }: ResultDisplayProps) {
  const statusClass = result.approved
    ? 'bg-green-100 border-green-500 text-green-800'
    : 'bg-red-100 border-red-500 text-red-800';

  return (
    <div className={`mt-6 p-4 border-l-4 rounded ${statusClass}`}>
      <h2 className="text-xl font-bold mb-2">
        {result.approved ? 'Aprovado' : 'Reprovado'}
      </h2>

      <div className="space-y-2 text-sm">
        <p><strong>Parcela mensal:</strong> R$ {result.monthlyPayment.toFixed(2)}</p>
        <p><strong>% da renda:</strong> {result.incomePercentage}%</p>
        
        <div className="mt-3">
          <strong>Motivos:</strong>
          <ul className="list-disc list-inside mt-1">
            {result.reasons.map((reason, index) => (
              <li key={index}>{reason}</li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}