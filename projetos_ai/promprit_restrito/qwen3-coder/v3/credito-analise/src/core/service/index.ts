import { Cliente, AnaliseCredito, ValidationResult } from '@/types';
import { validarCliente } from '../validation';
import * as Repository from '../repository';

/**
 * Camada de Service
 * Contém toda a lógica de negócio da aplicação
 * Não acessa diretamente LocalStorage ou arquivos
 * Utiliza a camada de Repository para persistência
 */

const QUANTIDADE_PARCELAS = 12;
const PORCENTAGEM_LIMITE_PARCELA = 0.30;

function calcularParcela(valorEmprestimo: number): number {
  return valorEmprestimo / QUANTIDADE_PARCELAS;
}

function calcularPorcentagemParcelaRenda(parcela: number, rendaMensal: number): number {
  return parcela / rendaMensal;
}

function verificarIdadeMinima(idade: number): boolean {
  return idade >= 18;
}

function verificarParcelaDentroLimite(porcentagem: number): boolean {
  return porcentagem <= PORCENTAGEM_LIMITE_PARCELA;
}

function verificarHistoricoLimpo(historico: string): boolean {
  return historico === 'limpo';
}

function verificarAprovacao(
  idadeValida: boolean,
  parcelaValida: boolean,
  historicoValido: boolean
): boolean {
  return idadeValida && parcelaValida && historicoValido;
}

function gerarMotivosRejeicao(
  idadeValida: boolean,
  parcelaValida: boolean,
  historicoValido: boolean
): string[] {
  const motivos: string[] = [];

  if (!idadeValida) {
    motivos.push('Cliente menor de 18 anos');
  }

  if (!parcelaValida) {
    motivos.push('Parcela excede 30% da renda mensal');
  }

  if (!historicoValido) {
    motivos.push('Histórico de dívidas com restrições');
  }

  return motivos;
}

function criarAnaliseCredito(
  cliente: Cliente,
  resultado: 'Aprovado' | 'Reprovado',
  motivos: string[]
): AnaliseCredito {
  return {
    id: Repository.gerarId(),
    timestamp: Repository.obterTimestamp(),
    cliente,
    valorParcela: calcularParcela(cliente.valorEmprestimo),
    resultado,
    motivos,
  };
}

export function processarAnaliseCredito(
  dadosCliente: unknown
): { sucesso: boolean; analise?: AnaliseCredito; erros?: string[] } {
  const validacao = validarCliente(dadosCliente);

  if (!validacao.isValid) {
    return { sucesso: false, erros: validacao.errors };
  }

  const cliente = dadosCliente as Cliente;
  const parcela = calcularParcela(cliente.valorEmprestimo);
  const porcentagemParcela = calcularPorcentagemParcelaRenda(parcela, cliente.rendaMensal);

  const idadeValida = verificarIdadeMinima(cliente.idade);
  const parcelaValida = verificarParcelaDentroLimite(porcentagemParcela);
  const historicoValido = verificarHistoricoLimpo(cliente.historicoDividas);

  const aprovado = verificarAprovacao(idadeValida, parcelaValida, historicoValido);
  const resultado = aprovado ? 'Aprovado' : 'Reprovado';
  const motivos = gerarMotivosRejeicao(idadeValida, parcelaValida, historicoValido);

  const analise = criarAnaliseCredito(cliente, resultado, motivos);
  Repository.salvarAnalise(analise);

  return { sucesso: true, analise };
}

export function obterHistoricoAnalises(): AnaliseCredito[] {
  return Repository.buscarTodasAnalises();
}

export function obterAnalisePorId(id: string): AnaliseCredito | null {
  return Repository.buscarAnalisePorId(id);
}