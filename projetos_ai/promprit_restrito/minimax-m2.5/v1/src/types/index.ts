export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface CreditResult {
  aprovado: boolean;
  valorParcela: number;
  percentualComprometido: number;
  motivo?: string;
}

export interface LogEntry {
  dataHora: string;
  dadosCliente: CreditRequest;
  resultado: CreditResult;
}