/**
 * Lógica de negócio para análise de crédito.
 * 
 * Regras de aprovação:
 * 1. Cliente deve ter 18 anos ou mais
 * 2. A parcela do empréstimo não pode comprometer mais de 30% da renda mensal
 * 3. Histórico de dívidas deve estar "limpo"
 * 
 * O empréstimo é dividido em 12 parcelas fixas.
 */

import { CreditFormData, CreditAnalysisResult } from "@/types";

/** Número fixo de parcelas para o empréstimo */
const NUMERO_PARCELAS = 12;

/** Percentual máximo da renda que pode ser comprometido com a parcela (30%) */
const PERCENTUAL_MAXIMO = 0.3;

/**
 * Calcula o valor de cada parcela do empréstimo.
 * @param valorEmprestimo - Valor total do empréstimo solicitado
 * @returns Valor de cada parcela
 */
function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

/**
 * Calcula o percentual da renda mensal comprometido pela parcela.
 * @param valorParcela - Valor da parcela mensal
 * @param rendaMensal - Renda mensal do cliente
 * @returns Percentual comprometido (ex: 0.25 = 25%)
 */
function calcularPercentualComprometido(
  valorParcela: number,
  rendaMensal: number
): number {
  if (rendaMensal <= 0) return 1; // Se renda é zero ou negativa, considera 100% comprometido
  return valorParcela / rendaMensal;
}

/**
 * Realiza a análise de crédito completa do cliente.
 * 
 * @param dados - Dados do formulário preenchidos pelo cliente
 * @returns Resultado da análise com aprovação/reprovação e detalhes
 */
export function analisarCredito(dados: CreditFormData): CreditAnalysisResult {
  const motivosReprovacao: string[] = [];

  // Regra 1: Verificar se o cliente é maior de idade (18+)
  if (dados.idade < 18) {
    motivosReprovacao.push(
      `Cliente menor de idade (${dados.idade} anos). É necessário ter pelo menos 18 anos.`
    );
  }

  // Calcula a parcela e o percentual comprometido
  const valorParcela = calcularParcela(dados.valorEmprestimo);
  const percentualComprometido = calcularPercentualComprometido(
    valorParcela,
    dados.rendaMensal
  );

  // Regra 2: Verificar se a parcela compromete mais de 30% da renda
  if (percentualComprometido > PERCENTUAL_MAXIMO) {
    const percentualFormatado = (percentualComprometido * 100).toFixed(1);
    motivosReprovacao.push(
      `A parcela de R$ ${valorParcela.toFixed(2)} compromete ${percentualFormatado}% da renda mensal, excedendo o limite de 30%.`
    );
  }

  // Regra 3: Verificar histórico de dívidas
  if (dados.historicoDividas === "negativado") {
    motivosReprovacao.push(
      "Cliente possui restrições no histórico de dívidas (negativado)."
    );
  }

  // Crédito aprovado apenas se TODAS as condições forem atendidas
  const aprovado = motivosReprovacao.length === 0;

  return {
    aprovado,
    numeroParcelas: NUMERO_PARCELAS,
    valorParcela,
    percentualComprometido,
    motivosReprovacao,
  };
}
