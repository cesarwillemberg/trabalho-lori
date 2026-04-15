export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface CreditResult {
  aprovado: boolean;
  motivo?: string;
  valorParcela?: number;
  percentualComprometido?: number;
}

export interface CreditLog {
  dataHora: string;
  cliente: CreditRequest;
  resultado: CreditResult;
}

export interface ValidationError {
  campo: string;
  mensagem: string;
}