import { CreditRequest, ValidationResult } from '@/types';

export const IDADE_MINIMA = 18;
export const NUMERO_PARCELAS = 12;
export const PERCENTUAL_COMPROMETIMENTO_MAXIMO = 30;

export function validarIdade(idade: number): boolean {
  return idade >= IDADE_MINIMA;
}

export function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

export function calcularPercentualComprometimento(
  rendaMensal: number,
  valorParcela: number
): number {
  if (rendaMensal <= 0) return 100;
  return (valorParcela / rendaMensal) * 100;
}

export function verificarComprometimentoRenda(
  rendaMensal: number,
  valorParcela: number
): boolean {
  const percentual = calcularPercentualComprometimento(rendaMensal, valorParcela);
  return percentual <= PERCENTUAL_COMPROMETIMENTO_MAXIMO;
}

export function verificarHistoricoLimpo(historico: 'limpo' | 'negativado'): boolean {
  return historico === 'limpo';
}

export function validarDadosCliente(dados: CreditRequest): ValidationResult {
  const erros: string[] = [];

  if (dados.idade < IDADE_MINIMA) {
    erros.push(`Idade deve ser maior ou igual a ${IDADE_MINIMA} anos`);
  }

  if (dados.rendaMensal <= 0) {
    erros.push('Renda mensal deve ser maior que zero');
  }

  if (dados.valorEmprestimo <= 0) {
    erros.push('Valor do empréstimo deve ser maior que zero');
  }

  if (!['limpo', 'negativado'].includes(dados.historicoDividas)) {
    erros.push('Histórico de dívidas deve ser "limpo" ou "negativado"');
  }

  return {
    valido: erros.length === 0,
    erros,
  };
}

export function analisarCredito(dados: CreditRequest) {
  const validacao = validarDadosCliente(dados);

  if (!validacao.valido) {
    return {
      resultado: 'Reprovado' as const,
      validacao,
      detalhes: null,
    };
  }

  const idadeValida = validarIdade(dados.idade);
  const valorParcela = calcularParcela(dados.valorEmprestimo);
  const parcelaComprometeRenda = verificarComprometimentoRenda(
    dados.rendaMensal,
    valorParcela
  );
  const historicoLimpo = verificarHistoricoLimpo(dados.historicoDividas);
  const percentualComprometimento = calcularPercentualComprometimento(
    dados.rendaMensal,
    valorParcela
  );

  const aprovado =
    idadeValida && parcelaComprometeRenda && historicoLimpo;

  return {
    resultado: aprovado ? 'Aprovado' as const : 'Reprovado' as const,
    validacao,
    detalhes: {
      idadeValida,
      parcelaComprometeRenda,
      historicoNegativado: !historicoLimpo,
      valorParcela: Math.round(valorParcela * 100) / 100,
      percentualComprometimento: Math.round(percentualComprometimento * 100) / 100,
    },
  };
}
