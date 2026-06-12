import type { Node } from "reactflow";

export type MetalType = "Cu" | "Zn";

export type UnitCategory =
  | "Feed & Tailings"
  | "Comminution"
  | "Flotation"
  | "Dewatering";

export interface UnitDefinition {
  id: string;
  name: string;
  metal: MetalType;
  category: UnitCategory;
  icon?: string;
  defaultParameters: {
    recovery: number;
    split_ratio: number;
  };
}

export interface FlowsheetNodeData {
  unitId: string;
  label: string;
  metal: MetalType;
  icon?: string;
  parameters: {
    recovery: number;
    split_ratio: number;
  };
}

export type FlowsheetNode = Node<FlowsheetNodeData>;