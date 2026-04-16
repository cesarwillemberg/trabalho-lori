// CAMADA DE VALIDAÇÃO
// Responsável por validar todos os dados de entrada
// Esta camada não contém lógica de negócio, apenas verificações de formato e regras

import { CreditRequest, ValidationResult } from '@/types';

const IDADE_MINIMA = 18;
const RENDA_MINIMA = 0;
const EMPRESTIMO_MINIMO = 0;

export function validarIdade(idade: number): boolean {
  return idade >= IDADE_MINIMA;
}

export function validarRenda(renda: number): boolean {
  return renda > RENDA_MINIMA;
}

export function validarEmprestimo(valor: number): boolean {
  return valor > EMPRESTIMO_MINIMO;
}

export function validarHistoricoValido(historico: string): boolean {
  return historico === 'limpo' || historico === 'negativado';
}

export function criarErro(mensagem: string): string {
  return mensagem;
}

export function adicionarErroSeInvalido(
  erros: string[],
  condicao: boolean,
  mensagem: string
): string[] {
  if (!condicao) {
    return [...erros, mensagem];
  }
  return erros;
}

export function validarCamposObrigatorios(dados: CreditRequest): ValidationResult {
  const erros: string[] = [];

  adicionarErroSeInvalido(erros, validarIdade(dados.idade), 'Idade deve ser 18 anos ou mais');
  adicionarErroSeInvalido(erros, validarRenda(dados.rendaMensal), 'Renda mensal deve ser maior que zero');
  adicionarErroSeInvalido(erros, validarEmprestimo(dados.valorEmprestimo), 'Valor do empréstimo deve ser maior que zero');
  adicionarErroSeInvalido(erros, validarHistoricoValido(dados.historicoDividas), 'Histórico de dívidas inválido');

  return { valido: erros.length === 0, erros };
}
