# backend/app/models.py
from typing import List
from pydantic import BaseModel


class FeedDefinition(BaseModel):
    """Feed definition: throughput (t/h) and grade (%) of valuable metal."""
    throughput: float  # t/h
    grade: float       # %


class UnitParameters(BaseModel):
    """Parameters of a single unit operation."""
    recovery: float      # fraction 0–1 of metal recovered
    split_ratio: float   # fraction 0–1 of mass sent to valuable stream


class SimulationUnit(BaseModel):
    """Process unit in the flowsheet."""
    id: str             # node id on the canvas
    type: str           # e.g. "CU_FEED", "CU_FLOT_ROUGHER"
    parameters: UnitParameters


class SimulationStream(BaseModel):
    """Connection between two units."""
    id: str
    from_unit: str
    to_unit: str


class FlowsheetModel(BaseModel):
    """Full flowsheet model sent by the frontend."""
    metal: str                    # "Cu" or "Zn"
    feed: FeedDefinition
    units: List[SimulationUnit]
    streams: List[SimulationStream]


class StreamResult(BaseModel):
    """Result for a single stream after simulation."""
    id: str
    from_unit: str
    to_unit: str
    flowrate: float   # t/h
    grade: float      # %


class SimulationResult(BaseModel):
    """Simulation result returned to the frontend."""
    streams: List[StreamResult]
    overall_recovery: float    # fraction 0–1
    messages: List[str] = []