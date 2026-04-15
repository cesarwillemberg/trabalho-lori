import { CreditRequest, ValidationError } from '@/types';

const IDADE_MINIMA = 18;

export function validarIdade(idade: number): boolean {
  return idade >= IDADE_MINIMA;
}

export function validarRenda(renda: number): boolean {
  return renda > 0;
}

export function validarEmprestimo(valor: number): boolean {
  return valor > 0;
}

export function validarCampoNumerico(valor: number | undefined, nome: string): ValidationError | null {
  if (valor === undefined || valor === null || isNaN(valor)) {
    return { campo: nome, mensagem: `${nome} é obrigatório` };
  }
  return null;
}

export function validarIdadeRequerida(idade: number): ValidationError | null {
  if (!validarIdade(idade)) {
    return {
      campo: 'idade',
      mensagem: `Idade deve ser no mínimo ${IDADE_MINIMA} anos`
    };
  }
  return null;
}

export function validarRendaRequerida(renda: number): ValidationError | null {
  if (!validarRenda(renda)) {
    return { campo: 'rendaMensal', mensagem: 'Renda mensal deve ser maior que zero' };
  }
  return null;
}

export function validarEmprestimoRequerido(valor: number): ValidationError | null {
  if (!validarEmprestimo(valor)) {
    return { campo: 'valorEmprestimo', mensagem: 'Valor do empréstimo deve ser maior que zero' };
  }
  return null;
}

export function validarCamposObrigatorios(dados: CreditRequest): ValidationError[] {
  const erros: ValidationError[] = [];
  
  const campoIdade = validarCampoNumerico(dados.idade, 'idade');
  if (campoIdade) erros.push(campoIdade);
  
  const campoRenda = validarCampoNumerico(dados.rendaMensal, 'rendaMensal');
  if (campoRenda) erros.push(campoRenda);
  
  const campoEmprestimo = validarCampoNumerico(dados.valorEmprestimo, 'valorEmprestimo');
  if (campoEmprestimo) erros.push(campoEmprestimo);
  
  return erros;
}

export function validarRegrasNegocio(dados: CreditRequest): ValidationError[] {
  const erros: ValidationError[] = [];
  
  const erroIdade = validarIdadeRequerida(dados.idade);
  if (erroIdade) erros.push(erroIdade);
  
  const erroRenda = validarRendaRequerida(dados.rendaMensal);
  if (erroRenda) erros.push(erroRenda);
  
  const erroEmprestimo = validarEmprestimoRequerido(dados.valorEmprestimo);
  if (erroEmprestimo) erros.push(erroEmprestimo);
  
  return erros;
}

export function validarRequest(dados: CreditRequest): ValidationError[] {
  const camposObrigatorios = validarCamposObrigatorios(dados);
  if (camposObrigatorios.length > 0) {
    return camposObrigatorios;
  }
  
  const regrasNegocio = validarRegrasNegocio(dados);
  return regrasNegocio;
}