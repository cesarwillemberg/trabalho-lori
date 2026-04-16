// CAMADA DE SERVIÇO (Regras de Negócio)
// Contém toda a lógica de negócio da aplicação
// NÃO acessa LocalStorage diretamente - usa Repository para persistência
// Validações são delegadas para a camada de Validation

import { CreditRequest, CreditResult, LogEntry } from '@/types';
import { validarCamposObrigatorios } from '@/layers/validation';
import { criarLog, adicionarLog } from '@/layers/repository';

const TAXA_JUROS_MENSAL = 0.05;
const QUANTIDADE_PARCELAS = 12;
const LIMITE_COMPROMETIMENTO = 0.30;

export function calcularParcela(valorEmprestimo: number): number {
  const valorComJuros = valorEmprestimo * (1 + TAXA_JUROS_MENSAL * QUANTIDADE_PARCELAS);
  return valorComJuros / QUANTIDADE_PARCELAS;
}

export function calcularPercentualComprometimento(parcela: number, renda: number): number {
  return parcela / renda;
}

export function verificarLimiteRenda(parcela: number, renda: number): boolean {
  const percentual = calcularPercentualComprometimento(parcela, renda);
  return percentual <= LIMITE_COMPROMETIMENTO;
}

export function verificarHistoricoLimpo(historico: string): boolean {
  return historico === 'limpo';
}

export function obterMotivoReprovacao(condicoes: boolean[]): string | undefined {
  if (condicoes[0]) return undefined;
  
  const motivos = [
    'Parcela compromete mais de 30% da renda',
    'Cliente possui restrições cadastrais',
  ];
  
  return motivos[condicoes.indexOf(false)];
}

export function analisarCredito(dados: CreditRequest): CreditResult {
  const validacao = validarCamposObrigatorios(dados);
  
  if (!validacao.valido) {
    return {
      aprovado: false,
      motivo: validacao.erros.join('; '),
      valorParcela: 0,
      quantidadeParcelas: 0,
    };
  }

  const parcela = calcularParcela(dados.valorEmprestimo);
  const dentroLimite = verificarLimiteRenda(parcela, dados.rendaMensal);
  const historicoOk = verificarHistoricoLimpo(dados.historicoDividas);

  const aprovado = dentroLimite && historicoOk;
  const motivo = obterMotivoReprovacao([aprovado, historicoOk]);

  return {
    aprovado,
    motivo,
    valorParcela: Math.round(parcela * 100) / 100,
    quantidadeParcelas: QUANTIDADE_PARCELAS,
  };
}

export function processarAnaliseCredito(dados: CreditRequest): CreditResult {
  const resultado = analisarCredito(dados);
  registrarLog(dados, resultado);
  return resultado;
}

function registrarLog(cliente: CreditRequest, resultado: CreditResult): void {
  const log = criarLog(cliente, resultado);
  adicionarLog(log);
}
