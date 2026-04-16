'use client';

import { useState, FormEvent } from 'react';
import { Cliente, AnaliseCredito } from '@/types';
import styles from '@/app/credito-form.module.css';

interface FormData {
  idade: string;
  rendaMensal: string;
  historicoDividas: 'limpo' | 'negativado';
  valorEmprestimo: string;
}

const dadosIniciais: FormData = {
  idade: '',
  rendaMensal: '',
  historicoDividas: 'limpo',
  valorEmprestimo: '',
};

export default function CreditoForm() {
  const [formData, setFormData] = useState<FormData>(dadosIniciais);
  const [resultado, setResultado] = useState<AnaliseCredito | null>(null);
  const [erros, setErros] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  function atualizarCampo(campo: keyof FormData, valor: string) {
    setFormData((prev) => ({ ...prev, [campo]: valor }));
  }

  async function enviarFormulario(event: FormEvent) {
    event.preventDefault();
    setLoading(true);
    setErros([]);
    setResultado(null);

    try {
      const dados: Cliente = {
        idade: parseInt(formData.idade, 10),
        rendaMensal: parseFloat(formData.rendaMensal),
        historicoDividas: formData.historicoDividas,
        valorEmprestimo: parseFloat(formData.valorEmprestimo),
      };

      const resposta = await fetch('/api/analise', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(dados),
      });

      const dadosResposta = await resposta.json();

      if (!resposta.ok) {
        setErros(dadosResposta.erros || ['Erro ao processar análise']);
        return;
      }

      setResultado(dadosResposta.analise);
    } catch {
      setErros(['Erro de comunicação com o servidor']);
    } finally {
      setLoading(false);
    }
  }

  function limparFormulario() {
    setFormData(dadosIniciais);
    setResultado(null);
    setErros([]);
  }

  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <h1 className={styles.title}>Análise de Crédito</h1>

        <form onSubmit={enviarFormulario} className={styles.form}>
          <div className={styles.field}>
            <label htmlFor="idade" className={styles.label}>
              Idade
            </label>
            <input
              id="idade"
              type="number"
              min="18"
              max="120"
              value={formData.idade}
              onChange={(e) => atualizarCampo('idade', e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="rendaMensal" className={styles.label}>
              Renda Mensal (R$)
            </label>
            <input
              id="rendaMensal"
              type="number"
              min="0"
              step="0.01"
              value={formData.rendaMensal}
              onChange={(e) => atualizarCampo('rendaMensal', e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <div className={styles.field}>
            <label htmlFor="historicoDividas" className={styles.label}>
              Histórico de Dívidas
            </label>
            <select
              id="historicoDividas"
              value={formData.historicoDividas}
              onChange={(e) =>
                atualizarCampo(
                  'historicoDividas',
                  e.target.value as 'limpo' | 'negativado'
                )
              }
              className={styles.select}
            >
              <option value="limpo">Limpo</option>
              <option value="negativado">Negativado</option>
            </select>
          </div>

          <div className={styles.field}>
            <label htmlFor="valorEmprestimo" className={styles.label}>
              Valor do Empréstimo (R$)
            </label>
            <input
              id="valorEmprestimo"
              type="number"
              min="0"
              step="0.01"
              value={formData.valorEmprestimo}
              onChange={(e) => atualizarCampo('valorEmprestimo', e.target.value)}
              className={styles.input}
              required
            />
          </div>

          <button type="submit" className={styles.button} disabled={loading}>
            {loading ? 'Analisando...' : 'Analisar Crédito'}
          </button>
        </form>

        {erros.length > 0 && (
          <div className={styles.error}>
            {erros.map((erro, index) => (
              <div key={index}>{erro}</div>
            ))}
          </div>
        )}

        {resultado && (
          <div
            className={`${styles.result} ${
              resultado.resultado === 'Aprovado'
                ? styles.resultApproved
                : styles.resultRejected
            }`}
          >
            <div className={styles.resultTitle}>{resultado.resultado}</div>
            <div className={styles.resultDetails}>
              Valor da parcela: R$ {resultado.valorParcela.toFixed(2)}
            </div>
            {resultado.motivos.length > 0 && (
              <div className={styles.resultDetails}>
                Motivos: {resultado.motivos.join(', ')}
              </div>
            )}
          </div>
        )}
      </div>
    </main>
  );
}