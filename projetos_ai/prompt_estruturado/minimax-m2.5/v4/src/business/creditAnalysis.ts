import { CreditRequest, CreditAnalysisResult } from '../types';

const PARCELAS_FIXAS = 12;
const PERCENTUAL_MAXIMO_COMPROMETIDO = 0.30;
const IDADE_MINIMA = 18;

export function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / PARCELAS_FIXAS;
}

export function calcularPercentualComprometido(parcela: number, rendaMensal: number): number {
  return parcela / rendaMensal;
}

export function validarIdade(idade: number): boolean {
  return idade >= IDADE_MINIMA;
}

export function verificarComprometimentoRenda(percentual: number): boolean {
  return percentual <= PERCENTUAL_MAXIMO_COMPROMETIDO;
}

export function verificarHistorico(historico: 'limpo' | 'negativado'): boolean {
  return historico === 'limpo';
}

export function analisarCredito(dados: CreditRequest): CreditAnalysisResult {
  const { idade, rendaMensal, historicoDividas, valorEmprestimo } = dados;
  
  const valorParcela = calcularParcela(valorEmprestimo);
  const percentualComprometido = calcularPercentualComprometido(valorParcela, rendaMensal);
  
  const idadeValida = validarIdade(idade);
  const rendaComprometida = verificarComprometimentoRenda(percentualComprometido);
  const historicoLimpo = verificarHistorico(historicoDividas);
  
  const aprovado = idadeValida && rendaComprometida && historicoLimpo;
  
  let motivo = '';
  if (!idadeValida) {
    motivo = 'Cliente menor de 18 anos';
  } else if (!rendaComprometida) {
    motivo = `Parcela compromete ${(percentualComprometido * 100).toFixed(1)}% da renda (máximo 30%)`;
  } else if (!historicoLimpo) {
    motivo = 'Cliente possui histórico de dívidas negativado';
  }
  
  return {
    aprovado,
    valorParcela,
    percentualComprometido,
    motivo,
    timestamp: new Date().toISOString()
  };
}
