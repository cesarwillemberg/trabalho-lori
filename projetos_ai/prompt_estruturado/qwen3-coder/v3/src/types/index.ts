// Tipos e interfaces para o sistema de análise de crédito

// Opções de histórico de dívidas
export type DebtHistory = 'limpo' | 'negativado';

// Dados de entrada do formulário de crédito
export interface CreditRequest {
  idade: number;
  rendaMensal: number;
  historicoDividas: DebtHistory;
  valorEmprestimo: number;
}

// Resultado individual de cada validação
export interface ValidationResult {
  regra: string;
  aprovado: boolean;
  mensagem: string;
}

// Resultado completo da análise de crédito
export interface CreditAnalysisResult {
  aprovado: boolean;
  valorParcela: number;
  percentualComprometimento: number;
  validacoes: ValidationResult[];
  dataHora: string;
}

// Log de análise para persistência
export interface AnalysisLog {
  id: string;
  dataHora: string;
  dadosCliente: CreditRequest;
  resultado: CreditAnalysisResult;
}

// Resposta da API
export interface ApiResponse {
  sucesso: boolean;
  dados?: CreditAnalysisResult;
  erro?: string;
}
