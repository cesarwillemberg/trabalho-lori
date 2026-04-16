// Tipos compartilhados entre todas as camadas da aplicação

export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface CreditResult {
  aprovado: boolean;
  motivo?: string;
  valorParcela: number;
  quantidadeParcelas: number;
}

export interface LogEntry {
  id: string;
  dataHora: string;
  cliente: CreditRequest;
  resultado: CreditResult;
}

export interface ValidationResult {
  valido: boolean;
  erros: string[];
}
