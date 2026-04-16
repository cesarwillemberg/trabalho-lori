/**
 * Service Layer (Business Logic)
 * 
 * Camada responsável pelas regras de negócio da aplicação.
 * - Calcula valor da parcela (12 parcelas fixas)
 * - Verifica percentual de comprometimento da renda
 * - Verifica histórico de dívidas
 * - Determina aprovação/reprovação do crédito
 * 
 * IMPORTANTE: Esta camada NÃO acessa LocalStorage ou arquivos diretamente.
 * Toda persistência deve passar pela camada de Repository.
 */

import { CreditRequest, CreditResult, CreditLog, ValidationResult } from '@/types/credit';
import { validarRequisicaoCredito } from '@/layers/validation/creditValidation';

const NUMERO_PARCELAS = 12;
const TAXA_JUROS_MENSAL = 0.02;
const PERCENTUAL_COMPROMETIMENTO_MAXIMO = 0.30;

/**
 * Calcula o valor da parcela mensal com juros compostos
 */
export const calcularValorParcela = (valorEmprestimo: number): number => {
  const fator = Math.pow(1 + TAXA_JUROS_MENSAL, NUMERO_PARCELAS);
  return (valorEmprestimo * TAXA_JUROS_MENSAL * fator) / (fator - 1);
};

/**
 * Calcula o percentual de comprometimento da renda
 */
export const calcularPercentualComprometimento = (
  valorParcela: number,
  rendaMensal: number
): number => {
  return valorParcela / rendaMensal;
};

/**
 * Verifica se há restrições no histórico de dívidas
 */
export const verificarHistoricoDividas = (
  historico: string
): boolean => {
  return historico === 'limpo';
};

/**
 * Analisa o crédito com base nas regras de negócio
 */
export const analisarCredito = (dados: CreditRequest): CreditResult => {
  const validacao: ValidationResult = validarRequisicaoCredito(dados);
  
  if (!validacao.valido) {
    return criarResultadoReprovado(validacao.erros.join('; '));
  }

  const valorParcela: number = calcularValorParcela(dados.valorEmprestimo);
  const percentualComprometimento: number = calcularPercentualComprometimento(
    valorParcela,
    dados.rendaMensal
  );

  if (!verificarHistoricoDividas(dados.historicoDividas)) {
    return criarResultadoReprovadoComParcela(
      valorParcela,
      percentualComprometimento,
      'Cliente com histórico negativado'
    );
  }

  if (percentualComprometimento > PERCENTUAL_COMPROMETIMENTO_MAXIMO) {
    return criarResultadoReprovadoComParcela(
      valorParcela,
      percentualComprometimento,
      'Parcela compromete mais de 30% da renda'
    );
  }

  return criarResultadoAprovado(valorParcela, percentualComprometimento);
};

/**
 * Cria objeto de resultado aprovado
 */
const criarResultadoAprovado = (
  valorParcela: number,
  percentualComprometimento: number
): CreditResult => ({
  aprovado: true,
  valorParcela: Math.round(valorParcela * 100) / 100,
  percentualComprometimento: Math.round(percentualComprometimento * 10000) / 100,
});

/**
 * Cria objeto de resultado reprovado
 */
const criarResultadoReprovado = (motivo: string): CreditResult => ({
  aprovado: false,
  motivo,
  valorParcela: 0,
  percentualComprometimento: 0,
});

/**
 * Cria objeto de resultado reprovado com dados de parcela
 */
const criarResultadoReprovadoComParcela = (
  valorParcela: number,
  percentualComprometimento: number,
  motivo: string
): CreditResult => ({
  aprovado: false,
  motivo,
  valorParcela: Math.round(valorParcela * 100) / 100,
  percentualComprometimento: Math.round(percentualComprometimento * 10000) / 100,
});

/**
 * Gera um ID único para o log
 */
export const gerarIdLog = (): string => {
  return `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`;
};

/**
 * Obtém a data/hora atual formatada
 */
export const obterDataHoraAtual = (): string => {
  return new Date().toISOString();
};

/**
 * Cria um registro de log para análise de crédito
 */
export const criarLogAnalise = (
  dados: CreditRequest,
  resultado: CreditResult
): CreditLog => ({
  id: gerarIdLog(),
  dataHora: obterDataHoraAtual(),
  cliente: dados,
  resultado,
});
