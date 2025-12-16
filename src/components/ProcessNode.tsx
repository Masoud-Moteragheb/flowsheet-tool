// src/components/ProcessNode.tsx
"use client";

import { Handle, Position, type NodeProps } from "reactflow";
import type { FlowsheetNodeData } from "@/types/units";

export function ProcessNode({ data }: NodeProps<FlowsheetNodeData>) {
  return (
    <div className="relative rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm flex items-center gap-2 text-xs min-w-[160px]">
      {/* 🔹 Handle بالا (ورودی) */}
      <Handle
        type="target"
        position={Position.Top}
        className="w-2 h-2 !bg-slate-500"
      />

      {/* 🔹 Handle پایین (خروجی) */}
      <Handle
        type="source"
        position={Position.Bottom}
        className="w-2 h-2 !bg-slate-500"
      />

      {/* آیکون */}
      <div className="h-8 w-8 flex items-center justify-center rounded-md bg-slate-100 overflow-hidden mr-1">
        {data.icon ? (
          <img
            src={`/icons/${data.icon}.png`}
            alt={data.label}
            width={32}
            height={32}
            style={{ objectFit: "contain" }}
          />
        ) : (
          <span className="text-[10px] font-semibold">{data.metal}</span>
        )}
      </div>

      {/* متن */}
      <div className="flex flex-col">
        <span className="font-medium leading-tight">{data.label}</span>
        <span className="text-[10px] text-slate-600">
          Rec: {data.parameters.recovery} • Split:{" "}
          {data.parameters.split_ratio}
        </span>
      </div>
    </div>
  );
}
