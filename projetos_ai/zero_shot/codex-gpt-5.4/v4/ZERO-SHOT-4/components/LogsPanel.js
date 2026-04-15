function formatDate(value) {
  return new Intl.DateTimeFormat("pt-BR", {
    dateStyle: "short",
    timeStyle: "medium"
  }).format(new Date(value));
}

function formatCurrency(value) {
  return new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL"
  }).format(value);
}

export default function LogsPanel({ logs }) {
  return (
    <section className="panel logs-panel">
      <div className="panel-header">
        <h2>Logs das análises</h2>
        <p>As últimas avaliações ficam registradas em arquivo JSON no servidor.</p>
      </div>

      {logs.length === 0 ? (
        <p>Nenhuma análise registrada nesta sessão.</p>
      ) : (
        <div className="logs-list">
          {logs.map((entry) => (
            <article className="log-card" key={entry.id}>
              <header>
                <strong>{entry.result.approved ? "Aprovado" : "Reprovado"}</strong>
                <span>{formatDate(entry.timestamp)}</span>
              </header>
              <p>
                Cliente: {entry.client.idade} anos, renda{" "}
                {formatCurrency(entry.client.rendaMensal)}, histórico{" "}
                {entry.client.historicoDividas}.
              </p>
              <p>Empréstimo solicitado: {formatCurrency(entry.client.valorEmprestimo)}</p>
              <p>{entry.result.reason}</p>
            </article>
          ))}
        </div>
      )}
    </section>
  );
}
