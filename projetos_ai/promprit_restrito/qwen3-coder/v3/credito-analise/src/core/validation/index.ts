import { Cliente, ValidationResult } from '@/types';

/**
 * Camada de Validation
 * Responsável por todas as validações de entrada de dados
 * Cada função tem uma única responsabilidade
 */
export function validarIdadeMinima(idade: number): boolean {
  return idade >= 18;
}

export function validarRendaMensal(renda: number): boolean {
  return renda > 0;
}

export function validarValorEmprestimo(valor: number): boolean {
  return valor > 0;
}

export function validarHistoricoDividas(historico: string): boolean {
  return historico === 'limpo' || historico === 'negativado';
}

export function validarCampoObrigatorio<T>(valor: T | null | undefined, nomeCampo: string): string | null {
  if (valor === null || valor === undefined) {
    return `${nomeCampo} é obrigatório`;
  }
  return null;
}

export function validarTipoNumerico(valor: unknown, nomeCampo: string): string | null {
  if (typeof valor !== 'number' || isNaN(valor)) {
    return `${nomeCampo} deve ser um número válido`;
  }
  return null;
}

export function validarTipoString(valor: unknown, nomeCampo: string): string | null {
  if (typeof valor !== 'string' || valor.trim() === '') {
    return `${nomeCampo} deve ser um texto válido`;
  }
  return null;
}

export function validarIdade(idade: number): ValidationResult {
  const errors: string[] = [];

  if (!validarCampoObrigatorio(idade, 'Idade')) {
    errors.push('Idade é obrigatória');
  } else if (!validarTipoNumerico(idade, 'Idade')) {
    errors.push('Idade deve ser um número válido');
  } else if (!validarIdadeMinima(idade)) {
    errors.push('Cliente deve ter pelo menos 18 anos');
  }

  return { isValid: errors.length === 0, errors };
}

export function validarRenda(rendaMensal: number): ValidationResult {
  const errors: string[] = [];

  if (!validarCampoObrigatorio(rendaMensal, 'Renda mensal')) {
    errors.push('Renda mensal é obrigatória');
  } else if (!validarTipoNumerico(rendaMensal, 'Renda mensal')) {
    errors.push('Renda mensal deve ser um número válido');
  } else if (!validarRendaMensal(rendaMensal)) {
    errors.push('Renda mensal deve ser maior que zero');
  }

  return { isValid: errors.length === 0, errors };
}

export function validarEmprestimo(valorEmprestimo: number): ValidationResult {
  const errors: string[] = [];

  if (!validarCampoObrigatorio(valorEmprestimo, 'Valor do empréstimo')) {
    errors.push('Valor do empréstimo é obrigatório');
  } else if (!validarTipoNumerico(valorEmprestimo, 'Valor do empréstimo')) {
    errors.push('Valor do empréstimo deve ser um número válido');
  } else if (!validarValorEmprestimo(valorEmprestimo)) {
    errors.push('Valor do empréstimo deve ser maior que zero');
  }

  return { isValid: errors.length === 0, errors };
}

export function validarHistorico(historico: string): ValidationResult {
  const errors: string[] = [];

  if (!validarTipoString(historico, 'Histórico de dívidas')) {
    errors.push('Histórico de dívidas deve ser um texto válido');
  } else if (!validarHistoricoDividas(historico)) {
    errors.push('Histórico de dívidas deve ser "limpo" ou "negativado"');
  }

  return { isValid: errors.length === 0, errors };
}

export function validarCliente(cliente: unknown): ValidationResult {
  if (!cliente || typeof cliente !== 'object') {
    return { isValid: false, errors: ['Dados do cliente inválidos'] };
  }

  const c = cliente as Cliente;
  const errosCombinados: string[] = [];

  const erroIdade = validarIdade(c.idade);
  errosCombinados.push(...erroIdade.errors);

  const erroRenda = validarRenda(c.rendaMensal);
  errosCombinados.push(...erroRenda.errors);

  const erroEmprestimo = validarEmprestimo(c.valorEmprestimo);
  errosCombinados.push(...erroEmprestimo.errors);

  const erroHistorico = validarHistorico(c.historicoDividas);
  errosCombinados.push(...erroHistorico.errors);

  return { isValid: errosCombinados.length === 0, errors: errosCombinados };
}