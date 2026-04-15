import { CreditRequest, CreditResult, CreditLog } from "@/types/credit";

const STORAGE_KEY = "credit_analysis_logs";

function generateId(): string {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
}

export function saveCreditLog(request: CreditRequest, result: CreditResult): void {
  const logs = getAllLogs();
  
  const newLog: CreditLog = {
    id: generateId(),
    timestamp: new Date().toISOString(),
    request,
    result
  };
  
  logs.unshift(newLog);
  
  if (logs.length > 50) {
    logs.pop();
  }
  
  localStorage.setItem(STORAGE_KEY, JSON.stringify(logs));
}

export function getAllLogs(): CreditLog[] {
  if (typeof window === "undefined") return [];
  
  const stored = localStorage.getItem(STORAGE_KEY);
  if (!stored) return [];
  
  try {
    return JSON.parse(stored);
  } catch {
    return [];
  }
}

export function clearLogs(): void {
  localStorage.removeItem(STORAGE_KEY);
}