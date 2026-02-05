"use client";

import { useEffect, useState } from "react";
import casesData from "@/data/cases.json";
import conditionsData from "@/data/conditions.json";
import { GameCase, ConditionDef, SessionState, Report } from "@/lib/types";
import { buildReport } from "@/lib/engine";
import { loadSession, clearSession, downloadJson } from "@/lib/storage";
import ResultsBlocks from "@/components/ResultsBlocks";

export default function Results() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [report, setReport] = useState<Report | null>(null);
  const [loading, setLoading] = useState(true);

  const cases = casesData as GameCase[];
  const conditions = conditionsData as ConditionDef[];

  useEffect(() => {
    const existing = loadSession();
    if (existing && existing.responses.length > 0) {
      setSession(existing);
      const builtReport = buildReport(existing, cases, conditions);
      setReport(builtReport);
    }
    setLoading(false);
  }, []);

  if (loading) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⏳</div>
        <h2 className="empty-title">Loading...</h2>
      </div>
    );
  }

  if (!session || !report) {
    return (
      <div className="empty-state">
        <div className="empty-icon">📊</div>
        <h2 className="empty-title">No run found</h2>
        <p className="empty-message">
          You haven&apos;t completed any cases yet. Start playing to see your
          results.
        </p>
        <div className="card">
          <div className="btnRow">
            <a href="/play" className="btn btnPrimary">
              Start Playing →
            </a>
          </div>
        </div>
      </div>
    );
  }

  const handleDownload = () => {
    const exportData = {
      session: {
        sessionId: session.sessionId,
        startedISO: session.startedISO,
        completedCount: report.completedCount,
        totalCount: report.totalCount,
      },
      report,
    };
    downloadJson("gai-ethics-results.json", exportData);
  };

  const handleClearRun = () => {
    if (
      typeof window !== "undefined" &&
      confirm(
        "Are you sure? This will delete your local results. You can always restart."
      )
    ) {
      clearSession();
      setSession(null);
      setReport(null);
    }
  };

  return (
    <div>
      <h1>Your Results</h1>

      <div className="card">
        <div className="spread">
          <div>
            <span className="small muted">Session ID</span>
            <div style={{ fontSize: "0.9rem", fontFamily: "monospace" }}>
              {session.sessionId}
            </div>
          </div>
          <div>
            <span className="small muted">Started</span>
            <div style={{ fontSize: "0.9rem" }}>
              {new Date(session.startedISO).toLocaleString()}
            </div>
          </div>
        </div>
      </div>

      <ResultsBlocks report={report} />

      <div className="card">
        <div className="btnRow">
          <button className="btn btnPrimary" onClick={handleDownload}>
            ⬇ Download Results JSON
          </button>
          <a href="/play" className="btn btnPrimary">
            ← Back to Play
          </a>
          <button className="btn btnBad" onClick={handleClearRun}>
            🗑 Clear Run
          </button>
        </div>
      </div>
    </div>
  );
}
