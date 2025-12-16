// src/types/flowsheet.ts
import type { MetalType, FlowsheetNode } from "./units";

export interface FeedDefinition {
  throughput: number; // t/h
  grade: number; // %
}

export interface SimulationUnit {
  id: string;
  type: string;
  parameters: {
    recovery: number;
    split_ratio: number;
  };
}

export interface SimulationStream {
  id: string;
  from_unit: string;
  to_unit: string;
}

export interface FlowsheetModel {
  metal: MetalType;
  feed: FeedDefinition;
  units: SimulationUnit[];
  streams: SimulationStream[];
}
