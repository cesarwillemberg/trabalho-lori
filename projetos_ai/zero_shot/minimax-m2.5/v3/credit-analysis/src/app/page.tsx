import CreditForm from '@/components/CreditForm';

export default function Home() {
  return (
    <main className="main-content">
      <div className="container">
        <section className="intro-section">
          <h2 className="section-title">Sistema de Análise de Crédito</h2>
          <p className="section-description">
            Preencha os dados abaixo para verificar a elegibilidade do cliente para o empréstimo.
          </p>
        </section>

        <CreditForm />

        <section className="rules-section">
          <h3 className="rules-title">Critérios de Análise</h3>
          <ul className="rules-list">
            <li>✓ Idade mínima: 18 anos</li>
            <li>✓ Parcela máxima: 30% da renda mensal</li>
            <li>✓ Histórico de dívidas: deve estar limpo</li>
          </ul>
        </section>
      </div>
    </main>
  );
}