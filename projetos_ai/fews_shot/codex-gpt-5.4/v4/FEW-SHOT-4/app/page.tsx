import { CreditAnalysisForm } from "@/components/CreditAnalysisForm";

export default function HomePage() {
  return (
    <main className="page-shell">
      <section className="hero-card">
        <div className="hero-copy">
          <span className="eyebrow">Next.js 16 + API modular</span>
          <h1>Análise de crédito com validação, regras e logs</h1>
          <p>
            Preencha os dados do cliente para avaliar aprovação de crédito com
            base em idade, renda, histórico de dívidas e comprometimento da
            parcela.
          </p>
        </div>

        <CreditAnalysisForm />
      </section>
    </main>
  );
}
