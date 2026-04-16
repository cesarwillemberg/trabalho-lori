/**
 * Tipos centrais do domínio de análise de crédito
 */

export interface ClientData {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}

export interface CreditAnalysisResult {
  aprovado: boolean;
  motivoReprovacao: string[];
  detalhes: {
    valorParcela: number;
    percentualComprometimento: number;
    idadeValida: boolean;
    historicoValido: boolean;
    parcelaValida: boolean;
  };
}

export interface CreditAnalysisLog {
  id: string;
  dataHora: string;
  cliente: ClientData;
  resultado: CreditAnalysisResult;
}

export interface StorageRepository {
  saveLog(log: CreditAnalysisLog): void;
  getLogs(): CreditAnalysisLog[];
  clearLogs(): void;
}
