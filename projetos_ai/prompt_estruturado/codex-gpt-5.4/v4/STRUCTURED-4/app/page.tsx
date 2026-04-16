import { CreditAnalysisCard } from "@/components/credit-analysis-card";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero">
        <p className="eyebrow">Sistema Financeiro</p>
        <h1>Análise de crédito com regras claras e registro local</h1>
        <p className="hero-text">
          Preencha os dados do cliente para avaliar a aprovação do empréstimo com
          base em idade, comprometimento de renda e histórico financeiro.
        </p>
      </section>

      <CreditAnalysisCard />
    </main>
  );
}
