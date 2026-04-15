"use client";

import { CreditResult } from "@/types/credit";

interface ResultCardProps {
  result: CreditResult | null;
}

export default function ResultCard({ result }: ResultCardProps) {
  if (!result) return null;

  return (
    <div className={`result-card ${result.approved ? "approved" : "declined"}`}>
      <div className="result-header">
        <span className="result-icon">
          {result.approved ? "✓" : "✗"}
        </span>
        <h3>{result.message}</h3>
      </div>
      
      {result.reasons && result.reasons.length > 0 && (
        <ul className="result-reasons">
          {result.reasons.map((reason, index) => (
            <li key={index}>{reason}</li>
          ))}
        </ul>
      )}
    </div>
  );
}