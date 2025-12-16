// src/utils/createNode.ts
import type { FlowsheetNode, MetalType } from "@/types/units";
import { allUnits } from "@/data/units";

interface Position {
  x: number;
  y: number;
}

/**
 * ساخت نود React Flow از روی یک واحد فرآیندی
 * اینجا حتما type: "unit" می‌گذاریم تا Node سفارشی روی Canvas رندر شود.
 */
export function createNodeFromUnit(
  unitId: string,
  position: Position
): FlowsheetNode | null {
  const def = allUnits.find((u) => u.id === unitId);
  if (!def) return null;

  // یک id یکتا برای نود
  const nodeId = `${def.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

  return {
    id: nodeId,
    type: "unit", // 👈 خیلی مهم: باید با key توی nodeTypes یکی باشد
    position,
    data: {
      // این فیلدها در UnitNode استفاده می‌شوند
      label: def.name,
      metal: def.metal as MetalType,
      icon: def.icon, // مثلا "feed", "crusher", ...
      unitId: def.id,
      parameters: {
        recovery: def.defaultParameters.recovery,
        split_ratio: def.defaultParameters.split_ratio,
      },
    },
  };
}