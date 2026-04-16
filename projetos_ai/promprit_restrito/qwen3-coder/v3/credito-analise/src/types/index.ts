export interface Cliente {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface AnaliseCredito {
  id: string;
  timestamp: string;
  cliente: Cliente;
  valorParcela: number;
  resultado: 'Aprovado' | 'Reprovado';
  motivos: string[];
}

export interface ValidationResult {
  isValid: boolean;
  errors: string[];
}