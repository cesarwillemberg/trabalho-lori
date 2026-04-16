import { CreditApplication, CreditAnalysisResult, CreditAnalysisLog } from '@/types';
import { 
  validateMinimumAge, 
  validateDebtHistory, 
  validateMonthlyIncome 
} from '@/validation';
import { 
  calculateMonthlyInstallment, 
  calculateInstallmentPercentage,
  generateUniqueId,
  getCurrentTimestamp
} from '@/utils';
import { saveToLocalStorage, getAllLogs } from '@/repository';

const MAX_ALLOWED_PERCENTAGE = 30;

export function analyzeCredit(application: CreditApplication): CreditAnalysisResult {
  const installmentAmount = calculateMonthlyInstallment(application.loanAmount);
  const installmentPercentage = calculateInstallmentPercentage(
    installmentAmount,
    application.monthlyIncome
  );

  const ageValid = validateMinimumAge(application.age);
  const debtHistoryValid = validateDebtHistory(application.debtHistory);
  const incomeValid = validateMonthlyIncome(
    application.loanAmount,
    application.monthlyIncome,
    installmentAmount
  );

  const reasons = {
    ageValid,
    debtHistoryValid,
    incomeValid
  };

  const approved = ageValid && debtHistoryValid && incomeValid;

  let message = '';
  if (approved) {
    message = 'Credito aprovado! Todos os criterios foram atendidos.';
  } else {
    const failedReasons: string[] = [];
    
    if (!ageValid) {
      failedReasons.push('Idade minima nao atingida (18 anos)');
    }
    if (!debtHistoryValid) {
      failedReasons.push('Cliente com historico negativado');
    }
    if (!incomeValid) {
      failedReasons.push(
        `Parcela de ${installmentPercentage.toFixed(2)}% excede limite de ${MAX_ALLOWED_PERCENTAGE}% da renda`
      );
    }
    
    message = `Credito reprovado: ${failedReasons.join('; ')}`;
  }

  return {
    approved,
    reasons,
    details: {
      installmentAmount,
      installmentPercentage,
      maxAllowedPercentage: MAX_ALLOWED_PERCENTAGE
    },
    message
  };
}

export function processCreditApplication(
  application: CreditApplication
): CreditAnalysisResult {
  const result = analyzeCredit(application);
  
  const log: CreditAnalysisLog = {
    id: generateUniqueId(),
    timestamp: getCurrentTimestamp(),
    application,
    result
  };

  saveToLocalStorage(log);

  return result;
}

export function getAnalysisHistory(): CreditAnalysisLog[] {
  return getAllLogs();
}
