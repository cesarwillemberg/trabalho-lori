import { useState } from "react";

const initialFormState = {
  idade: "",
  rendaMensal: "",
  historicoDividas: "limpo",
  valorEmprestimo: ""
};

export default function CreditForm({ onSubmit, isSubmitting }) {
  const [formState, setFormState] = useState(initialFormState);

  function handleChange(event) {
    const { name, value } = event.target;

    setFormState((currentState) => ({
      ...currentState,
      [name]: value
    }));
  }

  function handleSubmit(event) {
    event.preventDefault();
    onSubmit(formState);
  }

  return (
    <section className="panel">
      <div className="panel-header">
        <h2>Dados do cliente</h2>
        <p>Preencha o formulário para executar a análise de crédito.</p>
      </div>

      <form className="credit-form" onSubmit={handleSubmit}>
        <label>
          Idade
          <input
            name="idade"
            type="number"
            min="0"
            placeholder="Ex.: 32"
            value={formState.idade}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Renda mensal
          <input
            name="rendaMensal"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 4500"
            value={formState.rendaMensal}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Histórico de dívidas
          <select
            name="historicoDividas"
            value={formState.historicoDividas}
            onChange={handleChange}
          >
            <option value="limpo">Limpo</option>
            <option value="negativado">Negativado</option>
          </select>
        </label>

        <label>
          Valor do empréstimo
          <input
            name="valorEmprestimo"
            type="number"
            min="0"
            step="0.01"
            placeholder="Ex.: 12000"
            value={formState.valorEmprestimo}
            onChange={handleChange}
            required
          />
        </label>

        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Analisando..." : "Enviar para análise"}
        </button>
      </form>
    </section>
  );
}
