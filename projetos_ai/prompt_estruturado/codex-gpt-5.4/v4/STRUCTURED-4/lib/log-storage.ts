import type { AnalysisLogEntry, AnalysisResult } from "@/types/credit";

const STORAGE_KEY = "credit-analysis-logs";

export function saveAnalysisLog(result: AnalysisResult): AnalysisLogEntry {
  const newEntry: AnalysisLogEntry = {
    id: crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    result
  };

  // Mantemos um histórico enxuto para evitar crescimento indefinido no navegador.
  const currentLogs = getAnalysisLogs();
  const updatedLogs = [newEntry, ...currentLogs].slice(0, 50);

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(updatedLogs));

  return newEntry;
}

export function getAnalysisLogs(): AnalysisLogEntry[] {
  if (typeof window === "undefined") {
    return [];
  }

  const storedLogs = window.localStorage.getItem(STORAGE_KEY);

  if (!storedLogs) {
    return [];
  }

  try {
    return JSON.parse(storedLogs) as AnalysisLogEntry[];
  } catch {
    return [];
  }
}
