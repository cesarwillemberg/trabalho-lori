import { CreditRequest, CreditResult } from '@/types';
import { CreditRepository } from '@/repositories/CreditRepository';
import { validateCreditRequest, isMaiorDeIdade } from '@/validation/CreditValidation';

/**
 * Service Layer - Responsável pela lógica de negócio
 * Esta camada coordena validações, regras de negócio e persistência
 */

const calcularParcela = (valor: number): number => {
  return valor / 12;
};

const calcularPercentualComprometimento = (parcela: number, renda: number): number => {
  return (parcela / renda) * 100;
};

const verificarComprometimentoRenda = (parcela: number, renda: number): boolean => {
  const percentual = calcularPercentualComprometimento(parcela, renda);
  return percentual > 30;
};

const verificarHistoricoNegativado = (historico: string): boolean => {
  return historico === 'negativado';
};

const criarResultadoAprovado = (valorParcela: number, percentual: number): CreditResult => ({
  aprovado: true,
  valorParcela,
  percentualComprometido: percentual
});

const criarResultadoReprovado = (motivo: string): CreditResult => ({
  aprovado: false,
  valorParcela: 0,
  percentualComprometido: 0,
  motivo
});

const gerarMotivoReprovacao = (idade: number, historico: string, comprometido: boolean): string => {
  if (!isMaiorDeIdade(idade)) return 'Menor de 18 anos';
  if (verificarHistoricoNegativado(historico)) return 'Histórico negativado';
  if (comprometido) return 'Parcela excede 30% da renda';
  return 'não aprovado';
};

export const CreditService = {
  /**
   * Processa uma solicitação de crédito e retorna o resultado
   */
  analisarCredito: (request: CreditRequest): CreditResult => {
    const erroValidacao = validateCreditRequest(request);
    if (erroValidacao) {
      return criarResultadoReprovado(erroValidacao);
    }

    const valorParcela = calcularParcela(request.valorEmprestimo);
    const percentualComprometido = calcularPercentualComprometimento(valorParcela, request.rendaMensal);

    const comprometido = verificarComprometimentoRenda(valorParcela, request.rendaMensal);
    const historicoNegativado = verificarHistoricoNegativado(request.historicoDividas);

    if (comprometido || historicoNegativado) {
      const motivo = gerarMotivoReprovacao(request.idade, request.historicoDividas, comprometido);
      return criarResultadoReprovado(motivo);
    }

    return criarResultadoAprovado(valorParcela, percentualComprometido);
  },

  /**
   * Salva o log da análise de crédito
   */
  salvarLog: (dadosCliente: CreditRequest, resultado: CreditResult): void => {
    const log = {
      dataHora: new Date().toISOString(),
      dadosCliente,
      resultado
    };
    CreditRepository.saveLog(log);
  },

  /**
   * Recupera todos os logs de análise
   */
  obterLogs: () => {
    return CreditRepository.getAll();
  },

  /**
   * Limpa todos os logs
   */
  limparLogs: (): void => {
    CreditRepository.clearAll();
  }
};