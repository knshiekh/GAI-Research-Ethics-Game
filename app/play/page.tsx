"use client";

import { useEffect, useState } from "react";
import casesData from "@/data/cases.json";
import conditionsData from "@/data/conditions.json";
import { GameCase, ConditionDef, SessionState, Verdict } from "@/lib/types";
import {
  newSession,
  isComplete,
  getCurrentCase,
  recordResponse,
  goBack,
  buildReport,
} from "@/lib/engine";
import { loadSession, saveSession, clearSession } from "@/lib/storage";
import ProgressBar from "@/components/ProgressBar";
import CaseCard from "@/components/CaseCard";
import ConditionsChecklist from "@/components/ConditionsChecklist";

export default function Play() {
  const [session, setSession] = useState<SessionState | null>(null);
  const [selectedConditions, setSelectedConditions] = useState<string[]>([]);
  const [startTime, setStartTime] = useState<number>(0);
  const [pendingVerdict, setPendingVerdict] = useState<Verdict | null>(null);
  const [loading, setLoading] = useState(true);

  const cases = casesData as GameCase[];
  const conditions = conditionsData as ConditionDef[];
  const casesById = Object.fromEntries(cases.map((c) => [c.id, c]));

  useEffect(() => {
    const existing = loadSession();
    if (existing) {
      setSession(existing);
    } else {
      const newSess = newSession(cases);
      setSession(newSess);
      saveSession(newSess);
    }
    setLoading(false);
  }, []);

  if (loading || !session) {
    return (
      <div className="empty-state">
        <div className="empty-icon">⏳</div>
        <h2 className="empty-title">Loading...</h2>
      </div>
    );
  }

  const currentCase = getCurrentCase(session, casesById);
  const complete = isComplete(session);

  const handleVerdictClick = (verdict: Verdict) => {
    setStartTime(Date.now());
    if (verdict === "approve_with_conditions") {
      setPendingVerdict(verdict);
    } else {
      // Approve or Disapprove - submit immediately
      submitVerdictClick(verdict);
    }
  };

  const submitVerdictClick = (verdict: Verdict) => {
    const elapsed = Date.now() - startTime;
    const updated = recordResponse(
      session,
      currentCase!.id,
      verdict,
      verdict === "disapprove" ? [] : selectedConditions,
      elapsed
    );
    setSession(updated);
    saveSession(updated);
    setSelectedConditions([]);
    setPendingVerdict(null);
  };

  const handleBack = () => {
    const updated = goBack(session);
    setSession(updated);
    saveSession(updated);
    setSelectedConditions([]);
  };

  const handleResetRun = () => {
    if (
      typeof window !== "undefined" &&
      confirm("Are you sure? This will clear all your responses.")
    ) {
      clearSession();
      const newSess = newSession(cases);
      setSession(newSess);
      saveSession(newSess);
      setSelectedConditions([]);
    }
  };

  const handleViewResults = () => {
    window.location.href = "/results";
  };

  if (complete) {
    return (
      <div>
        <div className="empty-state">
          <div className="empty-icon">🎉</div>
          <h2 className="empty-title">You&apos;re done!</h2>
          <p className="empty-message">
            You&apos;ve completed all {session.caseOrder.length} cases. View
            your results to see your ethical profile.
          </p>
        </div>

        <div className="card">
          <div className="btnRow">
            <button className="btn btnPrimary" onClick={handleViewResults}>
              View My Results →
            </button>
            <button className="btn btnPrimary" onClick={handleResetRun}>
              Play Again
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div>
      <ProgressBar
        completed={session.responses.length}
        total={session.caseOrder.length}
      />

      {currentCase && (
        <>
          <CaseCard caseData={currentCase} />

          <div className="card">
            <h3>What&apos;s your verdict?</h3>
            <div className="btnRow">
              <button
                className="btn btnGood"
                onClick={() => {
                  handleVerdictClick("approve");
                }}
              >
                ✓ Approve
              </button>
              <button
                className="btn btnWarn"
                onClick={() => {
                  handleVerdictClick("approve_with_conditions");
                }}
              >
                ⚠ Approve with conditions
              </button>
              <button
                className="btn btnBad"
                onClick={() => {
                  handleVerdictClick("disapprove");
                }}
              >
                ✗ Disapprove
              </button>
            </div>
          </div>

          {pendingVerdict === "approve_with_conditions" && (
            <>
              <ConditionsChecklist
                conditions={conditions}
                selectedIds={selectedConditions}
                onChange={setSelectedConditions}
              />
              <div className="card">
                <div className="btnRow">
                  <button
                    className="btn btnPrimary"
                    onClick={() => {
                      submitVerdictClick("approve_with_conditions");
                    }}
                  >
                    Submit & Next →
                  </button>
                  <button
                    className="btn btnWarn"
                    onClick={() => {
                      setPendingVerdict(null);
                      setSelectedConditions([]);
                    }}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </>
          )}

          <div className="card">
            <div className="btnRow">
              <button
                className="btn btnPrimary"
                onClick={handleBack}
                disabled={session.responses.length === 0}
              >
                ← Back
              </button>
              <button
                className="btn btnPrimary"
                onClick={() => {
                  if (session.responses.length > 0 && !currentCase) {
                    handleViewResults();
                  }
                }}
                disabled={session.responses.length === 0}
              >
                View Results
              </button>
              <button className="btn btnWarn" onClick={handleResetRun}>
                Reset Run
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
