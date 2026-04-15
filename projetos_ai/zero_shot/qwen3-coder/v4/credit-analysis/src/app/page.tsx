'use client';

/**
 * Main Page - Credit Analysis Application
 * 
 * This page integrates the credit form and result display components.
 * It handles form submission, API communication, and state management.
 */

import { useState } from 'react';
import CreditForm from '@/components/CreditForm';
import AnalysisResult from '@/components/AnalysisResult';

/**
 * Interface for analysis result data
 */
interface AnalysisResultData {
  aprovado: boolean;
  motivos: string[];
  numeroParcelas: number;
  valorParcela: number;
  percentualRendaComprometida: number;
}

export default function Home() {
  // State for loading indicator
  const [loading, setLoading] = useState(false);
  
  // State for analysis result
  const [result, setResult] = useState<AnalysisResultData | null>(null);
  
  // State for error messages
  const [error, setError] = useState<string | null>(null);

  /**
   * Handles form submission and calls the API
   */
  const handleFormSubmit = async (formData: {
    idade: number;
    rendaMensal: number;
    historicoDividas: 'limpo' | 'negativado';
    valorEmprestimo: number;
  }) => {
    // Reset previous state
    setLoading(true);
    setResult(null);
    setError(null);

    try {
      // Send POST request to the analysis API
      const response = await fetch('/api/analise', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        // Handle validation errors or server errors
        if (data.detalhes) {
          setError(data.detalhes.join(', '));
        } else {
          setError(data.error || 'Erro ao processar análise de crédito');
        }
        return;
      }

      // Set the analysis result
      setResult({
        aprovado: data.aprovado,
        motivos: data.motivos,
        numeroParcelas: data.numeroParcelas,
        valorParcela: data.valorParcela,
        percentualRendaComprometida: data.percentualRendaComprometida,
      });

    } catch (err) {
      console.error('Error submitting form:', err);
      setError('Erro de conexão. Tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      <div className="container mx-auto px-4 py-12 max-w-2xl">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Análise de Crédito
          </h1>
          <p className="text-gray-600 text-lg">
            Preencha os dados abaixo para solicitar uma análise de crédito
          </p>
        </div>

        {/* Main Content Card */}
        <div className="bg-white rounded-xl shadow-lg p-8">
          <CreditForm onSubmit={handleFormSubmit} />
          
          <AnalysisResult 
            result={result} 
            loading={loading} 
            error={error} 
          />
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            A análise considera: idade mínima de 18 anos, parcelas não podem 
            comprometer mais de 30% da renda e histórico de dívidas limpo.
          </p>
        </div>
      </div>
    </div>
  );
}
