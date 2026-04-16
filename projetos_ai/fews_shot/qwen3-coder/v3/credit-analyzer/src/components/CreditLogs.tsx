"use client";

import { useState, useCallback } from "react";
import { CreditLogEntry } from "@/types";
import { getAllLogs, clearAllLogs } from "@/repository/creditLogRepository";
import { formatCurrency, formatDateTime } from "@/utils/formatters";

export default function CreditLogs() {
  const [showLogs, setShowLogs] = useState(false);
  const [refreshKey, setRefreshKey] = useState(0);

  const logs = showLogs ? getAllLogs() : [];

  const handleShowLogs = useCallback(() => {
    setRefreshKey((k) => k + 1);
    setShowLogs(true);
  }, []);

  const handleClearLogs = useCallback(() => {
    if (confirm("Tem certeza que deseja limpar todos os logs?")) {
      clearAllLogs();
      setRefreshKey((k) => k + 1);
    }
  }, []);

  if (!showLogs) {
    return (
      <button
        onClick={handleShowLogs}
        className="bg-gray-600 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline transition-colors"
      >
        Ver Logs de Análises
      </button>
    );
  }

  return (
    <div className="w-full max-w-4xl mt-8" key={refreshKey}>
      <div className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800">
            Logs de Análises
          </h2>
          <div className="flex gap-2">
            <button
              onClick={() => setShowLogs(false)}
              className="bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded transition-colors"
            >
              Fechar
            </button>
            {logs.length > 0 && (
              <button
                onClick={handleClearLogs}
                className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded transition-colors"
              >
                Limpar Logs
              </button>
            )}
          </div>
        </div>

        {logs.length === 0 ? (
          <p className="text-gray-500 text-center py-8">
            Nenhuma análise registrada ainda.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Data/Hora
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Idade
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Renda
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Valor Emp.
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Parc. (12x)
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Histórico
                  </th>
                  <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Resultado
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {logs.map((log: CreditLogEntry) => (
                  <tr key={log.id} className="hover:bg-gray-50">
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatDateTime(log.timestamp)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {log.application.age} anos
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatCurrency(log.application.monthlyIncome)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatCurrency(log.application.loanAmount)}
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-600">
                      {formatCurrency(log.result.details.monthlyInstallment)}
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs ${
                          log.application.debtHistory === "limpo"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.application.debtHistory}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm">
                      <span
                        className={`px-2 py-1 rounded text-xs font-bold ${
                          log.result.approved
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                      >
                        {log.result.approved ? "Aprovado" : "Reprovado"}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
