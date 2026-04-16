/**
 * Serviço de Lógica de Negócio para Análise de Crédito
 * Contém todas as regras de negócio para avaliação de crédito
 */

import {
  CreditRequest,
  CreditAnalysisResult,
  ValidationResult,
} from '@/types';
import { validarIdade } from '@/utils/validators';

// Constantes de negócio
const NUMERO_PARCELAS = 12;
const TAXA_COMPROMETIMENTO_MAXIMO = 0.30; // 30%

/**
 * Calcula o valor da parcela mensal considerando parcelas fixas
 * Fórmula: valor_total / número_de_parcelas
 */
export function calcularValorParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

/**
 * Calcula o percentual de comprometimento da renda mensal
 * Fórmula: (valor_parcela / renda_mensal) * 100
 */
export function calcularPercentualComprometimento(
  valorParcela: number,
  rendaMensal: number
): number {
  return (valorParcela / rendaMensal) * 100;
}

/**
 * Verifica se a parcela compromete mais de 30% da renda
 */
export function verificarComprometimentoRenda(
  valorParcela: number,
  rendaMensal: number
): boolean {
  const percentual = calcularPercentualComprometimento(valorParcela, rendaMensal);
  return percentual <= TAXA_COMPROMETIMENTO_MAXIMO * 100;
}

/**
 * Verifica se o cliente possui histórico limpo (sem negativação)
 */
export function verificarHistoricoDividas(historico: string): boolean {
  return historico === 'limpo';
}

/**
 * Executa a regra de validação da idade
 */
function regraIdade(idade: number): ValidationResult {
  const aprovado = validarIdade(idade);
  return {
    regra: 'Idade Mínima',
    aprovado,
    mensagem: aprovado
      ? `Cliente com ${idade} anos (≥ 18 anos)`
      : `Cliente com ${idade} anos (menor que 18 anos)`,
  };
}

/**
 * Executa a regra de comprometimento de renda
 */
function regraComprometimentoRenda(
  valorParcela: number,
  rendaMensal: number
): ValidationResult {
  const percentual = calcularPercentualComprometimento(valorParcela, rendaMensal);
  const aprovado = percentual <= TAXA_COMPROMETIMENTO_MAXIMO * 100;
  return {
    regra: 'Comprometimento de Renda',
    aprovado,
    mensagem: aprovado
      ? `Parcela de ${percentual.toFixed(2)}% da renda (≤ 30%)`
      : `Parcela de ${percentual.toFixed(2)}% da renda (excede 30%)`,
  };
}

/**
 * Executa a regra de histórico de dívidas
 */
function regraHistoricoDividas(historico: string): ValidationResult {
  const aprovado = verificarHistoricoDividas(historico);
  return {
    regra: 'Histórico de Dívidas',
    aprovado,
    mensagem: aprovado
      ? 'Histórico limpo (sem negativação)'
      : 'Cliente negativado',
  };
}

/**
 * Analisa a solicitação de crédito conforme todas as regras de negócio
 * Retorna o resultado completo da análise
 */
export function analisarCredito(dados: CreditRequest): CreditAnalysisResult {
  const valorParcela = calcularValorParcela(dados.valorEmprestimo);

  const validacoes: ValidationResult[] = [
    regraIdade(dados.idade),
    regraComprometimentoRenda(valorParcela, dados.rendaMensal),
    regraHistoricoDividas(dados.historicoDividas),
  ];

  const aprovado = validacoes.every((v) => v.aprovado);

  return {
    aprovado,
    valorParcela: Math.round(valorParcela * 100) / 100,
    percentualComprometimento: Math.round(
      calcularPercentualComprometimento(valorParcela, dados.rendaMensal) * 100
    ) / 100,
    validacoes,
    dataHora: new Date().toISOString(),
  };
}

/**
 * Gera um ID único para o log
 */
export function gerarIdLog(): string {
  return `LOG_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}
