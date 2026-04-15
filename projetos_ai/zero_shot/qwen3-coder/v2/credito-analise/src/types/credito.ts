// Tipos TypeScript para o sistema de análise de crédito

/**
 * Dados do cliente submetidos no formulário
 */
export interface ClienteData {
  idade: number;
  rendaMensal: number;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

/**
 * Resultado da análise de crédito
 */
export interface ResultadoAnalise {
  aprovado: boolean;
  motivo: string;
  valorParcela: number;
  comprometimentoRenda: number; // porcentagem da renda comprometida
}

/**
 * Registro de log de uma análise realizada
 */
export interface LogAnalise {
  id: string;
  dataHora: string;
  cliente: ClienteData;
  resultado: ResultadoAnalise;
}
