"use client";

import { GameCase } from "@/lib/types";

interface CaseCardProps {
  caseData: GameCase;
}

export default function CaseCard({ caseData }: CaseCardProps) {
  const tagEntries = Object.entries(caseData.tags).slice(0, 8);

  return (
    <div className="case-card">
      <h2 className="case-title">{caseData.title}</h2>

      <div className="case-meta">
        {caseData.familyId && (
          <div className="case-meta-item">
            <span className="case-meta-label">Variant Set</span>
            <span className="case-meta-value">{caseData.familyId}</span>
          </div>
        )}
        {caseData.changedFactor && (
          <div className="case-meta-item">
            <span className="case-meta-label">Changed Factor</span>
            <span className="case-meta-value">{caseData.changedFactor}</span>
          </div>
        )}
      </div>

      <div className="case-prompt">{caseData.prompt}</div>

      {tagEntries.length > 0 && (
        <>
          <div className="kv">
            {tagEntries.map(([key, value]) => (
              <div key={key} className="kv-item">
                <span className="kv-label">{key}</span>
                <span className="kv-value">{value}</span>
              </div>
            ))}
          </div>
          <p className="case-tags-note">
            Tags are shown for transparency about case design.
          </p>
        </>
      )}
    </div>
  );
}
