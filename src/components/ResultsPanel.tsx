// src/components/ResultsPanel.tsx
"use client";

import type { SimulationResult } from "@/types/simulation";

interface ResultsPanelProps {
  result: SimulationResult | null;
  isSimulating: boolean;
  onRunSimulation: () => void;
}

export function ResultsPanel({
  result,
  isSimulating,
  onRunSimulation,
}: ResultsPanelProps) {
  return (
    <footer className="border-t bg-white text-sm px-4 py-3 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-4">
        <div className="font-medium">Simulation Results</div>
        <button
          onClick={onRunSimulation}
          disabled={isSimulating}
          className={`px-3 py-1.5 rounded-md text-xs font-medium ${
            isSimulating
              ? "bg-slate-300 text-slate-600 cursor-not-allowed"
              : "bg-emerald-600 text-white hover:bg-emerald-700"
          }`}
        >
          {isSimulating ? "Simulating..." : "Run Simulation"}
        </button>
      </div>

      {!result && (
        <div className="text-xs text-slate-500">
          No simulation has been run yet. Build a flowsheet and click{" "}
          <span className="font-semibold">Run Simulation</span>.
        </div>
      )}

      {result && (
        <>
          <div className="flex items-center gap-4 text-xs">
            <div>
              <span className="text-slate-500">Overall recovery:</span>{" "}
              <span className="font-semibold">
                {(result.overall_recovery * 100).toFixed(1)} %
              </span>
            </div>
            {result.messages.length > 0 && (
              <div className="text-red-600">
                {result.messages.map((m, i) => (
                  <span key={i} className="mr-2">
                    • {m}
                  </span>
                ))}
              </div>
            )}
          </div>

          <div className="border rounded-md overflow-hidden">
            <table className="w-full text-xs">
              <thead className="bg-slate-100 text-slate-600">
                <tr>
                  <th className="px-2 py-1 text-left">Stream</th>
                  <th className="px-2 py-1 text-left">From</th>
                  <th className="px-2 py-1 text-left">To</th>
                  <th className="px-2 py-1 text-right">Flowrate (t/h)</th>
                  <th className="px-2 py-1 text-right">Grade (%)</th>
                </tr>
              </thead>
              <tbody>
                {result.streams.map((s) => (
                  <tr key={s.id} className="border-t">
                    <td className="px-2 py-1">{s.id}</td>
                    <td className="px-2 py-1">{s.from_unit}</td>
                    <td className="px-2 py-1">{s.to_unit}</td>
                    <td className="px-2 py-1 text-right">
                      {s.flowrate.toFixed(2)}
                    </td>
                    <td className="px-2 py-1 text-right">
                      {s.grade.toFixed(2)}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </footer>
  );
}
