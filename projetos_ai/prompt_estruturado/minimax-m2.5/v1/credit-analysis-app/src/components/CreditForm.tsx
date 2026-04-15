"use client";

import { useState } from 'react';
import styles from './CreditForm.module.css';

interface ClientData {
  idade: number;
  rendaMensal: number;
  historicoDivida: 'limpo' | 'negativado';
  valorEmprestimo: number;
}

interface AnalysisResult {
  timestamp: string;
  clientData: ClientData;
  parcela: number;
  percentualComprometimento: number;
  aprovado: boolean;
  motivos: string[];
}

export default function CreditForm() {
  const [formData, setFormData] = useState<ClientData>({
    idade: 0,
    rendaMensal: 0,
    historicoDivida: 'limpo',
    valorEmprestimo: 0,
  });

  const [result, setResult] = useState<AnalysisResult | null>(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === 'historicoDivida' ? value : Number(value),
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch('/api/credit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      setResult(data);
    } catch (error) {
      console.error('Erro ao processar crédito:', error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Análise de Crédito</h1>

      <form className={styles.form} onSubmit={handleSubmit}>
        <div className={styles.field}>
          <label htmlFor="idade">Idade (anos)</label>
          <input
            type="number"
            id="idade"
            name="idade"
            value={formData.idade}
            onChange={handleChange}
            min="0"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="rendaMensal">Renda Mensal (R$)</label>
          <input
            type="number"
            id="rendaMensal"
            name="rendaMensal"
            value={formData.rendaMensal}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <div className={styles.field}>
          <label htmlFor="historicoDivida">Histórico de Dívidas</label>
          <select
            id="historicoDivida"
            name="historicoDivida"
            value={formData.historicoDivida}
            onChange={handleChange}
            required
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </div>

        <div className={styles.field}>
          <label htmlFor="valorEmprestimo">Valor do Empréstimo (R$)</label>
          <input
            type="number"
            id="valorEmprestimo"
            name="valorEmprestimo"
            value={formData.valorEmprestimo}
            onChange={handleChange}
            min="0"
            step="0.01"
            required
          />
        </div>

        <button type="submit" className={styles.button} disabled={loading}>
          {loading ? 'Analisando...' : 'Enviar'}
        </button>
      </form>

      {result && (
        <div className={`${styles.result} ${result.aprovado ? styles.aprovado : styles.reprovado}`}>
          <h2>{result.aprovado ? 'Aprovado' : 'Reprovado'}</h2>
          <div className={styles.details}>
            <p>Valor da parcela: R$ {result.parcela.toFixed(2)}</p>
            <p>Comprometimento: {result.percentualComprometimento.toFixed(1)}%</p>
            <p>Data: {new Date(result.timestamp).toLocaleString('pt-BR')}</p>
            <ul className={styles.motivos}>
              {result.motivos.map((motivo, index) => (
                <li key={index}>{motivo}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}