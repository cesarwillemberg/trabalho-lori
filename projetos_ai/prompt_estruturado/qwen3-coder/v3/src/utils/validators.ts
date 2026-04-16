/**
 * Módulo de Validações
 * Contém funções utilitárias para validação de dados de entrada
 */

import { CreditRequest } from '@/types';

/**
 * Valida se a idade é igual ou superior a 18 anos
 */
export function validarIdade(idade: number): boolean {
  return idade >= 18;
}

/**
 * Valida se a renda mensal é um valor positivo
 */
export function validarRendaMensal(renda: number): boolean {
  return renda > 0;
}

/**
 * Valida se o valor do empréstimo é um valor positivo
 */
export function validarValorEmprestimo(valor: number): boolean {
  return valor > 0;
}

/**
 * Valida todos os campos de entrada
 * Retorna um objeto com o status de cada validação
 */
export function validarEntrada(dados: CreditRequest): {
  valido: boolean;
  erros: string[];
} {
  const erros: string[] = [];

  if (!validarIdade(dados.idade)) {
    erros.push('O cliente deve ter pelo menos 18 anos');
  }

  if (!validarRendaMensal(dados.rendaMensal)) {
    erros.push('A renda mensal deve ser um valor positivo');
  }

  if (!validarValorEmprestimo(dados.valorEmprestimo)) {
    erros.push('O valor do empréstimo deve ser um valor positivo');
  }

  if (!['limpo', 'negativado'].includes(dados.historicoDividas)) {
    erros.push('O histórico de dívidas deve ser "limpo" ou "negativado"');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}
