import { promises as fs } from "fs";
import path from "path";

const dataDirectory = path.join(process.cwd(), "data");
const logFilePath = path.join(dataDirectory, "analysisLogs.json");

async function ensureStorageFile() {
  await fs.mkdir(dataDirectory, { recursive: true });

  try {
    await fs.access(logFilePath);
  } catch {
    await fs.writeFile(logFilePath, "[]", "utf-8");
  }
}

export async function readJsonFile<T>(fallback: T): Promise<T> {
  await ensureStorageFile();

  const content = await fs.readFile(logFilePath, "utf-8");

  if (!content.trim()) {
    return fallback;
  }

  return JSON.parse(content) as T;
}

export async function writeJsonFile<T>(data: T): Promise<void> {
  await ensureStorageFile();
  await fs.writeFile(logFilePath, JSON.stringify(data, null, 2), "utf-8");
}
