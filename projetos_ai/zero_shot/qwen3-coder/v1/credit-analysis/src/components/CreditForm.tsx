"use client";

/**
 * Componente de formulário para análise de crédito.
 * 
 * Coleta os dados do cliente: idade, renda mensal, histórico de dívidas
 * e valor do empréstimo solicitado.
 */

import { useState, FormEvent, ChangeEvent } from "react";
import { CreditFormData } from "@/types";

interface CreditFormProps {
  /** Função chamada quando o formulário é enviado com sucesso */
  onSubmit: (dados: CreditFormData) => void;
}

/** Dados iniciais do formulário */
const initialState: CreditFormData = {
  idade: 0,
  rendaMensal: 0,
  historicoDividas: "limpo",
  valorEmprestimo: 0,
};

export default function CreditForm({ onSubmit }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditFormData>(initialState);

  /**
   * Handler genérico para atualizar campos numéricos do formulário.
   */
  const handleNumberChange = (field: keyof CreditFormData) => (
    e: ChangeEvent<HTMLInputElement>
  ) => {
    const value = parseFloat(e.target.value) || 0;
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  /**
   * Handler para atualizar o campo de histórico de dívidas (select).
   */
  const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
    setFormData((prev) => ({
      ...prev,
      historicoDividas: e.target.value as "limpo" | "negativado",
    }));
  };

  /**
   * Handler de submissão do formulário.
   * Previne o comportamento padrão e chama a função onSubmit.
   */
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="credit-form">
      <h2 className="form-title">Solicitar Análise de Crédito</h2>

      {/* Campo: Idade */}
      <div className="form-group">
        <label htmlFor="idade" className="form-label">
          Idade (anos)
        </label>
        <input
          id="idade"
          type="number"
          min="0"
          value={formData.idade || ""}
          onChange={handleNumberChange("idade")}
          className="form-input"
          placeholder="Ex: 25"
          required
        />
      </div>

      {/* Campo: Renda Mensal */}
      <div className="form-group">
        <label htmlFor="rendaMensal" className="form-label">
          Renda Mensal (R$)
        </label>
        <input
          id="rendaMensal"
          type="number"
          min="0"
          step="0.01"
          value={formData.rendaMensal || ""}
          onChange={handleNumberChange("rendaMensal")}
          className="form-input"
          placeholder="Ex: 5000.00"
          required
        />
      </div>

      {/* Campo: Histórico de Dívidas */}
      <div className="form-group">
        <label htmlFor="historicoDividas" className="form-label">
          Histórico de Dívidas
        </label>
        <select
          id="historicoDividas"
          value={formData.historicoDividas}
          onChange={handleSelectChange}
          className="form-select"
          required
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      {/* Campo: Valor do Empréstimo */}
      <div className="form-group">
        <label htmlFor="valorEmprestimo" className="form-label">
          Valor do Empréstimo (R$)
        </label>
        <input
          id="valorEmprestimo"
          type="number"
          min="0"
          step="0.01"
          value={formData.valorEmprestimo || ""}
          onChange={handleNumberChange("valorEmprestimo")}
          className="form-input"
          placeholder="Ex: 10000.00"
          required
        />
      </div>

      {/* Botão de Envio */}
      <button type="submit" className="submit-button">
        Analisar Crédito
      </button>
    </form>
  );
}
