export interface ClientData {
  idade: number;
  rendaMensal: number;
  historicoDivida: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

export interface AnalysisResult {
  timestamp: string;
  clientData: ClientData;
  parcela: number;
  percentualComprometimento: number;
  aprovado: boolean;
  motivos: string[];
}

export class CreditAnalysisService {
  private readonly PARCELAS = 12;
  private readonly PERCENTUAL_LIMITE = 30;
  private readonly IDADE_MINIMA = 18;

  public analyze(data: ClientData): AnalysisResult {
    const timestamp = new Date().toISOString();
    const motivos: string[] = [];
    let aprovado = true;

    const idadeValida = this.validarIdade(data.idade);
    if (!idadeValida) {
      aprovado = false;
      motivos.push(`Idade mínima deve ser ${this.IDADE_MINIMA} anos`);
    }

    const parcela = this.calcularParcela(data.valorEmprestimo);
    const percentualComprometimento = this.calcularPercentual(
      parcela,
      data.rendaMensal
    );
    const ComprometimentoValido = this.validarComprometimento(
      percentualComprometimento
    );
    if (!ComprometimentoValido) {
      aprovado = false;
      motivos.push(
        `Parcela compromete ${percentualComprometimento.toFixed(1)}% da renda (limite: ${this.PERCENTUAL_LIMITE}%)`
      );
    }

    const historicoValido = this.validarHistorico(data.historicoDivida);
    if (!historicoValido) {
      aprovado = false;
      motivos.push('Cliente possui histórico negativado');
    }

    if (motivos.length === 0) {
      motivos.push('Todas as condições atendidas');
    }

    return {
      timestamp,
      clientData: data,
      parcela,
      percentualComprometimento,
      aprovado,
      motivos,
    };
  }

  private validarIdade(idade: number): boolean {
    return idade >= this.IDADE_MINIMA;
  }

  private calcularParcela(valorEmprestimo: number): number {
    return valorEmprestimo / this.PARCELAS;
  }

  private calcularPercentual(parcela: number, rendaMensal: number): number {
    return (parcela / rendaMensal) * 100;
  }

  private validarComprometimento(percentual: number): boolean {
    return percentual <= this.PERCENTUAL_LIMITE;
  }

  private validarHistorico(historico: string): boolean {
    return historico === 'limpo';
  }
}