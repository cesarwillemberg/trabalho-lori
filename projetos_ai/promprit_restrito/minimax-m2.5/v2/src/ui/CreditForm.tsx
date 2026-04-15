'use client';

import { useState } from 'react';
import { CreditRequest, CreditResult, ValidationError } from '@/types';
import { analisarCredito } from '@/service';
import styles from './CreditForm.module.css';

export default function CreditForm() {
  const [dados, setDados] = useState<CreditRequest>({
    idade: 0,
    rendaMensal: 0,
    historicoDividas: 'limpo',
    valorEmprestimo: 0
  });

  const [resultado, setResultado] = useState<CreditResult | null>(null);
  const [erros, setErros] = useState<ValidationError[]>([]);

  function atualizarCampo(campo: keyof CreditRequest, valor: number | string) {
    setDados({ ...dados, [campo]: valor });
    setResultado(null);
    setErros([]);
  }

  function tratarEnvio(evento: React.FormEvent) {
    evento.preventDefault();
    const resultado = analisarCredito(dados);
    setResultado(resultado);
  }

  function exibirErros() {
    if (erros.length === 0) return null;
    return (
      <div className={styles.erros}>
        {erros.map((erro, i) => (
          <p key={i} className={styles.erro}>{erro.mensagem}</p>
        ))}
      </div>
    );
  }

  function exibirResultado() {
    if (!resultado) return null;
    const classe = resultado.aprovado ? styles.aprovado : styles.reprovado;
    const texto = resultado.aprovado ? 'Aprovado' : 'Reprovado';
    
    return (
      <div className={classe}>
        <h3>{texto}</h3>
        {resultado.aprovado ? (
          <div>
            <p>Parcela: R$ {resultado.valorParcela?.toFixed(2)}</p>
            <p>Comprometido: {resultado.percentualComprometido?.toFixed(1)}%</p>
          </div>
        ) : (
          <p>{resultado.motivo}</p>
        )}
      </div>
    );
  }

  return (
    <form onSubmit={tratarEnvio} className={styles.formulario}>
      <h2>Análise de Crédito</h2>
      
      {exibirErros()}
      {exibirResultado()}

      <div className={styles.campo}>
        <label htmlFor="idade">Idade:</label>
        <input
          id="idade"
          type="number"
          value={dados.idade || ''}
          onChange={(e) => atualizarCampo('idade', Number(e.target.value))}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="rendaMensal">Renda Mensal (R$):</label>
        <input
          id="rendaMensal"
          type="number"
          value={dados.rendaMensal || ''}
          onChange={(e) => atualizarCampo('rendaMensal', Number(e.target.value))}
          required
        />
      </div>

      <div className={styles.campo}>
        <label htmlFor="historicoDividas">Histórico:</label>
        <select
          id="historicoDividas"
          value={dados.historicoDividas}
          onChange={(e) => atualizarCampo('historicoDividas', e.target.value)}
        >
          <option value="limpo">Limpo</option>
          <option value="negativado">Negativado</option>
        </select>
      </div>

      <div className={styles.campo}>
        <label htmlFor="valorEmprestimo">Valor do Empréstimo (R$):</label>
        <input
          id="valorEmprestimo"
          type="number"
          value={dados.valorEmprestimo || ''}
          onChange={(e) => atualizarCampo('valorEmprestimo', Number(e.target.value))}
          required
        />
      </div>

      <button type="submit" className={styles.botao}>
        Analisar Crédito
      </button>
    </form>
  );
}