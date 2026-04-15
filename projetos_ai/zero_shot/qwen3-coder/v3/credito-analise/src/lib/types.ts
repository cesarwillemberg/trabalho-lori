/**
 * Tipos e interfaces utilizados no sistema de análise de crédito.
 * Define a estrutura dos dados do cliente, resultado da análise e logs.
 */

/** Dados do cliente enviados pelo formulário */
export interface ClienteDados {
  /** Idade do cliente em anos */
  idade: number;
  /** Renda mensal do cliente em reais */
  rendaMensal: number;
  /** Histórico de dívidas: "limpo" ou "negativado" */
  historicoDividas: 'limpo' | 'negativado';
  /** Valor do empréstimo solicitado em reais */
  valorEmprestimo: number;
}

/** Resultado da análise de crédito */
export interface ResultadoAnalise {
  /** Indica se o crédito foi aprovado ou reprovado */
  aprovado: boolean;
  /** Mensagem descritiva do resultado */
  mensagem: string;
  /** Valor da parcela mensal calculada */
  valorParcela: number;
  /** Percentual da renda comprometido pela parcela */
  percentualComprometido: number;
  /** Lista de razões para reprovação (vazio se aprovado) */
  razoes?: string[];
}

/** Estrutura de um registro de log */
export interface LogAnalise {
  /** Identificador único do log */
  id: string;
  /** Data e hora da análise no formato ISO */
  dataHora: string;
  /** Dados do cliente analisados */
  clienteDados: ClienteDados;
  /** Resultado da análise realizada */
  resultado: ResultadoAnalise;
}

/** Estrutura do arquivo JSON de logs */
export interface LogsStorage {
  /** Lista de todos os logs de análise */
  logs: LogAnalise[];
}
