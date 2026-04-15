import { NextRequest, NextResponse } from 'next/server';
import { writeFileSync, readFileSync, existsSync } from 'fs';
import { join } from 'path';

const LOGS_FILE = join(process.cwd(), 'logs.json');

interface LogEntry {
  id: string;
  age: number;
  monthlyIncome: number;
  debtHistory: 'limpo' | 'negativado';
  loanAmount: number;
  result: {
    approved: boolean;
    reasons: string[];
    installmentAmount: number;
    installmentPercentage: number;
    timestamp: string;
  };
}

function readLogs(): LogEntry[] {
  try {
    if (existsSync(LOGS_FILE)) {
      const data = readFileSync(LOGS_FILE, 'utf-8');
      return JSON.parse(data);
    }
  } catch (error) {
    console.error('Error reading logs:', error);
  }
  return [];
}

function writeLogs(logs: LogEntry[]): void {
  try {
    writeFileSync(LOGS_FILE, JSON.stringify(logs, null, 2));
  } catch (error) {
    console.error('Error writing logs:', error);
  }
}

export async function GET() {
  const logs = readLogs();
  return NextResponse.json(logs);
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const logs = readLogs();
    
    const newLog: LogEntry = {
      id: `${Date.now()}-${Math.random().toString(36).substring(2, 9)}`,
      ...body
    };
    
    logs.unshift(newLog);
    writeLogs(logs);
    
    return NextResponse.json(newLog, { status: 201 });
  } catch (error) {
    console.error('Error creating log:', error);
    return NextResponse.json({ error: 'Failed to create log' }, { status: 500 });
  }
}

export async function DELETE() {
  try {
    writeLogs([]);
    return NextResponse.json({ message: 'Logs cleared successfully' });
  } catch (error) {
    console.error('Error clearing logs:', error);
    return NextResponse.json({ error: 'Failed to clear logs' }, { status: 500 });
  }
}