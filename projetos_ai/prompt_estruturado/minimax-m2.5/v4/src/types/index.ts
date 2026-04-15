export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface CreditAnalysisResult {
  aprovado: boolean;
  valorParcela: number;
  percentualComprometido: number;
  motivo?: string;
  timestamp: string;
}

export interface LogEntry {
  id: string;
  dataHora: string;
  dadosCliente: CreditRequest;
  resultado: CreditAnalysisResult;
}
