"use client";

import { useState } from "react";
import { CreditRequest, CreditResult } from "@/types/credit";
import { analyzeCredit } from "@/services/creditService";

interface CreditFormProps {
  onResult: (result: CreditResult) => void;
}

export default function CreditForm({ onResult }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditRequest>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: "clean",
    loanAmount: 0
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "debtHistory" ? value : Number(value)
    }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Record<string, string> = {};
    if (!formData.age || formData.age < 18) {
      newErrors.age = "Idade mínima: 18 anos";
    }
    if (!formData.monthlyIncome || formData.monthlyIncome <= 0) {
      newErrors.monthlyIncome = "Informe uma renda mensal válida";
    }
    if (!formData.loanAmount || formData.loanAmount <= 0) {
      newErrors.loanAmount = "Informe um valor de empréstimo válido";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    const result = analyzeCredit(formData);
    onResult(result);
  };

  return (
    <form onSubmit={handleSubmit} className="form">
      <div className="form-group">
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age || ""}
          onChange={handleChange}
          min="0"
          max="120"
          placeholder="Digite sua idade"
        />
        {errors.age && <span className="error">{errors.age}</span>}
      </div>

      <div className="form-group">
        <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
        <input
          type="number"
          id="monthlyIncome"
          name="monthlyIncome"
          value={formData.monthlyIncome || ""}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Digite sua renda mensal"
        />
        {errors.monthlyIncome && (
          <span className="error">{errors.monthlyIncome}</span>
        )}
      </div>

      <div className="form-group">
        <label htmlFor="debtHistory">Histórico de Dívidas</label>
        <select
          id="debtHistory"
          name="debtHistory"
          value={formData.debtHistory}
          onChange={handleChange}
        >
          <option value="clean">Limpo</option>
          <option value="negative">Negativado</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount || ""}
          onChange={handleChange}
          min="0"
          step="0.01"
          placeholder="Digite o valor desejado"
        />
        {errors.loanAmount && (
          <span className="error">{errors.loanAmount}</span>
        )}
      </div>

      <button type="submit" className="submit-btn">
        Analisar Crédito
      </button>
    </form>
  );
}