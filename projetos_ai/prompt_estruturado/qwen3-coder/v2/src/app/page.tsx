'use client'

import { useState, useEffect } from 'react'
import CreditForm from '../components/CreditForm'
import ResultDisplay from '../components/ResultDisplay'
import LogsList from '../components/LogsList'
import { CreditRequest, CreditResult, CreditLog, analyzeCredit } from '../business/creditAnalyzer'
import { saveAnalysisLog, getLogs } from '../services/storageService'

export default function Home() {
  const [result, setResult] = useState<CreditResult | null>(null)
  const [logs, setLogs] = useState<CreditLog[]>([])
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    setLogs(getLogs())
  }, [])

  const handleSubmit = (request: CreditRequest) => {
    setIsSubmitting(true)

    setTimeout(() => {
      const creditResult = analyzeCredit(request)

      saveAnalysisLog(request, creditResult)

      setResult(creditResult)
      setLogs(getLogs())
      setIsSubmitting(false)
    }, 500)
  }

  return (
    <main className="container">
      <div className="card">
        <div className="header">
          <h1>Análise de Crédito</h1>
          <p>
            Preencha os dados abaixo para verificar se seu crédito será aprovado
          </p>
        </div>

        <CreditForm onSubmit={handleSubmit} isSubmitting={isSubmitting} />

        {result && <ResultDisplay result={result} />}
      </div>

      <div className="logs-section">
        <h3>Histórico de Análises</h3>
        <LogsList logs={logs} />
      </div>
    </main>
  )
}
