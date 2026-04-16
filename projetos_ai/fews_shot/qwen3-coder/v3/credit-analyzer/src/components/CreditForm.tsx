"use client";

import { useState, FormEvent } from "react";
import { CreditApplication, CreditAnalysisResult, DebtHistory } from "@/types";
import { validateCreditApplication } from "@/validation/creditValidation";
import { analyzeCredit } from "@/services/creditService";
import { saveCreditLog } from "@/repository/creditLogRepository";

interface FormState {
  age: string;
  monthlyIncome: string;
  debtHistory: string;
  loanAmount: string;
}

export default function CreditForm() {
  const [formData, setFormData] = useState<FormState>({
    age: "",
    monthlyIncome: "",
    debtHistory: "",
    loanAmount: "",
  });

  const [result, setResult] = useState<CreditAnalysisResult | null>(null);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (errors[name]) {
      setErrors((prev) => {
        const newErrors = { ...prev };
        delete newErrors[name];
        return newErrors;
      });
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const parsedData: CreditApplication = {
      age: Number(formData.age),
      monthlyIncome: Number(formData.monthlyIncome),
      debtHistory: formData.debtHistory as DebtHistory,
      loanAmount: Number(formData.loanAmount),
    };

    const validation = validateCreditApplication(parsedData);

    if (!validation.valid) {
      setErrors(validation.errors);
      setIsSubmitting(false);
      return;
    }

    await new Promise((resolve) => setTimeout(resolve, 500));

    const analysisResult = analyzeCredit(parsedData);
    setResult(analysisResult);

    saveCreditLog({
      timestamp: new Date().toISOString(),
      application: parsedData,
      result: analysisResult,
    });

    setIsSubmitting(false);
  };

  const handleReset = () => {
    setFormData({
      age: "",
      monthlyIncome: "",
      debtHistory: "",
      loanAmount: "",
    });
    setResult(null);
    setErrors({});
  };

  return (
    <div className="w-full max-w-md">
      <form
        onSubmit={handleSubmit}
        className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
      >
        <h2 className="text-2xl font-bold mb-6 text-gray-800 text-center">
          Análise de Crédito
        </h2>

        <div className="mb-4">
          <label
            htmlFor="age"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Idade
          </label>
          <input
            type="number"
            id="age"
            name="age"
            value={formData.age}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.age ? "border-red-500" : ""
            }`}
            placeholder="Ex: 25"
            min="0"
            max="150"
          />
          {errors.age && (
            <p className="text-red-500 text-xs italic mt-1">{errors.age}</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="monthlyIncome"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Renda Mensal (R$)
          </label>
          <input
            type="number"
            id="monthlyIncome"
            name="monthlyIncome"
            value={formData.monthlyIncome}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.monthlyIncome ? "border-red-500" : ""
            }`}
            placeholder="Ex: 3000"
            min="0"
            step="0.01"
          />
          {errors.monthlyIncome && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.monthlyIncome}
            </p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="debtHistory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Histórico de Dívidas
          </label>
          <select
            id="debtHistory"
            name="debtHistory"
            value={formData.debtHistory}
            onChange={handleChange}
            className={`shadow border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.debtHistory ? "border-red-500" : ""
            }`}
          >
            <option value="">Selecione...</option>
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
          {errors.debtHistory && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.debtHistory}
            </p>
          )}
        </div>

        <div className="mb-6">
          <label
            htmlFor="loanAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Valor do Empréstimo (R$)
          </label>
          <input
            type="number"
            id="loanAmount"
            name="loanAmount"
            value={formData.loanAmount}
            onChange={handleChange}
            className={`shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline ${
              errors.loanAmount ? "border-red-500" : ""
            }`}
            placeholder="Ex: 10000"
            min="0.01"
            step="0.01"
          />
          {errors.loanAmount && (
            <p className="text-red-500 text-xs italic mt-1">
              {errors.loanAmount}
            </p>
          )}
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {isSubmitting ? "Analisando..." : "Analisar Crédito"}
          </button>
        </div>

        {result && (
          <div className="mt-6 p-4 rounded-lg bg-gray-50 border border-gray-200">
            <div
              className={`text-xl font-bold text-center mb-4 ${
                result.approved ? "text-green-600" : "text-red-600"
              }`}
            >
              {result.approved ? "Aprovado" : "Reprovado"}
            </div>

            <div className="text-sm text-gray-600 space-y-2">
              <div className="flex justify-between">
                <span>Idade ({result.details.age} anos):</span>
                <span
                  className={
                    result.reasons.ageValid ? "text-green-600" : "text-red-600"
                  }
                >
                  {result.reasons.ageValid ? "OK (18+)" : "Reprovado (<18)"}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Parcela (12x):</span>
                <span
                  className={
                    result.reasons.installmentValid
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result.reasons.installmentValid
                    ? `R$ ${result.details.monthlyInstallment.toFixed(2)} (${result.details.installmentPercentage.toFixed(1)}%)`
                    : `R$ ${result.details.monthlyInstallment.toFixed(2)} (${result.details.installmentPercentage.toFixed(1)}%) - Excede 30%`}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Histórico:</span>
                <span
                  className={
                    result.reasons.debtHistoryValid
                      ? "text-green-600"
                      : "text-red-600"
                  }
                >
                  {result.reasons.debtHistoryValid ? "Limpo" : "Negativado"}
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={handleReset}
              className="mt-4 w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
            >
              Nova Análise
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
