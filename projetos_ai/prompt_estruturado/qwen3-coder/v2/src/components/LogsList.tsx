'use client'

import { CreditLog } from '../business/creditAnalyzer'

interface LogsListProps {
  logs: CreditLog[]
}

export default function LogsList({ logs }: LogsListProps) {
  if (logs.length === 0) {
    return <p className="empty-logs">Nenhuma análise registrada ainda.</p>
  }

  return (
    <div>
      {logs.map((log) => (
        <div key={log.id} className="log-item">
          <div>
            <strong>
              {log.request.age} anos | R$ {log.request.monthlyIncome.toLocaleString('pt-BR')} | R$ {log.request.loanAmount.toLocaleString('pt-BR')}
            </strong>
            <div className="date">{log.timestamp}</div>
          </div>
          <span className={`result-badge ${log.result.approved ? 'approved' : 'rejected'}`}>
            {log.result.approved ? 'Aprovado' : 'Reprovado'}
          </span>
        </div>
      ))}
    </div>
  )
}
