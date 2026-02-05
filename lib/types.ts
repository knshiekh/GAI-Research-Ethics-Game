export type Verdict = "approve" | "approve_with_conditions" | "disapprove";

export type CaseTags = Record<string, string>;

export interface GameCase {
  id: string;
  familyId?: string;
  changedFactor?: string;
  title: string;
  prompt: string;
  tags: CaseTags;
}

export interface ConditionDef {
  id: string;
  label: string;
}

export interface ResponseRecord {
  caseId: string;
  verdict: Verdict;
  conditionIds: string[];
  ms: number;
  timestampISO: string;
}

export interface SessionState {
  sessionId: string;
  startedISO: string;
  caseOrder: string[];
  idx: number;
  responses: ResponseRecord[];
  lastUpdatedISO: string;
}

export interface Report {
  completedCount: number;
  totalCount: number;
  topConditions: Array<{ id: string; label: string; count: number }>;
  dealbreakers: Array<{
    tag: string;
    value: string;
    score: number;
    disapproveRate: number;
    overallRate: number;
  }>;
  mindChangers: Array<{
    changedFactor: string;
    examples: Array<{
      familyId: string;
      casesRef: string;
      flip: string;
    }>;
  }>;
  styleLabel: string;
  styleRationale: string[];
}
