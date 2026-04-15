'use client';

/**
 * Analysis Result Component
 * 
 * This component displays the result of a credit analysis,
 * showing whether the credit was approved or rejected,
 * along with detailed reasons and installment information.
 */

/**
 * Interface defining the analysis result data structure
 */
interface AnalysisResultData {
  /** Whether the credit was approved */
  aprovado: boolean;
  /** Array of reasons for the decision */
  motivos: string[];
  /** Number of installments */
  numeroParcelas: number;
  /** Value of each installment */
  valorParcela: number;
  /** Percentage of income committed to installments */
  percentualRendaComprometida: number;
}

/**
 * Props for the AnalysisResult component
 */
interface AnalysisResultProps {
  /** The analysis result data to display */
  result: AnalysisResultData | null;
  /** Whether the analysis is currently loading */
  loading: boolean;
  /** Error message if analysis failed */
  error: string | null;
}

export default function AnalysisResult({ result, loading, error }: AnalysisResultProps) {
  // Show loading state
  if (loading) {
    return (
      <div className="mt-8 p-6 bg-gray-50 rounded-lg">
        <div className="flex items-center justify-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-gray-600">Analisando crédito...</span>
        </div>
      </div>
    );
  }

  // Show error state
  if (error) {
    return (
      <div className="mt-8 p-6 bg-red-50 border border-red-200 rounded-lg">
        <h3 className="text-lg font-semibold text-red-800 mb-2">Erro</h3>
        <p className="text-red-700">{error}</p>
      </div>
    );
  }

  // Don't show anything if there's no result
  if (!result) {
    return null;
  }

  // Format currency for display
  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(value);
  };

  return (
    <div className={`mt-8 p-6 rounded-lg border-2 ${
      result.aprovado 
        ? 'bg-green-50 border-green-200' 
        : 'bg-red-50 border-red-200'
    }`}>
      {/* Result Header */}
      <div className="flex items-center mb-4">
        {result.aprovado ? (
          <>
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <h3 className="ml-3 text-2xl font-bold text-green-800">Aprovado</h3>
          </>
        ) : (
          <>
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 14l2-2m0 0l2-2m0 0l2 2m0 0l2 2m0 0l-2 2m0 0l-2-2m0 0l-2 2" />
            </svg>
            <h3 className="ml-3 text-2xl font-bold text-red-800">Reprovado</h3>
          </>
        )}
      </div>

      {/* Reasons List */}
      <div className="mb-4">
        <h4 className="font-semibold text-gray-700 mb-2">Motivos:</h4>
        <ul className="list-disc list-inside space-y-1">
          {result.motivos.map((motivo, index) => (
            <li key={index} className="text-gray-700">{motivo}</li>
          ))}
        </ul>
      </div>

      {/* Installment Details */}
      <div className="pt-4 border-t border-gray-300">
        <h4 className="font-semibold text-gray-700 mb-2">Detalhes do Empréstimo:</h4>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-3 rounded">
            <p className="text-sm text-gray-600">Número de Parcelas</p>
            <p className="text-lg font-semibold text-gray-800">{result.numeroParcelas}x</p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="text-sm text-gray-600">Valor da Parcela</p>
            <p className="text-lg font-semibold text-gray-800">
              {formatCurrency(result.valorParcela)}
            </p>
          </div>
          <div className="bg-white p-3 rounded">
            <p className="text-sm text-gray-600">Renda Comprometida</p>
            <p className="text-lg font-semibold text-gray-800">
              {result.percentualRendaComprometida.toFixed(1)}%
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
