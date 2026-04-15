import { CreditRequest, CreditResult, CreditLog } from '@/types';
import { validarRequest } from '@/validation';
import * as Repository from '@/repository';

const NUMERO_PARCELAS = 12;
const PERCENTUAL_MAXIMO = 30;

export function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / NUMERO_PARCELAS;
}

export function calcularPercentualComprometido(parcela: number, rendaMensal: number): number {
  return (parcela / rendaMensal) * 100;
}

export function verificarHistoricoLimpo(historico: string): boolean {
  return historico === 'limpo';
}

export function verificarAprovacaoIdade(idade: number): boolean {
  return idade >= 18;
}

export function verificarParcelaValida(percentual: number): boolean {
  return percentual <= PERCENTUAL_MAXIMO;
}

export function criarResultadoAprovado(valorParcela: number, rendaMensal: number): CreditResult {
  const percentual = calcularPercentualComprometido(valorParcela, rendaMensal);
  return {
    aprovado: true,
    valorParcela,
    percentualComprometido: percentual
  };
}

export function criarResultadoReprovado(motivo: string): CreditResult {
  return { aprovado: false, motivo };
}

export function processarIdade(dados: CreditRequest): boolean {
  return verificarAprovacaoIdade(dados.idade);
}

export function processarRenda(dados: CreditRequest): boolean {
  const parcela = calcularParcela(dados.valorEmprestimo);
  const percentual = calcularPercentualComprometido(parcela, dados.rendaMensal);
  return verificarParcelaValida(percentual);
}

export function processarHistorico(dados: CreditRequest): boolean {
  return verificarHistoricoLimpo(dados.historicoDividas);
}

export function validarRegras(dados: CreditRequest): boolean {
  return processarIdade(dados) && processarRenda(dados) && processarHistorico(dados);
}

export function executarAnalise(dados: CreditRequest): CreditResult {
  const erros = validarRequest(dados);
  if (erros.length > 0) {
    return criarResultadoReprovado(erros[0].mensagem);
  }

  if (!validarRegras(dados)) {
    return criarResultadoReprovado('Regras de negócio não atendidas');
  }

  const valorParcela = calcularParcela(dados.valorEmprestimo);
  return criarResultadoAprovado(valorParcela, dados.rendaMensal);
}

export function analisarCredito(dados: CreditRequest): CreditResult {
  const resultado = executarAnalise(dados);
  Repository.adicionarLog(dados, resultado);
  return resultado;
}

export function obterLogs(): CreditLog[] {
  return Repository.carregarLogs();
}