"use client";

import { Report } from "@/lib/types";

interface ResultsBlocksProps {
  report: Report;
}

export default function ResultsBlocks({ report }: ResultsBlocksProps) {
  return (
    <div>
      {/* Ethical Style */}
      <div className="results-section">
        <div className="results-section-title">Your ethical style</div>
        <span className="pill" style={{ marginBottom: "1rem", display: "block" }}>
          {report.styleLabel}
        </span>
        <ul style={{ marginLeft: "1.5rem" }}>
          {report.styleRationale.map((bullet, idx) => (
            <li key={idx} style={{ marginBottom: "0.5rem" }}>
              {bullet}
            </li>
          ))}
        </ul>
      </div>

      {/* Top Conditions */}
      {report.topConditions.length > 0 && (
        <div className="results-section">
          <div className="results-section-title">
            Top conditions you required ({report.topConditions.length})
          </div>
          <ul className="results-list">
            {report.topConditions.map((cond) => (
              <li key={cond.id} className="results-item">
                <div className="results-item-title">{cond.label}</div>
                <div className="results-item-subtitle">
                  Selected in {cond.count} approval(s)
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Dealbreakers */}
      {report.dealbreakers.length > 0 && (
        <div className="results-section">
          <div className="results-section-title">
            Likely dealbreakers ({report.dealbreakers.length})
          </div>
          <p className="small muted" style={{ marginBottom: "1rem" }}>
            These case attributes appeared more often in your disapprovals than
            expected.
          </p>
          <ul className="results-list">
            {report.dealbreakers.map((db, idx) => (
              <li key={idx} className="results-item">
                <div className="results-item-title">
                  {db.tag} = "{db.value}"
                </div>
                <div className="results-item-subtitle">
                  Lift score: {db.score.toFixed(2)} (disapprove rate:{" "}
                  {(db.disapproveRate * 100).toFixed(0)}%, overall:{" "}
                  {(db.overallRate * 100).toFixed(0)}%)
                </div>
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Mind Changers */}
      {report.mindChangers.length > 0 && (
        <div className="results-section">
          <div className="results-section-title">
            What changed your mind? ({report.mindChangers.length})
          </div>
          <p className="small muted" style={{ marginBottom: "1rem" }}>
            These factors caused you to flip your verdict between case variants.
          </p>
          <ul className="results-list">
            {report.mindChangers.map((mc, idx) => (
              <li key={idx} className="results-item">
                <div className="results-item-title">{mc.changedFactor}</div>
                {mc.examples.map((ex, exIdx) => (
                  <div key={exIdx} className="results-item-subtitle">
                    <strong>{ex.flip}</strong> on "{ex.casesRef}"
                  </div>
                ))}
              </li>
            ))}
          </ul>
        </div>
      )}

      {/* Completion Summary */}
      <div className="results-section">
        <div className="results-section-title">Completion</div>
        <div className="kv">
          <div className="kv-item">
            <span className="kv-label">Cases Completed</span>
            <span className="kv-value">
              {report.completedCount} / {report.totalCount}
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
