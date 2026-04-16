import fs from 'fs';
import path from 'path';
import { AnaliseCredito } from '@/types';

/**
 * Camada de Repository
 * Responsável pela persistência de dados em arquivo JSON
 * Abstração sobre o armazenamento para que a camada de Service
 * não accesses diretamente o sistema de arquivos
 */

const ARQUIVO_DADOS = 'analise-credito.json';

function obterCaminhoArquivo(): string {
  if (process.env.NODE_ENV === 'production') {
    return path.join('/tmp', ARQUIVO_DADOS);
  }
  return path.join(process.cwd(), ARQUIVO_DADOS);
}

function lerDadosArquivo(): AnaliseCredito[] {
  const caminho = obterCaminhoArquivo();

  if (!fs.existsSync(caminho)) {
    return [];
  }

  try {
    const conteudo = fs.readFileSync(caminho, 'utf-8');
    return JSON.parse(conteudo) as AnaliseCredito[];
  } catch {
    return [];
  }
}

function salvarDadosArquivo(dados: AnaliseCredito[]): void {
  const caminho = obterCaminhoArquivo();
  fs.writeFileSync(caminho, JSON.stringify(dados, null, 2), 'utf-8');
}

export function gerarId(): string {
  return `analise-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

export function obterTimestamp(): string {
  return new Date().toISOString();
}

export function salvarAnalise(analise: AnaliseCredito): void {
  const dados = lerDadosArquivo();
  dados.push(analise);
  salvarDadosArquivo(dados);
}

export function buscarTodasAnalises(): AnaliseCredito[] {
  return lerDadosArquivo();
}

export function buscarAnalisePorId(id: string): AnaliseCredito | null {
  const dados = lerDadosArquivo();
  return dados.find((a) => a.id === id) || null;
}

export function limparDados(): void {
  const caminho = obterCaminhoArquivo();
  if (fs.existsSync(caminho)) {
    fs.unlinkSync(caminho);
  }
}