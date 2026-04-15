function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export default function ResultCard({ result, error }) {
  if (error) {
    return (
      <section className="panel result-panel error-panel">
        <h2>Falha na análise</h2>
        <p>{error}</p>
      </section>
    );
  }

  if (!result) {
    return (
      <section className="panel result-panel">
        <h2>Resultado</h2>
        <p>O parecer final aparecerá aqui após o envio do formulário.</p>
      </section>
    );
  }

  return (
    <section className="panel result-panel">
      <h2>Resultado da análise</h2>
      <p className={`decision ${result.approved ? "approved" : "rejected"}`}>
        {result.approved ? "Aprovado" : "Reprovado"}
      </p>
      <ul className="summary-list">
        <li>Parcela estimada: {formatCurrency(result.installmentValue)}</li>
        <li>Comprometimento da renda: {result.incomeCommitment}%</li>
        <li>Maior de idade: {result.rules.isAdult ? "Sim" : "Não"}</li>
        <li>Sem restrição: {result.rules.hasGoodDebtHistory ? "Sim" : "Não"}</li>
        <li>Dentro do limite de 30%: {result.rules.withinIncomeLimit ? "Sim" : "Não"}</li>
      </ul>
      <p className="reason">{result.reason}</p>
    </section>
  );
}
