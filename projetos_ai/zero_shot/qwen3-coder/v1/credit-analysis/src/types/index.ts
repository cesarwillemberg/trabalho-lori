/**
 * Tipos TypeScript para a aplicação de análise de crédito.
 * Define as interfaces usadas em toda a aplicação.
 */

/** Representa os dados do formulário de análise de crédito */
export interface CreditFormData {
  /** Idade do cliente em anos */
  idade: number;
  /** Renda mensal do cliente em reais */
  rendaMensal: number;
  /** Histórico de dívidas: "limpo" ou "negativado" */
  historicoDividas: "limpo" | "negativado";
  /** Valor do empréstimo solicitado */
  valorEmprestimo: number;
}

/** Resultado da análise de crédito */
export interface CreditAnalysisResult {
  /** Indica se o crédito foi aprovado */
  aprovado: boolean;
  /** Número de parcelas fixo para o empréstimo */
  numeroParcelas: number;
  /** Valor de cada parcela */
  valorParcela: number;
  /** Percentual da renda comprometido pela parcela */
  percentualComprometido: number;
  /** Lista de motivos de reprovação (vazio se aprovado) */
  motivosReprovacao: string[];
}

/** Registro de log de uma análise realizada */
export interface AnalysisLog {
  /** Identificador único do log */
  id: string;
  /** Data e hora da análise */
  dataHora: string;
  /** Dados do cliente usados na análise */
  dadosCliente: CreditFormData;
  /** Resultado da análise */
  resultado: CreditAnalysisResult;
}
