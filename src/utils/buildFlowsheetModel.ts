// src/utils/buildFlowsheetModel.ts
import type {
  FlowsheetModel,
  SimulationUnit,
  SimulationStream,
} from "@/types/flowsheet";
import type { FlowsheetNode, MetalType } from "@/types/units";
import type { Edge } from "reactflow";

interface BuildFlowsheetArgs {
  metal: MetalType;
  feed: { throughput: number; grade: number };
  nodes: FlowsheetNode[];
  edges: Edge[];
}

export function buildFlowsheetModel({
  metal,
  feed,
  nodes,
  edges,
}: BuildFlowsheetArgs): FlowsheetModel {
  const units: SimulationUnit[] = nodes.map((node) => ({
    id: node.id,
    type: node.data.unitId,
    parameters: {
      recovery: node.data.parameters.recovery,
      split_ratio: node.data.parameters.split_ratio,
    },
  }));

  const streams: SimulationStream[] = edges.map((edge,index) => ({
    id: `S${index + 1}`,
    from_unit: edge.source,
    to_unit: edge.target ?? "",
  }));


  return {
    metal,
    feed: {
      throughput: feed.throughput,
      grade: feed.grade,
    },
    units,
    streams,
  };
}
