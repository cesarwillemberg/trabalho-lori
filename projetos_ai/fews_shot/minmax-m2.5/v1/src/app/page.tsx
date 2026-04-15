"use client"

import { useState, useEffect, FormEvent } from "react"
import { CreditFormData, validateCreditForm } from "../validation/creditValidation"
import { processCredit, CreditAnalysisResult } from "../service/creditService"
import { CreditLogEntry, createLogEntry, getLogs, clearLogs, formatLogForDisplay } from "../utils/logger"
import { saveCreditLog, getCreditLogs, clearCreditLogs, LOGS_STORAGE_KEY } from "../repository/localStorageRepository"

export default function Home() {
  const [formData, setFormData] = useState<CreditFormData>({
    age: 0,
    monthlyIncome: 0,
    debtHistory: "",
    loanAmount: 0
  })
  const [result, setResult] = useState<CreditAnalysisResult | null>(null)
  const [validationErrors, setValidationErrors] = useState<string[]>([])
  const [logs, setLogs] = useState<ReturnType<typeof formatLogForDisplay>[]>([])
  const [showLogs, setShowLogs] = useState(false)

  useEffect(() => {
    const storedLogs = getLogs(LOGS_STORAGE_KEY)
    const formatted = storedLogs.map(formatLogForDisplay).reverse()
    setLogs(formatted)
  }, [result])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: name === "debtHistory" ? value : Number(value)
    }))
    setValidationErrors([])
    setResult(null)
  }

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    setValidationErrors([])
    setResult(null)

    const validation = validateCreditForm(formData)
    if (!validation.isValid) {
      setValidationErrors(validation.errors)
      return
    }

    const analysisResult = processCredit(formData)
    setResult(analysisResult)

    const logEntry = createLogEntry(formData, analysisResult)
    saveCreditLog(logEntry)

    const storedLogs = getLogs(LOGS_STORAGE_KEY)
    const formatted = storedLogs.map(formatLogForDisplay).reverse()
    setLogs(formatted)
  }

  const handleClearLogs = () => {
    clearCreditLogs()
    setLogs([])
  }

  return (
    <>
      <header className="header">
        <div className="container">
          <h1>Análise de Crédito</h1>
        </div>
      </header>

      <main className="main">
        <div className="container">
          <div className="card">
            <h2>Formulário de Análise</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="age">Idade</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={formData.age || ""}
                  onChange={handleInputChange}
                  placeholder="Digite sua idade"
                  min="1"
                  max="150"
                />
              </div>

              <div className="form-group">
                <label htmlFor="monthlyIncome">Renda Mensal (R$)</label>
                <input
                  type="number"
                  id="monthlyIncome"
                  name="monthlyIncome"
                  value={formData.monthlyIncome || ""}
                  onChange={handleInputChange}
                  placeholder="Digite sua renda mensal"
                  min="0"
                  step="0.01"
                />
              </div>

              <div className="form-group">
                <label htmlFor="debtHistory">Histórico de Dívidas</label>
                <select
                  id="debtHistory"
                  name="debtHistory"
                  value={formData.debtHistory}
                  onChange={handleInputChange}
                >
                  <option value="">Selecione...</option>
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
                  value={formData.loanAmount || ""}
                  onChange={handleInputChange}
                  placeholder="Digite o valor solicitados"
                  min="0"
                  step="0.01"
                />
              </div>

              {validationErrors.length > 0 && (
                <div className="result rejected">
                  <div className="result-title">Erro de Validação</div>
                  <ul className="result-reasons">
                    {validationErrors.map((error, index) => (
                      <li key={index}>{error}</li>
                    ))}
                  </ul>
                </div>
              )}

              {result && (
                <div className={`result ${result.approved ? "approved" : "rejected"}`}>
                  <div className="result-title">
                    {result.approved ? "Aprovado" : "Reprovado"}
                  </div>
                  <div className="result-message">{result.message}</div>
                  <div className="result-details">
                    <p>Valor da parcela: R$ {result.installmentAmount.toFixed(2)}</p>
                    <p>
                      Percentual da renda: {(result.incomePercentage * 100).toFixed(1)}%
                    </p>
                  </div>
                  {result.reasons.length > 0 && (
                    <ul className="result-reasons">
                      {result.reasons.map((reason, index) => (
                        <li key={index}>{reason}</li>
                      ))}
                    </ul>
                  )}
                </div>
              )}

              <button type="submit" className="btn">
                Analisar Crédito
              </button>
            </form>
          </div>

          <div className="logs-section">
            <div className="logs-header">
              <h3>Histórico de Análises ({logs.length})</h3>
              {logs.length > 0 && (
                <button className="btn-clear" onClick={handleClearLogs}>
                  Limpar Logs
                </button>
              )}
            </div>

            {logs.length === 0 ? (
              <div className="empty-logs">
                Nenhuma análise realizada ainda.
              </div>
            ) : (
              <ul className="logs-list">
                {logs.map((log, index) => (
                  <li key={index} className="log-item">
                    <div className="log-item-header">
                      <span className="log-item-date">{log.date}</span>
                      <span
                        className={`log-item-status ${log.status}`}
                      >
                        {log.result}
                      </span>
                    </div>
                    <div className="log-item-data">
                      <p>
                        <span>Idade:</span> {log.age} anos
                      </p>
                      <p>
                        <span>Renda:</span> {log.income}
                      </p>
                      <p>
                        <span>Histórico:</span> {log.debtHistory}
                      </p>
                      <p>
                        <span>Empréstimo:</span> {log.loanAmount}
                      </p>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      </main>

      <footer className="footer">
        <div className="container">
          <p>© 2024 Sistema de Análise de Crédito</p>
        </div>
      </footer>
    </>
  )
}