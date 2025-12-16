// src/components/PropertiesPanel.tsx
"use client";

import { useEffect, useState } from "react";
import type { FlowsheetNode } from "@/types/units";

interface PropertiesPanelProps {
  selectedNode: FlowsheetNode | null;
  onUpdateParams: (
    nodeId: string,
    params: { recovery: number; split_ratio: number }
  ) => void;
}

export function PropertiesPanel({
  selectedNode,
  onUpdateParams,
}: PropertiesPanelProps) {
  const [recovery, setRecovery] = useState<number>(1);
  const [split, setSplit] = useState<number>(1);

  // وقتی Node عوض می‌شود، فرم را با مقادیر جدید پر کن
  useEffect(() => {
    if (selectedNode) {
      setRecovery(selectedNode.data.parameters.recovery);
      setSplit(selectedNode.data.parameters.split_ratio);
    }
  }, [selectedNode]);

  if (!selectedNode) {
    return (
      <aside className="w-72 p-4 bg-white border-l text-sm text-slate-500">
        Select a unit on the canvas to edit its parameters.
      </aside>
    );
  }

  const handleApply = () => {
    onUpdateParams(selectedNode.id, {
      recovery: recovery,
      split_ratio: split,
    });
  };

  return (
    <aside className="w-72 p-4 bg-white border-l flex flex-col gap-3 text-sm">
      <div>
        <div className="text-xs text-slate-500 mb-1">Selected Unit</div>
        <div className="font-semibold">{selectedNode.data.label}</div>
        <div className="text-xs text-slate-400">
          ID: {selectedNode.data.unitId} • Metal: {selectedNode.data.metal}
        </div>
      </div>

      <div className="flex flex-col gap-2">
        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500">
            Recovery (0–1, fraction)
          </span>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={recovery}
            onChange={(e) => setRecovery(parseFloat(e.target.value) || 0)}
            className="border rounded px-2 py-1 text-sm"
          />
        </label>

        <label className="flex flex-col gap-1">
          <span className="text-xs text-slate-500">
            Split ratio to concentrate (0–1)
          </span>
          <input
            type="number"
            step="0.01"
            min={0}
            max={1}
            value={split}
            onChange={(e) => setSplit(parseFloat(e.target.value) || 0)}
            className="border rounded px-2 py-1 text-sm"
          />
        </label>
      </div>

      <button
        onClick={handleApply}
        className="mt-2 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700"
      >
        Apply Changes
      </button>
    </aside>
  );
}
