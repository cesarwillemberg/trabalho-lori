export interface CreditRequest {
  age: number
  monthlyIncome: number
  debtHistory: 'limpo' | 'negativado'
  loanAmount: number
}

export interface CreditResult {
  approved: boolean
  reasons: string[]
  installmentValue: number
  installmentPercentage: number
}

export interface CreditLog {
  id: string
  timestamp: string
  request: CreditRequest
  result: CreditResult
}

const MINIMUM_AGE = 18
const MAX_INSTALLMENT_PERCENTAGE = 30
const INSTALLMENTS = 12

export function validateAge(age: number): boolean {
  return age >= MINIMUM_AGE
}

export function calculateInstallment(loanAmount: number): number {
  return loanAmount / INSTALLMENTS
}

export function calculateInstallmentPercentage(
  installmentValue: number,
  monthlyIncome: number
): number {
  return (installmentValue / monthlyIncome) * 100
}

export function analyzeCredit(request: CreditRequest): CreditResult {
  const reasons: string[] = []
  let approved = true

  if (!validateAge(request.age)) {
    approved = false
    reasons.push(`Idade mínima de ${MINIMUM_AGE} anos não atingida (idade atual: ${request.age})`)
  }

  const installmentValue = calculateInstallment(request.loanAmount)
  const installmentPercentage = calculateInstallmentPercentage(
    installmentValue,
    request.monthlyIncome
  )

  if (installmentPercentage > MAX_INSTALLMENT_PERCENTAGE) {
    approved = false
    reasons.push(
      `Parcela de ${installmentPercentage.toFixed(1)}% da renda excede o limite de ${MAX_INSTALLMENT_PERCENTAGE}%`
    )
  }

  if (request.debtHistory === 'negativado') {
    approved = false
    reasons.push('Cliente possui histórico de dívidas negativado')
  }

  return {
    approved,
    reasons,
    installmentValue,
    installmentPercentage,
  }
}
