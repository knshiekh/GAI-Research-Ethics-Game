"use client";

import { SessionState } from "./types";

const KEY = "gai_research_ethics_session_v1";

export function loadSession(): SessionState | null {
  if (typeof window === "undefined") return null;
  try {
    const data = localStorage.getItem(KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

export function saveSession(s: SessionState): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.setItem(KEY, JSON.stringify(s));
  } catch {
    console.error("Failed to save session to localStorage");
  }
}

export function clearSession(): void {
  if (typeof window === "undefined") return;
  try {
    localStorage.removeItem(KEY);
  } catch {
    console.error("Failed to clear session from localStorage");
  }
}

export function downloadJson(filename: string, obj: unknown): void {
  if (typeof window === "undefined") return;
  try {
    const blob = new Blob([JSON.stringify(obj, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  } catch (e) {
    console.error("Failed to download JSON:", e);
  }
}
