// src/types/simulation.ts

export interface StreamResult {
  id: string;
  from_unit: string;
  to_unit: string;
  flowrate: number;
  grade: number;
}

export interface SimulationResult {
  streams: StreamResult[];
  overall_recovery: number; // 0–1
  messages: string[];
}
