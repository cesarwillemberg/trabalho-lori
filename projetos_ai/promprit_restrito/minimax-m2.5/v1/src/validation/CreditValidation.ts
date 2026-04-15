import { CreditRequest } from '@/types';

/**
 * Validation Layer - Responsável por validar os dados de entrada
 * Esta camada contém funções puras de validação, sem lógica de negócio
 */

export const isMaiorDeIdade = (idade: number): boolean => {
  return idade >= 18;
};

export const isRendaPositiva = (renda: number): boolean => {
  return renda > 0;
};

export const isValorEmprestimoPositivo = (valor: number): boolean => {
  return valor > 0;
};

export const isHistoricoValido = (historico: string): boolean => {
  return historico === 'limpo' || historico === 'negativado';
};

export const validateCreditRequest = (request: CreditRequest): string | null => {
  if (!isMaiorDeIdade(request.idade)) {
    return 'Cliente deve ter 18 anos ou mais';
  }
  if (!isRendaPositiva(request.rendaMensal)) {
    return 'Renda mensal deve ser maior que zero';
  }
  if (!isValorEmprestimoPositivo(request.valorEmprestimo)) {
    return 'Valor do empréstimo deve ser maior que zero';
  }
  if (!isHistoricoValido(request.historicoDividas)) {
    return 'Histórico de dívidas inválido';
  }
  return null;
};