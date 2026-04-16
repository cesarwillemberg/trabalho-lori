import { CreditAnalysis, CreditRequest } from '@/types';

const STORAGE_KEY = 'credit_analysis_logs';

export function registrarAnalise(
  dadosCliente: CreditRequest,
  resultado: 'Aprovado' | 'Reprovado',
  detalhes: CreditAnalysis['detalhes']
): void {
  if (typeof window === 'undefined') return;

  const logs = obterLogs();

  const novaAnalise: CreditAnalysis = {
    data: new Date().toISOString(),
    dadosCliente,
    resultado,
    detalhes: detalhes || {
      idadeValida: false,
      parcelaComprometeRenda: false,
      historicoNegativado: dadosCliente.historicoDividas === 'negativado',
      valorParcela: 0,
      percentualComprometimento: 0,
    },
  };

  logs.push(novaAnalise);

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
  } catch (error) {
    console.error('Erro ao salvar log:', error);
  }
}

export function obterLogs(): CreditAnalysis[] {
  if (typeof window === 'undefined') return [];

  try {
    const dados = localStorage.getItem(STORAGE_KEY);
    if (!dados) return [];
    return JSON.parse(dados);
  } catch (error) {
    console.error('Erro ao ler logs:', error);
    return [];
  }
}

export function limparLogs(): void {
  if (typeof window === 'undefined') return;

  try {
    localStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error('Erro ao limpar logs:', error);
  }
}
