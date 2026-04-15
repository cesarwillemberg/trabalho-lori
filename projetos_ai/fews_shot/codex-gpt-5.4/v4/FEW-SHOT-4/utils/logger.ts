import { readJsonFile, writeJsonFile } from "@/repository/fileRepository";
import type { CreditAnalysisLog } from "@/types/credit";

export async function getAnalysisLogs(): Promise<CreditAnalysisLog[]> {
  const logs = await readJsonFile<CreditAnalysisLog[]>([]);

  return logs.sort(
    (first, second) =>
      new Date(second.analyzedAt).getTime() - new Date(first.analyzedAt).getTime()
  );
}

export async function saveAnalysisLog(
  log: Omit<CreditAnalysisLog, "id">
): Promise<void> {
  const logs = await readJsonFile<CreditAnalysisLog[]>([]);

  logs.push({
    ...log,
    id: crypto.randomUUID()
  });

  await writeJsonFile(logs);
}
