/**
 * Módulo de lógica de negócio para análise de crédito
 *
 * Regras de aprovação:
 * 1. Cliente deve ser maior de idade (>= 18 anos)
 * 2. Parcela mensal não pode comprometer mais de 30% da renda
 * 3. Histórico de dívidas deve estar "limpo"
 */

import { ClienteData, ResultadoAnalise } from '@/types/credito';

/** Número fixo de parcelas para cálculo */
const NUMERO_PARCELAS = 12;

/** Percentual máximo da renda comprometida com a parcela */
const LIMITE_COMPROMETIMENTO_RENDA = 0.3; // 30%

/**
 * Calcula o valor de cada parcela baseado no valor total do empréstimo
 */
function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

/**
 * Calcula o percentual da renda comprometido pela parcela
 */
function calcularComprometimentoRenda(
  parcela: number,
  rendaMensal: number
): number {
  return parcela / rendaMensal;
}

/**
 * Realiza a análise de crédito completa para um cliente
 *
 * @param dados - Dados do cliente vindos do formulário
 * @returns Resultado da análise com status e detalhes
 */
export function analisarCredito(dados: ClienteData): ResultadoAnalise {
  const valorParcela = calcularParcela(dados.valorEmprestimo);
  const comprometimentoRenda = calcularComprometimentoRenda(
    valorParcela,
    dados.rendaMensal
  );

  // Regra 1: Verificar se é maior de idade
  if (dados.idade < 18) {
    return {
      aprovado: false,
      motivo: 'Cliente menor de idade (idade mínima: 18 anos)',
      valorParcela,
      comprometimentoRenda,
    };
  }

  // Regra 2: Verificar comprometimento de renda
  if (comprometimentoRenda > LIMITE_COMPROMETIMENTO_RENDA) {
    return {
      aprovado: false,
      motivo: `A parcela compromete ${(comprometimentoRenda * 100).toFixed(1)}% da renda (máximo: 30%)`,
      valorParcela,
      comprometimentoRenda,
    };
  }

  // Regra 3: Verificar histórico de dívidas
  if (dados.historicoDividas === 'negativado') {
    return {
      aprovado: false,
      motivo: 'Cliente com restrições no histórico de dívidas',
      valorParcela,
      comprometimentoRenda,
    };
  }

  // Todas as regras foram atendidas — crédito aprovado
  return {
    aprovado: true,
    motivo: 'Todas as condições de crédito foram atendidas',
    valorParcela,
    comprometimentoRenda,
  };
}
