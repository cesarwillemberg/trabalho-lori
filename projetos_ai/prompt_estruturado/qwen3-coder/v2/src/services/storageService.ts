import { CreditLog, CreditRequest, CreditResult } from '../business/creditAnalyzer'

const STORAGE_KEY = 'credit_analysis_logs'

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`
}

function getTimestamp(): string {
  return new Date().toLocaleString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
  })
}

export function saveAnalysisLog(
  request: CreditRequest,
  result: CreditResult
): CreditLog {
  const logs = getLogs()

  const newLog: CreditLog = {
    id: generateId(),
    timestamp: getTimestamp(),
    request,
    result,
  }

  logs.unshift(newLog)

  if (typeof window !== 'undefined') {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs))
  }

  return newLog
}

export function getLogs(): CreditLog[] {
  if (typeof window === 'undefined') {
    return []
  }

  const stored = localStorage.getItem(STORAGE_KEY)

  if (!stored) {
    return []
  }

  try {
    return JSON.parse(stored)
  } catch {
    console.error('Erro ao carregar logs do localStorage')
    return []
  }
}

export function clearLogs(): void {
  if (typeof window !== 'undefined') {
    localStorage.removeItem(STORAGE_KEY)
  }
}
