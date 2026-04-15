'use client';

import { useState } from 'react';

/**
 * Main page component for the Credit Analysis application
 * Contains the form and client-side analysis logic
 */
export default function Home() {
  // Form state
  const [age, setAge] = useState('');
  const [monthlyIncome, setMonthlyIncome] = useState('');
  const [debtHistory, setDebtHistory] = useState<'clean' | 'negative'>('clean');
  const [loanAmount, setLoanAmount] = useState('');
  
  // Result state
  const [result, setResult] = useState<{
    approved: boolean;
    message: string;
    details: any;
  } | null>(null);
  
  // Loading state
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Handles form submission
   * Performs client-side credit analysis
   */
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate form data
    const ageNum = Number(age);
    const incomeNum = Number(monthlyIncome);
    const loanNum = Number(loanAmount);
    
    if (!age || !monthlyIncome || !loanAmount) {
      alert('Por favor, preencha todos os campos');
      return;
    }
    
    if (isNaN(ageNum) || isNaN(incomeNum) || isNaN(loanNum)) {
      alert('Por favor, insira valores numéricos válidos');
      return;
    }
    
    if (ageNum <= 0 || incomeNum <= 0 || loanNum <= 0) {
      alert('Os valores devem ser positivos');
      return;
    }
    
    // Set loading state
    setIsLoading(true);
    setResult(null);
    
    try {
      // Import the service function for client-side analysis
      const { analyzeAndLogCredit } = await import('@/service/creditService');
      
      // Perform credit analysis
      const { result: analysisResult } = analyzeAndLogCredit({
        age: ageNum,
        monthlyIncome: incomeNum,
        debtHistory,
        loanAmount: loanNum
      });
      
      // Update result state
      setResult(analysisResult);
    } catch (error) {
      console.error('Error during credit analysis:', error);
      alert('Erro ao realizar análise de crédito');
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Formats currency values for display
   */
  const formatCurrency = (value: number): string => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value);
  };

  return (
    <main className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-10 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Análise de Crédito
          </h1>
          <p className="text-gray-600">
            Sistema de avaliação de crédito para empréstimos
          </p>
        </div>

        {/* Form Card */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
          <h2 className="text-2xl font-semibold text-gray-800 mb-6">
            Formulário de Análise
          </h2>
          
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Age Field */}
            <div>
              <label htmlFor="age" className="block text-sm font-medium text-gray-700 mb-2">
                Idade
              </label>
              <input
                type="number"
                id="age"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                placeholder="Ex: 25"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                required
              />
            </div>

            {/* Monthly Income Field */}
            <div>
              <label htmlFor="monthlyIncome" className="block text-sm font-medium text-gray-700 mb-2">
                Renda Mensal (R$)
              </label>
              <input
                type="number"
                id="monthlyIncome"
                value={monthlyIncome}
                onChange={(e) => setMonthlyIncome(e.target.value)}
                placeholder="Ex: 5000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Debt History Field */}
            <div>
              <label htmlFor="debtHistory" className="block text-sm font-medium text-gray-700 mb-2">
                Histórico de Dívidas
              </label>
              <select
                id="debtHistory"
                value={debtHistory}
                onChange={(e) => setDebtHistory(e.target.value as 'clean' | 'negative')}
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                required
              >
                <option value="clean">Limpo (Sem restrições)</option>
                <option value="negative">Negativado (Com restrições)</option>
              </select>
            </div>

            {/* Loan Amount Field */}
            <div>
              <label htmlFor="loanAmount" className="block text-sm font-medium text-gray-700 mb-2">
                Valor do Empréstimo Solicitado (R$)
              </label>
              <input
                type="number"
                id="loanAmount"
                value={loanAmount}
                onChange={(e) => setLoanAmount(e.target.value)}
                placeholder="Ex: 10000"
                className="w-full px-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                min="0"
                step="0.01"
                required
              />
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 px-6 rounded-md transition duration-200 disabled:bg-gray-400 disabled:cursor-not-allowed"
            >
              {isLoading ? 'Analisando...' : 'Solicitar Análise de Crédito'}
            </button>
          </form>
        </div>

        {/* Result Card */}
        {result && (
          <div className={`bg-white rounded-lg shadow-lg p-8 border-l-4 ${
            result.approved ? 'border-green-500' : 'border-red-500'
          }`}>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Resultado da Análise
            </h2>
            
            {/* Approval Status */}
            <div className={`p-4 rounded-md mb-6 ${
              result.approved ? 'bg-green-50' : 'bg-red-50'
            }`}>
              <p className={`text-lg font-semibold ${
                result.approved ? 'text-green-800' : 'text-red-800'
              }`}>
                {result.approved ? '✓ APROVADO' : '✗ REPROVADO'}
              </p>
              <p className={`mt-2 ${
                result.approved ? 'text-green-700' : 'text-red-700'
              }`}>
                {result.message}
              </p>
            </div>

            {/* Analysis Details */}
            <div className="bg-gray-50 rounded-md p-4">
              <h3 className="font-semibold text-gray-800 mb-3">Detalhes da Análise:</h3>
              <ul className="space-y-2 text-sm text-gray-700">
                <li className="flex justify-between">
                  <span>Maior de idade (18+):</span>
                  <span className={result.details.isAdult ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {result.details.isAdult ? 'Sim ✓' : 'Não ✗'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Valor da parcela (12x):</span>
                  <span className="font-medium">
                    {formatCurrency(result.details.installmentValue)}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Comprometimento da renda:</span>
                  <span className={result.details.isWithinIncomeLimit ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {result.details.incomeCommitment.toFixed(1)}%
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Dentro do limite (30%):</span>
                  <span className={result.details.isWithinIncomeLimit ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {result.details.isWithinIncomeLimit ? 'Sim ✓' : 'Não ✗'}
                  </span>
                </li>
                <li className="flex justify-between">
                  <span>Histórico de dívidas:</span>
                  <span className={result.details.hasCleanDebtHistory ? 'text-green-600 font-medium' : 'text-red-600 font-medium'}>
                    {result.details.hasCleanDebtHistory ? 'Limpo ✓' : 'Negativado ✗'}
                  </span>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </main>
  );
}
