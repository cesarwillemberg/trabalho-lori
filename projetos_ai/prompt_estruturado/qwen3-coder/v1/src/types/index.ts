export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface CreditAnalysis {
  data: string;
  dadosCliente: CreditRequest;
  resultado: 'Aprovado' | 'Reprovado';
  detalhes: {
    idadeValida: boolean;
    parcelaComprometeRenda: boolean;
    historicoNegativado: boolean;
    valorParcela: number;
    percentualComprometimento: number;
  };
}

export interface ValidationResult {
  valido: boolean;
  erros: string[];
}
