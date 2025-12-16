"use client";

import { useMemo } from "react";
import { allUnits } from "@/data/units";
import type { MetalType, UnitCategory, UnitDefinition } from "@/types/units";

const CATEGORIES: UnitCategory[] = [
  "Feed & Tailings",
  "Comminution",
  "Flotation",
  "Dewatering",
];

interface BlockLibraryPanelProps {
  selectedMetal: MetalType;
}

export function BlockLibraryPanel({ selectedMetal }: BlockLibraryPanelProps) {
  const unitsByCategory = useMemo(() => {
    const filtered = allUnits.filter((u) => u.metal === selectedMetal);
    const map: Record<UnitCategory, UnitDefinition[]> = {
      "Feed & Tailings": [],
      Comminution: [],
      Flotation: [],
      Dewatering: [],
    };
    filtered.forEach((u) => map[u.category].push(u));
    return map;
  }, [selectedMetal]);

  const handleDragStart = (
    event: React.DragEvent<HTMLDivElement>,
    unit: UnitDefinition
  ) => {
    event.dataTransfer.setData(
      "application/json",
      JSON.stringify({
        type: unit.id,
        parameters: unit.defaultParameters,
      })
    );
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <aside className="w-44 border-r bg-white flex flex-col text-xs">
      <div className="px-3 py-3 border-b font-semibold text-sm">
        Block Library
      </div>

      <div className="flex-1 overflow-auto px-3 py-3 space-y-4">
        {CATEGORIES.map((category) => {
          const units = unitsByCategory[category];
          if (!units.length) return null;

          return (
            <div key={category}>
              <div className="mb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wide">
                {category}
              </div>

              <div className="flex flex-col space-y-1">
                {units.map((unit) => (
                  <div
                    key={unit.id}
                    draggable
                    onDragStart={(e) => handleDragStart(e, unit)}
                    title={`${unit.name}\nRec: ${unit.defaultParameters.recovery} • Split: ${unit.defaultParameters.split_ratio}`}
                    className="w-full flex items-center justify-start cursor-move rounded px-1 py-1 hover:bg-slate-100 transition"
                  >
                    <img
                      src={`/icons/${unit.icon}.png`}
                      alt={unit.name}
                      className="object-contain"
                      style={{ width: 60, height: 60 }} // 👈 سایز واقعی آیکون
                    />
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </aside>
  );
}