import { CreditForm, CreditLogs } from "@/components";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4">
      <div className="max-w-6xl mx-auto">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">
            Sistema de Análise de Crédito
          </h1>
          <p className="text-gray-600">
            Analise a elegibilidade de clientes para empréstimo
          </p>
        </header>

        <div className="flex flex-col items-center">
          <CreditForm />
          <div className="mt-4">
            <CreditLogs />
          </div>
        </div>

        <footer className="text-center mt-12 text-gray-500 text-sm">
          <p>Critérios de aprovação:</p>
          <ul className="list-disc list-inside mt-2">
            <li>Idade igual ou superior a 18 anos</li>
            <li>Parcela mensal não compromete mais de 30% da renda</li>
            <li>Histórico de dívidas sem restrições</li>
          </ul>
        </footer>
      </div>
    </div>
  );
}
