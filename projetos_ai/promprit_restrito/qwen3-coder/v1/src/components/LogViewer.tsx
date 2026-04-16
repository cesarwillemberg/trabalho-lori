'use client';

import { useEffect, useState } from 'react';
import { LogEntry } from '@/types';
import { obterTodosLogs } from '@/layers/repository';

export default function LogViewer() {
  const [logs, setLogs] = useState<LogEntry[]>([]);

  const carregarLogs = () => {
    setLogs(obterTodosLogs());
  };

  useEffect(() => {
    carregarLogs();
    const interval = setInterval(carregarLogs, 2000);
    return () => clearInterval(interval);
  }, []);

  if (logs.length === 0) {
    return (
      <div className="mt-8 p-4 bg-gray-100 rounded">
        <h3 className="font-bold mb-2">Logs de Análise</h3>
        <p className="text-gray-500 text-sm">Nenhum registro encontrado.</p>
      </div>
    );
  }

  return (
    <div className="mt-8 p-4 bg-gray-100 rounded">
      <h3 className="font-bold mb-4">Logs de Análise</h3>
      <div className="space-y-2 max-h-64 overflow-y-auto">
        {logs.map((log) => (
          <div key={log.id} className="bg-white p-3 rounded text-sm">
            <div className="flex justify-between text-gray-500 text-xs mb-1">
              <span>{new Date(log.dataHora).toLocaleString('pt-BR')}</span>
              <span className={log.resultado.aprovado ? 'text-green-600' : 'text-red-600'}>
                {log.resultado.aprovado ? 'Aprovado' : 'Reprovado'}
              </span>
            </div>
            <div className="text-gray-700">
              Idade: {log.cliente.idade} | Renda: R$ {log.cliente.rendaMensal} | 
              Empréstimo: R$ {log.cliente.valorEmprestimo}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
