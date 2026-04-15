import { promises as fs } from "fs";
import path from "path";

const logFilePath = path.join(process.cwd(), "data", "analysis-log.json");

async function ensureLogFile() {
  const directory = path.dirname(logFilePath);

  await fs.mkdir(directory, { recursive: true });

  try {
    await fs.access(logFilePath);
  } catch {
    await fs.writeFile(logFilePath, "[]", "utf-8");
  }
}

export async function readAnalysisLogs() {
  await ensureLogFile();
  const fileContent = await fs.readFile(logFilePath, "utf-8");

  return JSON.parse(fileContent);
}

export async function appendAnalysisLog(entry) {
  const logs = await readAnalysisLogs();

  const nextEntry = {
    id: crypto.randomUUID(),
    ...entry
  };

  logs.unshift(nextEntry);

  // Mantém apenas as últimas 20 análises para facilitar a leitura da interface.
  const recentLogs = logs.slice(0, 20);

  await fs.writeFile(logFilePath, JSON.stringify(recentLogs, null, 2), "utf-8");

  return nextEntry;
}
