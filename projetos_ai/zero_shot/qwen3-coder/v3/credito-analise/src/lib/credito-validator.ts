/**
 * Módulo de validação de crédito.
 * Contém as regras de negócio para análise e aprovação de crédito de clientes.
 *
 * Regras de validação:
 * 1. Cliente deve ser maior de idade (18 anos ou mais)
 * 2. Parcela mensal não pode comprometer mais de 30% da renda mensal
 * 3. Histórico de dívidas deve estar "limpo" (sem restrições)
 */

import { ClienteDados, ResultadoAnalise } from './types';

/** Número de parcelas fixas para cálculo do empréstimo */
const NUMERO_PARCELAS = 12;

/** Percentual máximo da renda que pode ser comprometido com a parcela */
const PERCENTUAL_MAXIMO_RENDA = 0.3; // 30%

/** Idade mínima para aprovação de crédito */
const IDADE_MINIMA = 18;

/**
 * Calcula o valor da parcela mensal baseado no valor total do empréstimo.
 * Considera um número fixo de 12 parcelas sem juros.
 *
 * @param valorEmprestimo - Valor total do empréstimo solicitado
 * @returns Valor da parcela mensal
 */
export function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

/**
 * Calcula o percentual da renda mensal comprometido pela parcela.
 *
 * @param valorParcela - Valor da parcela mensal
 * @param rendaMensal - Renda mensal do cliente
 * @returns Percentual da renda comprometido (ex: 0.25 = 25%)
 */
export function calcularPercentualComprometido(
  valorParcela: number,
  rendaMensal: number
): number {
  if (rendaMensal <= 0) return Infinity;
  return valorParcela / rendaMensal;
}

/**
 * Valida se o cliente é maior de idade conforme regra de negócio.
 *
 * @param idade - Idade do cliente em anos
 * @returns true se for maior de idade, false caso contrário
 */
export function validarIdade(idade: number): boolean {
  return idade >= IDADE_MINIMA;
}

/**
 * Valida se o percentual da renda comprometido pela parcela está dentro do limite.
 *
 * @param percentualComprometido - Percentual da renda comprometido
 * @returns true se estiver dentro do limite, false caso contrário
 */
export function validarComprometimentoRenda(
  percentualComprometido: number
): boolean {
  return percentualComprometido <= PERCENTUAL_MAXIMO_RENDA;
}

/**
 * Valida o histórico de dívidas do cliente.
 *
 * @param historicoDividas - Histórico de dívidas do cliente
 * @returns true se o histórico estiver limpo, false caso contrário
 */
export function validarHistoricoDividas(
  historicoDividas: 'limpo' | 'negativado'
): boolean {
  return historicoDividas === 'limpo';
}

/**
 * Realiza a análise completa de crédito do cliente.
 * Aplica todas as regras de validação e retorna o resultado detalhado.
 *
 * @param dados - Dados do cliente para análise
 * @returns Resultado da análise com aprovação/reprovação e detalhes
 */
export function analisarCredito(dados: ClienteDados): ResultadoAnalise {
  const razoes: string[] = [];

  // Cálculo da parcela e percentual comprometido
  const valorParcela = calcularParcela(dados.valorEmprestimo);
  const percentualComprometido = calcularPercentualComprometido(
    valorParcela,
    dados.rendaMensal
  );

  // Validação 1: Verifica se o cliente é maior de idade
  if (!validarIdade(dados.idade)) {
    razoes.push(`Idade mínima não atingida: ${dados.idade} anos (mínimo: ${IDADE_MINIMA} anos)`);
  }

  // Validação 2: Verifica comprometimento de renda
  if (!validarComprometimentoRenda(percentualComprometido)) {
    const percentualFormatado = (percentualComprometido * 100).toFixed(1);
    razoes.push(
      `Parcela de R$ ${valorParcela.toFixed(2)} compromete ${percentualFormatado}% da renda (máximo: ${(PERCENTUAL_MAXIMO_RENDA * 100).toFixed(0)}%)`
    );
  }

  // Validação 3: Verifica histórico de dívidas
  if (!validarHistoricoDividas(dados.historicoDividas)) {
    razoes.push('Histórico de dívidas com restrições (negativado)');
  }

  // Determina se o crédito foi aprovado
  const aprovado = razoes.length === 0;
  const mensagem = aprovado
    ? 'Crédito aprovado! Todos os critérios de avaliação foram atendidos.'
    : 'Crédito reprovado. Verifique os motivos abaixo:';

  return {
    aprovado,
    mensagem,
    valorParcela,
    percentualComprometido,
    razoes: aprovado ? undefined : razoes,
  };
}
