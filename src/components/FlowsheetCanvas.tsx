// src/components/FlowsheetCanvas.tsx
"use client";

import React from "react";
import ReactFlow, {
  Background,
  Controls,
  MiniMap,
  type Edge,
  type OnNodesChange,
  type OnEdgesChange,
  type Connection,
  Handle,
  Position,
  type NodeTypes,
  type NodeProps,
  type Node,
  BaseEdge,
  EdgeLabelRenderer,
  getBezierPath,
  type EdgeProps,
} from "reactflow";

import type { FlowsheetNode } from "@/types/units";

import "reactflow/dist/style.css";

interface FlowsheetCanvasProps {
  nodes: FlowsheetNode[];
  edges: Edge[];
  onNodesChange: OnNodesChange<FlowsheetNode>;
  onEdgesChange: OnEdgesChange<Edge>;
  onConnect: (connection: Connection) => void;
  onDrop: (event: React.DragEvent) => void;
  onDragOver: (event: React.DragEvent) => void;
  onNodeClick: (node: FlowsheetNode) => void;
  onNodeDoubleClick?: (node: FlowsheetNode) => void;
}

// ✅ Edge سفارشی برای نمایش label (مثل S1, S2, ...)
function LabeledEdge({
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  style,
  markerEnd,
  label,
}: EdgeProps) {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    targetX,
    targetY,
    sourcePosition,
    targetPosition,
  });

  return (
    <>
      <BaseEdge path={edgePath} markerEnd={markerEnd} style={style} />
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: "absolute",
              transform: `translate(-50%, -50%) translate(${labelX}px, ${labelY}px)`,
              background: "#ffffff",
              border: "1px solid #cbd5e1",
              borderRadius: 8,
              padding: "2px 6px",
              fontSize: 11,
              color: "#0f172a",
              pointerEvents: "none",
            }}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

// 🔹 نود سفارشی برای واحدهای فرآیندی (type: "unit")
function UnitNode({ data, selected }: NodeProps<any>) {
  const label: string = data?.label ?? "";
  const icon: string | undefined = data?.icon;
  const metal: string | undefined = data?.metal;

  const recovery =
    typeof data?.parameters?.recovery === "number"
      ? data.parameters.recovery
      : 1;

  const splitRatio =
    typeof data?.parameters?.split_ratio === "number"
      ? data.parameters.split_ratio
      : 1;

  // استایل پایه
  const borderColor = selected ? "#0f172a" : "#cbd5e1";
  const boxShadow = selected
    ? "0 0 0 2px rgba(15,23,42,0.25), 0 4px 8px rgba(15,23,42,0.15)"
    : "0 1px 2px rgba(15,23,42,0.08)";

  return (
    <div
      style={{
        minWidth: 180,
        padding: "4px 10px",
        borderRadius: 10,
        border: `1px solid ${borderColor}`,
        background: "#ffffff",
        display: "flex",
        alignItems: "center",
        gap: 8,
        boxShadow,
        position: "relative",
        cursor: "pointer",
      }}
    >
      {/* ورودی بالا */}
      <Handle
        type="target"
        position={Position.Top}
        style={{ background: "#0f172a", width: 8, height: 8 }}
      />

      {/* آیکون */}
      <div
        style={{
          width: 24,
          height: 24,
          borderRadius: 8,
          overflow: "hidden",
          background: "#e2e8f0",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexShrink: 0,
        }}
      >
        {icon ? (
          <img
            src={`/icons/${icon}.png`}
            alt={label}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              objectFit: "contain",
            }}
          />
        ) : (
          <span
            style={{
              fontSize: 10,
              fontWeight: 600,
              color: "#0f172a",
            }}
          >
            {metal ?? ""}
          </span>
        )}
      </div>

      {/* متن: نام + Rec/Split */}
      <div style={{ display: "flex", flexDirection: "column", fontSize: 12 }}>
        <span style={{ fontWeight: 600, marginBottom: 2 }}>{label}</span>
        <span style={{ fontSize: 11, color: "#64748b" }}>
          Rec: {recovery} • Split: {splitRatio}
        </span>
      </div>

      {/* خروجی پایین */}
      <Handle
        type="source"
        position={Position.Bottom}
        style={{ background: "#0f172a", width: 8, height: 8 }}
      />
    </div>
  );
}

// مپ نوع نودها
const nodeTypes: NodeTypes = {
  unit: UnitNode,
};

// ✅ مپ نوع edge ها
const edgeTypes = {
  labeled: LabeledEdge,
};

export function FlowsheetCanvas({
  nodes,
  edges,
  onNodesChange,
  onEdgesChange,
  onConnect,
  onDrop,
  onDragOver,
  onNodeClick,
  onNodeDoubleClick,
}: FlowsheetCanvasProps) {
  return (
    <div className="w-full h-full" onDrop={onDrop} onDragOver={onDragOver}>
      <ReactFlow
        nodes={nodes as unknown as Node[]}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onConnect={onConnect}
        onNodeClick={(_, node) => onNodeClick(node as FlowsheetNode)}
        onNodeDoubleClick={
          onNodeDoubleClick
            ? (_, node) => onNodeDoubleClick(node as FlowsheetNode)
            : undefined
        }
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        fitView
      >
        <Background gap={16} size={1} />
        <MiniMap pannable zoomable />
        <Controls />
      </ReactFlow>
    </div>
  );
}