'use client'

import { useState } from 'react'
import { CreditRequest } from '../business/creditAnalyzer'

interface CreditFormProps {
  onSubmit: (request: CreditRequest) => void
  isSubmitting: boolean
}

export default function CreditForm({ onSubmit, isSubmitting }: CreditFormProps) {
  const [formData, setFormData] = useState<CreditRequest>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: 'limpo',
    loanAmount: 0,
  })

  const [errors, setErrors] = useState<Partial<Record<keyof CreditRequest, string>>>({})

  const validateForm = (): boolean => {
    const newErrors: Partial<Record<keyof CreditRequest, string>> = {}

    if (!formData.age || formData.age < 1) {
      newErrors.age = 'Informe uma idade válida'
    }

    if (!formData.monthlyIncome || formData.monthlyIncome < 1) {
      newErrors.monthlyIncome = 'Informe uma renda mensal válida'
    }

    if (!formData.loanAmount || formData.loanAmount < 1) {
      newErrors.loanAmount = 'Informe um valor de empréstimo válido'
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      onSubmit(formData)
    }
  }

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setFormData((prev) => ({
      ...prev,
      [name]: name === 'debtHistory' ? value : parseFloat(value) || 0,
    }))

    if (errors[name as keyof CreditRequest]) {
      setErrors((prev) => ({
        ...prev,
        [name]: undefined,
      }))
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="form-group">
        <label htmlFor="age">Idade</label>
        <input
          type="number"
          id="age"
          name="age"
          value={formData.age || ''}
          onChange={handleChange}
          placeholder="Ex: 25"
          min="1"
        />
        {errors.age && <p className="error">{errors.age}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
        <input
          type="number"
          id="monthlyIncome"
          name="monthlyIncome"
          value={formData.monthlyIncome || ''}
          onChange={handleChange}
          placeholder="Ex: 3000"
          min="1"
          step="0.01"
        />
        {errors.monthlyIncome && <p className="error">{errors.monthlyIncome}</p>}
      </div>

      <div className="form-group">
        <label htmlFor="debtHistory">Histórico de Dívidas</label>
        <select
          id="debtHistory"
          name="debtHistory"
          value={formData.debtHistory}
          onChange={handleChange}
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div className="form-group">
        <label htmlFor="loanAmount">Valor do Empréstimo (R$)</label>
        <input
          type="number"
          id="loanAmount"
          name="loanAmount"
          value={formData.loanAmount || ''}
          onChange={handleChange}
          placeholder="Ex: 10000"
          min="1"
          step="0.01"
        />
        {errors.loanAmount && <p className="error">{errors.loanAmount}</p>}
      </div>

      <button type="submit" className="btn" disabled={isSubmitting}>
        {isSubmitting ? 'Analisando...' : 'Analisar Crédito'}
      </button>
    </form>
  )
}
