"use client";

import {
  SessionState,
  GameCase,
  ConditionDef,
  ResponseRecord,
  Verdict,
  Report,
} from "./types";

export function shuffle<T>(arr: T[]): T[] {
  const result = [...arr];
  for (let i = result.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }
  return result;
}

export function newSession(cases: GameCase[]): SessionState {
  const caseOrder = shuffle(cases.map((c) => c.id));
  return {
    sessionId: `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
    startedISO: new Date().toISOString(),
    caseOrder,
    idx: 0,
    responses: [],
    lastUpdatedISO: new Date().toISOString(),
  };
}

export function isComplete(session: SessionState): boolean {
  return session.idx >= session.caseOrder.length;
}

export function getCurrentCase(
  session: SessionState,
  casesById: Record<string, GameCase>
): GameCase | null {
  if (isComplete(session)) return null;
  const caseId = session.caseOrder[session.idx];
  return casesById[caseId] || null;
}

export function recordResponse(
  session: SessionState,
  caseId: string,
  verdict: Verdict,
  conditionIds: string[],
  ms: number
): SessionState {
  const updated = { ...session };
  updated.responses.push({
    caseId,
    verdict,
    conditionIds: verdict === "disapprove" ? [] : conditionIds,
    ms,
    timestampISO: new Date().toISOString(),
  });
  updated.idx += 1;
  updated.lastUpdatedISO = new Date().toISOString();
  return updated;
}

export function goBack(session: SessionState): SessionState {
  const updated = { ...session };
  if (updated.idx > 0) {
    updated.idx -= 1;
    updated.responses.pop();
    updated.lastUpdatedISO = new Date().toISOString();
  }
  return updated;
}

interface Flip {
  familyId: string;
  casesRef: string;
  flip: string;
}

interface GroupedFlips {
  [changedFactor: string]: Flip[];
}

function groupFlips(
  session: SessionState,
  cases: GameCase[],
  casesById: Record<string, GameCase>
): GroupedFlips {
  const grouped: GroupedFlips = {};

  // Group responses by familyId
  const byFamily: Record<string, ResponseRecord[]> = {};
  for (const resp of session.responses) {
    const caseObj = casesById[resp.caseId];
    if (!caseObj || !caseObj.familyId) continue;
    if (!byFamily[caseObj.familyId]) {
      byFamily[caseObj.familyId] = [];
    }
    byFamily[caseObj.familyId].push(resp);
  }

  // Detect flips within families
  for (const familyId in byFamily) {
    const resps = byFamily[familyId];
    if (resps.length < 2) continue;

    const verdicts = new Set(resps.map((r) => r.verdict));
    if (verdicts.size < 2) continue; // All same verdict, no flip

    const changedFactors = new Set<string>();
    for (const resp of resps) {
      const caseObj = casesById[resp.caseId];
      if (caseObj && caseObj.changedFactor) {
        changedFactors.add(caseObj.changedFactor);
      }
    }

    for (const factor of changedFactors) {
      const casesWithFactor = resps.filter((r) => {
        const caseObj = casesById[r.caseId];
        return caseObj && caseObj.changedFactor === factor;
      });

      if (casesWithFactor.length >= 1) {
        if (!grouped[factor]) {
          grouped[factor] = [];
        }
        const caseTitles = casesWithFactor
          .map((r) => casesById[r.caseId].title)
          .join(" / ");
        grouped[factor].push({
          familyId,
          casesRef: caseTitles,
          flip: `${casesWithFactor[0].verdict} → ${casesWithFactor[casesWithFactor.length - 1].verdict}`,
        });
      }
    }
  }

  return grouped;
}

interface StyleInference {
  label: string;
  rationale: string[];
}

function inferStyle(
  topConditionIds: string[],
  disapproveCount: number,
  totalCount: number,
  conditionsById: Record<string, ConditionDef>
): StyleInference {
  const disapproveRate = totalCount > 0 ? disapproveCount / totalCount : 0;
  const rationale: string[] = [];

  if (disapproveRate > 0.6) {
    return {
      label: "Gatekeeping AI in Research",
      rationale: [
        "You disapproved in 60%+ of cases, signaling concern about integrating AI into research workflows.",
        "You prioritize caution and human oversight over experimental adoption.",
      ],
    };
  }

  if (topConditionIds.includes("human_verify")) {
    rationale.push(
      "Human verification is your top requirement, reflecting trust in researchers but verification of AI outputs."
    );
  }
  if (topConditionIds.includes("disclose_advisor")) {
    rationale.push(
      "You emphasize transparency with advisors, suggesting shared governance of AI use."
    );
  }
  if (topConditionIds.includes("disclose_public")) {
    rationale.push(
      "You believe the public deserves to know when AI was used, aligning with open science values."
    );
  }
  if (topConditionIds.includes("bias_check")) {
    rationale.push(
      "Bias detection is a cornerstone of your approach, showing concern for fair and equitable research."
    );
  }
  if (topConditionIds.includes("approved_tools_only")) {
    rationale.push(
      "You prefer institutional guardrails, trusting vetted tools over ad hoc AI use."
    );
  }

  if (rationale.length === 0) {
    rationale.push(
      disapproveRate > 0.3
        ? "You lean cautious on AI, but see promise in specific vetted use cases."
        : "You're open to AI in research with targeted conditions, case-by-case."
    );
  }

  const label =
    disapproveRate > 0.45
      ? "Cautious Researcher"
      : disapproveRate > 0.25
        ? "Conditional Adopter"
        : "AI-Friendly Pragmatist";

  return { label, rationale };
}

export function buildReport(
  session: SessionState,
  cases: GameCase[],
  conditions: ConditionDef[]
): Report {
  const casesById = Object.fromEntries(cases.map((c) => [c.id, c]));
  const conditionsById = Object.fromEntries(conditions.map((c) => [c.id, c]));

  const totalCount = session.caseOrder.length;
  const completedCount = session.responses.length;

  // Top conditions (top 7)
  const conditionCounts: Record<string, number> = {};
  for (const resp of session.responses) {
    for (const condId of resp.conditionIds) {
      conditionCounts[condId] = (conditionCounts[condId] || 0) + 1;
    }
  }

  const topConditions = Object.entries(conditionCounts)
    .sort((a, b) => b[1] - a[1])
    .slice(0, 7)
    .map(([id, count]) => ({
      id,
      label: conditionsById[id]?.label || id,
      count,
    }));

  const topConditionIds = topConditions.map((c) => c.id);

  // Dealbreakers: tag=value lift scores in disapprovals
  const disapprovedCases = session.responses
    .filter((r) => r.verdict === "disapprove")
    .map((r) => casesById[r.caseId]);

  const allCasesTagCounts: Record<string, Record<string, number>> = {};
  const disapprovedTagCounts: Record<string, Record<string, number>> = {};

  for (const caseObj of cases) {
    for (const [tag, value] of Object.entries(caseObj.tags)) {
      if (!allCasesTagCounts[tag]) allCasesTagCounts[tag] = {};
      allCasesTagCounts[tag][value] = (allCasesTagCounts[tag][value] || 0) + 1;
    }
  }

  for (const caseObj of disapprovedCases) {
    if (!caseObj) continue;
    for (const [tag, value] of Object.entries(caseObj.tags)) {
      if (!disapprovedTagCounts[tag]) disapprovedTagCounts[tag] = {};
      disapprovedTagCounts[tag][value] =
        (disapprovedTagCounts[tag][value] || 0) + 1;
    }
  }

  const dealbreakers: Array<{
    tag: string;
    value: string;
    score: number;
    disapproveRate: number;
    overallRate: number;
  }> = [];

  for (const tag in disapprovedTagCounts) {
    for (const value in disapprovedTagCounts[tag]) {
      const disapproveCount = disapprovedTagCounts[tag][value];
      const overallCount = allCasesTagCounts[tag]?.[value] || 1;
      const disapproveRate = disapproveCount / Math.max(1, disapprovedCases.length);
      const overallRate = overallCount / Math.max(1, cases.length);
      const score = disapproveRate - overallRate;

      if (score > 0.1) {
        dealbreakers.push({
          tag,
          value,
          score,
          disapproveRate,
          overallRate,
        });
      }
    }
  }

  dealbreakers.sort((a, b) => b.score - a.score);
  const topDealbreakers = dealbreakers.slice(0, 8);

  // Mind changers: flips within families
  const flips = groupFlips(session, cases, casesById);
  const mindChangers = Object.entries(flips)
    .map(([changedFactor, examples]) => ({
      changedFactor,
      examples: examples.slice(0, 3),
    }))
    .filter((mc) => mc.examples.length > 0);

  // Style inference
  const disapproveCount = session.responses.filter(
    (r) => r.verdict === "disapprove"
  ).length;
  const styleInference = inferStyle(
    topConditionIds,
    disapproveCount,
    completedCount,
    conditionsById
  );

  return {
    completedCount,
    totalCount,
    topConditions,
    dealbreakers: topDealbreakers,
    mindChangers,
    styleLabel: styleInference.label,
    styleRationale: styleInference.rationale,
  };
}
