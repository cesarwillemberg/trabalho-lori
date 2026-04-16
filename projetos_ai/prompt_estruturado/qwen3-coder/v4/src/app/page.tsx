import Link from 'next/link';
import CreditAnalysisForm from '@/components/CreditAnalysisForm';

export default function Home() {
  return (
    <main className="container mx-auto px-4 py-12">
      <div className="max-w-2xl mx-auto">
        <header className="text-center mb-10">
          <h1 className="text-4xl font-bold text-indigo-900 mb-3">
            Análise de Crédito
          </h1>
          <p className="text-gray-600 text-lg">
            Sistema de avaliação para aprovação de empréstimos
          </p>
        </header>
        
        <CreditAnalysisForm />
        
        <div className="text-center mt-6">
          <Link
            href="/historico"
            className="text-indigo-600 hover:text-indigo-800 text-sm font-medium"
          >
            Ver histórico de análises →
          </Link>
        </div>
        
        <footer className="text-center mt-8 text-gray-500 text-sm">
          <p>Regras: Idade mínima 18 anos | Parcela máximo 30% da renda | Histórico limpo</p>
        </footer>
      </div>
    </main>
  );
}
