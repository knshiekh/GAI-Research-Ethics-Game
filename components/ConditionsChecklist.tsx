"use client";

import { ConditionDef } from "@/lib/types";

interface ConditionsChecklistProps {
  conditions: ConditionDef[];
  selectedIds: string[];
  onChange: (ids: string[]) => void;
}

export default function ConditionsChecklist({
  conditions,
  selectedIds,
  onChange,
}: ConditionsChecklistProps) {
  const handleToggle = (id: string) => {
    const updated = selectedIds.includes(id)
      ? selectedIds.filter((x) => x !== id)
      : [...selectedIds, id];
    onChange(updated);
  };

  return (
    <div className="card">
      <h3>
        Which conditions should be met? ({selectedIds.length} selected)
      </h3>
      <p className="small muted" style={{ marginBottom: "1rem" }}>
        Choose the safeguards or requirements that would make this use of GAI
        appropriate.
      </p>
      <div className="checklist">
        {conditions.map((cond) => (
          <label key={cond.id} className="checklist-item">
            <input
              type="checkbox"
              checked={selectedIds.includes(cond.id)}
              onChange={() => handleToggle(cond.id)}
            />
            <span className="checklist-label">{cond.label}</span>
          </label>
        ))}
      </div>
    </div>
  );
}
