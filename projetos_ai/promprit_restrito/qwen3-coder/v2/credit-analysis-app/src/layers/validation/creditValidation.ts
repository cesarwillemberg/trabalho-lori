/**
 * Validation Layer
 * 
 * Camada responsável exclusivamente por validar dados de entrada.
 * Contém funções puras que verificam formato e valores.
 * NÃO contém lógica de negócio - apenas validações.
 */

import { CreditRequest, ValidationResult, DebtHistory } from '@/types/credit';

/**
 * Valida se a idade é igual ou superior a 18 anos
 */
export const validarIdadeMinima = (idade: number): boolean => {
  return idade >= 18;
};

/**
 * Valida se o valor é positivo
 */
export const validarValorPositivo = (valor: number): boolean => {
  return valor > 0;
};

/**
 * Valida se o histórico de dívidas é válido
 */
export const validarHistoricoDividas = (
  historico: string
): historico is DebtHistory => {
  return historico === 'limpo' || historico === 'negativado';
};

/**
 * Valida todos os campos de uma requisição de crédito
 */
export const validarRequisicaoCredito = (
  dados: CreditRequest
): ValidationResult => {
  const erros: string[] = [];

  if (!validarIdadeMinima(dados.idade)) {
    erros.push('Cliente deve ter pelo menos 18 anos');
  }

  if (!validarValorPositivo(dados.rendaMensal)) {
    erros.push('Renda mensal deve ser maior que zero');
  }

  if (!validarValorPositivo(dados.valorEmprestimo)) {
    erros.push('Valor do empréstimo deve ser maior que zero');
  }

  if (!validarHistoricoDividas(dados.historicoDividas)) {
    erros.push('Histórico de dívidas deve ser "limpo" ou "negativado"');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
};
