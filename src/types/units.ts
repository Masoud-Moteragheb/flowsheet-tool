// src/types/units.ts

export type MetalType = "Cu" | "Zn";

export type UnitCategory =
  | "Feed & Tailings"
  | "Comminution"
  | "Flotation"
  | "Dewatering";

export interface UnitDefinition {
  id: string; // e.g. "CU_FLOT_ROUGHER"
  name: string; // e.g. "Rougher Flotation"
  metal: MetalType;
  category: UnitCategory;
  icon?: string; 
  defaultParameters: {
    recovery: number;
    split_ratio: number;
  };
}


export interface FlowsheetNodeData {
  unitId: string; // e.g. "CU_FLOT_ROUGHER"
  label: string;
  metal: MetalType;
  icon?: string;
  parameters: {
    recovery: number;
    split_ratio: number;
  };
}


import type { Node } from "reactflow";

export interface FlowsheetNodeData {
  unitId: string;
  label: string;
  metal: MetalType;
  parameters: {
    recovery: number;
    split_ratio: number;
  };
}

export type FlowsheetNode = Node<FlowsheetNodeData>;

// src/types/flowsheet.ts
import type { MetalType, FlowsheetNode } from "./units";

export interface FeedDefinition {
  throughput: number; // t/h
  grade: number; // %
}

export interface SimulationUnit {
  id: string; // node.id
  type: string; // node.data.unitId  (e.g. "CU_FLOT_ROUGHER")
  parameters: {
    recovery: number;
    split_ratio: number;
  };
}

export interface SimulationStream {
  id: string;      // edge.id
  from: string;    // source node id, or "FEED"
  to: string;      // target node id
}

export interface FlowsheetModel {
  metal: MetalType;
  feed: FeedDefinition;
  units: SimulationUnit[];
  streams: SimulationStream[];
}

