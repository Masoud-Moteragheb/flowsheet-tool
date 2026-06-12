"use client";

import { validateFlowsheetModel } from "@/utils/validateFlowsheetModel";
import { ResultsPanel } from "@/components/ResultsPanel";
import { buildFlowsheetModel } from "@/utils/buildFlowsheetModel";
import type { SimulationResult } from "@/types/simulation";
import { useCallback, useRef, useState } from "react";
import {
  ReactFlowProvider,
  useNodesState,
  useEdgesState,
  addEdge,
  Connection,
  Edge,
  MarkerType,
} from "reactflow";

import { BlockLibraryPanel } from "@/components/BlockLibraryPanel";
import { FlowsheetCanvas } from "@/components/FlowsheetCanvas";
// import { PropertiesPanel } from "@/components/PropertiesPanel";

import type { MetalType, FlowsheetNode } from "@/types/units";
import { createNodeFromUnit } from "@/utils/createNode";

function FlowsheetToolInner() {
  const [simulationResult, setSimulationResult] =
    useState<SimulationResult | null>(null);
  const [isSimulating, setIsSimulating] = useState(false);

  const [selectedMetal, setSelectedMetal] = useState<MetalType>("Cu");

  const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://127.0.0.1:8000";

  // نودها و یال‌ها
  const [nodes, setNodes, onNodesChange] = useNodesState<FlowsheetNode>([]);
  const [edges, setEdges, onEdgesChange] = useEdgesState<Edge>([]);

  // ✅ شمارنده‌ی استریم‌ها برای ساخت S1, S2, ...
  const streamCounterRef = useRef(1);

  // نود انتخاب‌شده (برای highlight اگر لازم شد)
  const [selectedNodeId, setSelectedNodeId] = useState<string | null>(null);
  const selectedNode = nodes.find((n) => n.id === selectedNodeId) ?? null;

  // خوراک
  const [feed, setFeed] = useState<{ throughput: number; grade: number }>({
    throughput: 100,
    grade: 1.0,
  });

  // state پاپ‌آپ
  const [editNode, setEditNode] = useState<FlowsheetNode | null>(null);
  const [editRecovery, setEditRecovery] = useState<string>("1");
  const [editSplit, setEditSplit] = useState<string>("1");

  const openEditDialogForNode = useCallback((node: FlowsheetNode) => {
    setEditNode(node);
    const params = (node.data as any).parameters ?? {
      recovery: 1,
      split_ratio: 1,
    };
    setEditRecovery(String(params.recovery));
    setEditSplit(String(params.split_ratio));
  }, []);

  const closeEditDialog = useCallback(() => {
    setEditNode(null);
  }, []);

  // ✅ اتصال نودها: ساخت Edge با id/label = S1, S2, ...
  const onConnect = useCallback(
    (connection: Connection) => {
      const streamId = `S${streamCounterRef.current++}`;

      setEdges((eds) =>
        addEdge(
          {
            ...connection,
            id: streamId,
            label: streamId,
            type: "labeled",
            animated: true,
            markerEnd: { type: MarkerType.ArrowClosed },
          },
          eds
        )
      );
    },
    [setEdges]
  );

  // Drag & Drop
  const onDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault();
      const raw = event.dataTransfer.getData("application/json");
      if (!raw) return;

      let payload: { type: string; parameters?: any } | null = null;
      try {
        payload = JSON.parse(raw);
      } catch {
        return;
      }
      if (!payload) return;
      const unitId = payload.type;
      const bounds = (event.target as HTMLDivElement).getBoundingClientRect();

      const position = {
        x: event.clientX - bounds.left,
        y: event.clientY - bounds.top,
      };

      const newNode = createNodeFromUnit(unitId, position);
      if (!newNode) return;

      setNodes((nds) => [...nds, newNode as any]);
    },
    [setNodes]
  );

  const handleNodeClick = useCallback((node: FlowsheetNode) => {
    setSelectedNodeId(node.id);
  }, []);

  // دابل‌کلیک → باز کردن پاپ‌آپ
  const handleNodeDoubleClick = useCallback(
    (node: FlowsheetNode) => {
      openEditDialogForNode(node);
    },
    [openEditDialogForNode]
  );

  const handleUpdateParams = useCallback(
    (nodeId: string, params: { recovery: number; split_ratio: number }) => {
      setNodes((nds) =>
        nds.map((node) =>
          node.id === nodeId
            ? {
                ...node,
                data: {
                  ...node.data,
                  parameters: {
                    recovery: params.recovery,
                    split_ratio: params.split_ratio,
                  },
                },
              }
            : node
        )
      );
    },
    [setNodes]
  );

  // ذخیره پاپ‌آپ
  const handleSaveEditDialog = useCallback(() => {
    if (!editNode) return;

    const rec = parseFloat(editRecovery);
    const split = parseFloat(editSplit);

    if (Number.isNaN(rec) || Number.isNaN(split)) {
      alert("Please enter valid numeric values.");
      return;
    }

    handleUpdateParams(editNode.id, {
      recovery: rec,
      split_ratio: split,
    });

    setEditNode(null);
  }, [editNode, editRecovery, editSplit, handleUpdateParams]);

  // 🔹 دکمه Reset flowsheet – پاک کردن کل Flow از روی Canvas
  const handleResetFlowsheet = useCallback(() => {
    setNodes([]);
    setEdges([]);
    setSelectedNodeId(null);
    setEditNode(null);
    setSimulationResult(null);

    // ✅ reset شمارنده تا دوباره از S1 شروع شود
    streamCounterRef.current = 1;
  }, [setNodes, setEdges]);

  // اجرای شبیه‌سازی
  const handleRunSimulation = async () => {
    const model = buildFlowsheetModel({
      metal: selectedMetal,
      feed,
      nodes: nodes as any,
      edges,
    });

    console.log("FlowsheetModel to send:", model);

    const errors = validateFlowsheetModel(model);
    if (errors.length > 0) {
      setSimulationResult({
        streams: [],
        overall_recovery: 0,
        messages: errors,
      });
      return;
    }

    setIsSimulating(true);

    try {
      const response = await fetch(`${API_URL}/simulate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(model),
      });

      if (!response.ok) {
        const text = await response.text();
        console.error("Simulation API error:", response.status, text);
        setSimulationResult({
          streams: [],
          overall_recovery: 0,
          messages: [
            `Simulation API error: ${response.status}`,
            "Check if the FastAPI server is running on port 8000.",
          ],
        });
      } else {
        const data = (await response.json()) as SimulationResult;
        console.log("SimulationResult from backend:", data);
        setSimulationResult(data);
      }
    } catch (err: any) {
      console.error("Simulation request failed:", err);
      setSimulationResult({
        streams: [],
        overall_recovery: 0,
        messages: [
          "Could not connect to the simulation server.",
          `Make sure FastAPI is running at ${API_URL}.`,
        ],
      });
    } finally {
      setIsSimulating(false);
    }
  };

  return (
    <main
      className="min-h-screen flex flex-col"
      style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}
    >
      {/* Header بالا */}
      <header
        className="flex items-center justify-between px-6 py-3 border-b bg-white"
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "12px 24px",
          borderBottom: "1px solid #e5e7eb",
          backgroundColor: "#ffffff",
        }}
      >
        <div>
          <span
            style={{
              fontSize: "10px",
              textTransform: "uppercase",
              color: "#6b7280",
            }}
          >
            Educational Flowsheet Simulator
          </span>
          <h1 style={{ fontSize: "18px", fontWeight: 600, color: "#111827" }}>
            Flowsheet Tool{" "}
            <span style={{ fontSize: "13px", color: "#6b7280" }}>
              (Copper / Zinc)
            </span>
          </h1>
        </div>

        <div>
          <span style={{ fontSize: "12px", color: "#6b7280", marginRight: 8 }}>
            Metal:
          </span>
          <button
            onClick={() => setSelectedMetal("Cu")}
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              border:
                selectedMetal === "Cu"
                  ? "1px solid #111827"
                  : "1px solid #d1d5db",
              backgroundColor:
                selectedMetal === "Cu" ? "#111827" : "transparent",
              color: selectedMetal === "Cu" ? "#ffffff" : "#111827",
              marginRight: 4,
              fontSize: "12px",
            }}
          >
            Cu
          </button>
          <button
            onClick={() => setSelectedMetal("Zn")}
            style={{
              padding: "4px 10px",
              borderRadius: "9999px",
              border:
                selectedMetal === "Zn"
                  ? "1px solid #111827"
                  : "1px solid #d1d5db",
              backgroundColor:
                selectedMetal === "Zn" ? "#111827" : "transparent",
              color: selectedMetal === "Zn" ? "#ffffff" : "#111827",
              fontSize: "12px",
            }}
          >
            Zn
          </button>
        </div>
      </header>

      {/* بدنه اصلی */}
      <div style={{ display: "flex", flex: 1 }}>
        <BlockLibraryPanel selectedMetal={selectedMetal} />

        <section style={{ flex: 1, backgroundColor: "#f1f5f9" }}>
          <FlowsheetCanvas
            nodes={nodes as any}
            edges={edges as any}
            onNodesChange={onNodesChange}
            onEdgesChange={onEdgesChange}
            onConnect={onConnect}
            onDrop={onDrop}
            onDragOver={onDragOver}
            onNodeClick={handleNodeClick}
            onNodeDoubleClick={handleNodeDoubleClick}
          />
        </section>
      </div>

      {/* نوار پایین */}
      <footer style={{ borderTop: "1px solid #e5e7eb", background: "#ffffff" }}>
        <div
          style={{
            padding: "8px 16px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            alignItems: "center",
            gap: 16,
            fontSize: "12px",
          }}
        >
          <div style={{ display: "flex", gap: 16 }}>
            <div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>
                Feed throughput (t/h)
              </div>
              <input
                type="number"
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: "12px",
                  width: 80,
                }}
                value={feed.throughput}
                onChange={(e) =>
                  setFeed((f) => ({
                    ...f,
                    throughput: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>
            <div>
              <div style={{ fontSize: "11px", color: "#6b7280" }}>
                Feed grade (%)
              </div>
              <input
                type="number"
                style={{
                  border: "1px solid #d1d5db",
                  borderRadius: 4,
                  padding: "2px 6px",
                  fontSize: "12px",
                  width: 80,
                }}
                value={feed.grade}
                onChange={(e) =>
                  setFeed((f) => ({
                    ...f,
                    grade: parseFloat(e.target.value) || 0,
                  }))
                }
              />
            </div>
          </div>

          {/* 🔹 دکمه Reset flowsheet */}
          <button
            onClick={handleResetFlowsheet}
            style={{
              padding: "4px 10px",
              borderRadius: 4,
              border: "1px solid #d1d5db",
              backgroundColor: "#ffffff",
              fontSize: "12px",
              cursor: "pointer",
            }}
          >
            Reset flowsheet
          </button>
        </div>

        <ResultsPanel
          result={simulationResult}
          isSimulating={isSimulating}
          onRunSimulation={handleRunSimulation}
        />
      </footer>

      {/* 🔹 پاپ‌آپ ویرایش واحد با استایل inline (واقعاً وسط صفحه) */}
      {editNode && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            backgroundColor: "rgba(0,0,0,0.4)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            zIndex: 1000,
          }}
        >
          <div
            style={{
              backgroundColor: "#ffffff",
              borderRadius: 8,
              boxShadow: "0 10px 25px rgba(15,23,42,0.25)",
              width: "100%",
              maxWidth: 360,
              padding: 16,
            }}
          >
            <h2
              style={{
                fontSize: "14px",
                fontWeight: 600,
                marginBottom: 8,
                color: "#111827",
              }}
            >
              Edit Unit Parameters
            </h2>

            <div
              style={{
                fontSize: "12px",
                color: "#6b7280",
                marginBottom: 12,
              }}
            >
              {(editNode.data as any)?.label}
            </div>

            <div style={{ marginBottom: 16 }}>
              <div style={{ marginBottom: 8 }}>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Recovery (0–1, fraction)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  max={1}
                  value={editRecovery}
                  onChange={(e) => setEditRecovery(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: 4,
                    padding: "4px 6px",
                    fontSize: "12px",
                  }}
                />
              </div>

              <div>
                <label
                  style={{
                    display: "block",
                    fontSize: "11px",
                    color: "#374151",
                    marginBottom: 4,
                  }}
                >
                  Split ratio to concentrate (0–1)
                </label>
                <input
                  type="number"
                  step="0.01"
                  min={0}
                  max={1}
                  value={editSplit}
                  onChange={(e) => setEditSplit(e.target.value)}
                  style={{
                    width: "100%",
                    border: "1px solid #d1d5db",
                    borderRadius: 4,
                    padding: "4px 6px",
                    fontSize: "12px",
                  }}
                />
              </div>
            </div>

            <div
              style={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 8,
                fontSize: "12px",
              }}
            >
              <button
                onClick={closeEditDialog}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  border: "1px solid #d1d5db",
                  backgroundColor: "#ffffff",
                  color: "#374151",
                  cursor: "pointer",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleSaveEditDialog}
                style={{
                  padding: "4px 10px",
                  borderRadius: 4,
                  border: "none",
                  backgroundColor: "#059669",
                  color: "#ffffff",
                  cursor: "pointer",
                }}
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}

export default function FlowsheetToolPage() {
  return (
    <ReactFlowProvider>
      <FlowsheetToolInner />
    </ReactFlowProvider>
  );
}