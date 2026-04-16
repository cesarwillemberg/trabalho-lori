/**
 * Regras de negócio para análise de crédito
 */

import { ClientData, ValidationResult, CreditAnalysisResult } from '@/types/credit';

const IDADE_MINIMA = 18;
const NUMERO_PARCELAS = 12;
const PERCENTUAL_MAXIMO_COMPROMETIMENTO = 30;

export class CreditRules {
  /**
   * Valida os dados de entrada do cliente
   */
  static validateInput(data: ClientData): ValidationResult {
    const errors: string[] = [];

    if (!data.idade || data.idade < 0) {
      errors.push('Idade deve ser um número positivo');
    }

    if (!data.rendaMensal || data.rendaMensal <= 0) {
      errors.push('Renda mensal deve ser maior que zero');
    }

    if (!data.valorEmprestimo || data.valorEmprestimo <= 0) {
      errors.push('Valor do empréstimo deve ser maior que zero');
    }

    if (!data.historicoDividas || !['limpo', 'negativado'].includes(data.historicoDividas)) {
      errors.push('Histórico de dívidas deve ser "limpo" ou "negativado"');
    }

    return {
      isValid: errors.length === 0,
      errors,
    };
  }

  /**
   * Calcula o valor da parcela (12x fixas)
   */
  static calcularParcela(valorEmprestimo: number): number {
    return valorEmprestimo / NUMERO_PARCELAS;
  }

  /**
   * Calcula o percentual de comprometimento da renda
   */
  static calcularPercentualComprometimento(valorParcela: number, rendaMensal: number): number {
    return (valorParcela / rendaMensal) * 100;
  }

  /**
   * Verifica se o cliente tem idade mínima válida
   */
  static validarIdade(idade: number): boolean {
    return idade >= IDADE_MINIMA;
  }

  /**
   * Verifica se o histórico de dívidas é válido (não negativado)
   */
  static validarHistorico(historico: 'limpo' | 'negativado'): boolean {
    return historico === 'limpo';
  }

  /**
   * Verifica se o percentual de comprometimento é aceitável
   */
  static validarComprometimento(percentual: number): boolean {
    return percentual <= PERCENTUAL_MAXIMO_COMPROMETIMENTO;
  }

  /**
   * Executa a análise completa de crédito
   */
  static analyze(data: ClientData): CreditAnalysisResult {
    const valorParcela = this.calcularParcela(data.valorEmprestimo);
    const percentualComprometimento = this.calcularPercentualComprometimento(
      valorParcela,
      data.rendaMensal
    );

    const idadeValida = this.validarIdade(data.idade);
    const historicoValido = this.validarHistorico(data.historicoDividas);
    const parcelaValida = this.validarComprometimento(percentualComprometimento);

    const motivosReprovacao: string[] = [];

    if (!idadeValida) {
      motivosReprovacao.push(`Idade mínima: ${IDADE_MINIMA} anos (atual: ${data.idade})`);
    }

    if (!historicoValido) {
      motivosReprovacao.push('Histórico de dívidas negativado');
    }

    if (!parcelaValida) {
      motivosReprovacao.push(
        `Parcela compromete ${percentualComprometimento.toFixed(1)}% da renda (máximo: ${PERCENTUAL_MAXIMO_COMPROMETIMENTO}%)`
      );
    }

    const aprovado = idadeValida && historicoValido && parcelaValida;

    return {
      aprovado,
      motivoReprovacao: motivosReprovacao,
      detalhes: {
        valorParcela: Math.round(valorParcela * 100) / 100,
        percentualComprometimento: Math.round(percentualComprometimento * 100) / 100,
        idadeValida,
        historicoValido,
        parcelaValida,
      },
    };
  }
}
