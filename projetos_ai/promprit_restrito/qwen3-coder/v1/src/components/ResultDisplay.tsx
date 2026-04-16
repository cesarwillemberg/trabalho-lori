'use client';

import { CreditResult } from '@/types';

interface ResultDisplayProps {
  resultado: CreditResult | null;
}

export default function ResultDisplay({ resultado }: ResultDisplayProps) {
  if (!resultado) return null;

  const containerClass = resultado.aprovado
    ? 'bg-green-50 border-green-500 text-green-800'
    : 'bg-red-50 border-red-500 text-red-800';

  return (
    <div className={`p-4 rounded-lg border-2 ${containerClass}`}>
      <h3 className="text-xl font-bold mb-2">
        {resultado.aprovado ? 'APROVADO' : 'REPROVADO'}
      </h3>
      
      {resultado.aprovado && (
        <div className="space-y-1">
          <p>Valor da parcela: R$ {resultado.valorParcela.toFixed(2)}</p>
          <p>Quantidade de parcelas: {resultado.quantidadeParcelas}x</p>
        </div>
      )}

      {resultado.motivo && (
        <p className="mt-2 text-sm">Motivo: {resultado.motivo}</p>
      )}
    </div>
  );
}
