from collections import deque
from typing import Dict, List
from fastapi.middleware.cors import CORSMiddleware

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from .models import (
    FlowsheetModel,
    SimulationResult,
    StreamResult,
)

app = FastAPI(
    title="Educational Flowsheet Simulation API",
    version="0.4.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "https://flowsheet-tool-1oz8.vercel.app",
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

origins = [
    "http://localhost:3000",
    "http://127.0.0.1:3000",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.get("/health")
def health_check():
    return {"status": "ok"}


@app.post("/simulate", response_model=SimulationResult)
def simulate(flowsheet: FlowsheetModel) -> SimulationResult:
    """
    Simple mass-balance engine for a single valuable metal (Cu or Zn).

    For each unit:
      Input:
        M_in       [t/h]  : mass flowrate
        G_in       [%]    : metal grade
        Metal_in   [t/h]  : M_in * G_in / 100

      Parameters:
        R = recovery    (0–1)  fraction of metal recovered in valuable stream
        S = split_ratio (0–1)  fraction of mass sent to valuable stream

      If the unit has outgoing streams:
        M_out_total     = M_in * S
        Metal_out_total = Metal_in * R
        Output is distributed equally between all outgoing streams.

      If the unit has NO outgoing streams (sink unit):
        It is treated as a PRODUCT unit:
        Product_mass  = M_in * S
        Product_metal = Metal_in * R
        Product_metal is added to the overall recovered metal.
    """

    messages: List[str] = []

    # ---- basic checks ----
    if not flowsheet.units:
        return SimulationResult(
            streams=[],
            overall_recovery=0.0,
            messages=["No units defined in flowsheet."],
        )

    if not flowsheet.streams:
        return SimulationResult(
            streams=[],
            overall_recovery=0.0,
            messages=["No streams defined in flowsheet."],
        )

    # ---- build graph structures ----
    units_by_id = {u.id: u for u in flowsheet.units}

    outgoing: Dict[str, List] = {u.id: [] for u in flowsheet.units}
    incoming_count: Dict[str, int] = {u.id: 0 for u in flowsheet.units}

    for s in flowsheet.streams:
        if s.from_unit in outgoing:
            outgoing[s.from_unit].append(s)
        if s.to_unit in incoming_count:
            incoming_count[s.to_unit] += 1

    # ---- state: mass & metal per unit ----
    unit_mass: Dict[str, float] = {u.id: 0.0 for u in flowsheet.units}
    unit_metal: Dict[str, float] = {u.id: 0.0 for u in flowsheet.units}

    total_feed_mass = flowsheet.feed.throughput
    total_feed_metal = total_feed_mass * flowsheet.feed.grade / 100.0

    if total_feed_mass <= 0:
        return SimulationResult(
            streams=[],
            overall_recovery=0.0,
            messages=["Feed throughput must be > 0."],
        )

    if total_feed_metal < 0:
        return SimulationResult(
            streams=[],
            overall_recovery=0.0,
            messages=["Feed grade cannot be negative."],
        )

    # ---- source units: units without incoming streams ----
    source_units = [uid for uid, deg in incoming_count.items() if deg == 0]
    if not source_units:
        return SimulationResult(
            streams=[],
            overall_recovery=0.0,
            messages=["No source unit (unit without incoming streams) found."],
        )

    share = 1.0 / len(source_units)
    for uid in source_units:
        unit_mass[uid] = total_feed_mass * share
        unit_metal[uid] = total_feed_metal * share

    # ---- BFS traversal over flowsheet graph ----
    queue: deque[str] = deque(source_units)
    processed: set[str] = set()
    stream_results: List[StreamResult] = []

    # total metal recovered in all PRODUCT (sink) units
    product_metal = 0.0

    while queue:
        uid = queue.popleft()
        if uid in processed:
            continue
        processed.add(uid)

        M_in = unit_mass[uid]
        Metal_in = unit_metal[uid]

        # nothing to do if no mass
        if M_in <= 0 or Metal_in < 0:
            for s in outgoing.get(uid, []):
                if s.to_unit not in processed:
                    queue.append(s.to_unit)
            continue

        unit = units_by_id[uid]

        # clamp parameters to [0, 1]
        R = max(0.0, min(1.0, unit.parameters.recovery))
        S = max(0.0, min(1.0, unit.parameters.split_ratio))

        if R != unit.parameters.recovery or S != unit.parameters.split_ratio:
            messages.append(
                f"Unit {uid}: recovery/split_ratio clamped to [0, 1] range."
            )

        out_streams = outgoing.get(uid, [])
        n_out = len(out_streams)

        # total mass & metal in valuable stream at this unit
        M_val = M_in * S
        Metal_val = Metal_in * R

        if n_out == 0:
            # ---- SINK UNIT: treated as product ----
            # We only count recovered metal; tails are ignored here.
            product_metal += Metal_val
            continue

        # ---- NORMAL UNIT WITH OUTGOING STREAMS ----
        if n_out > 0:
            M_per_stream = M_val / n_out
            Metal_per_stream = Metal_val / n_out

            for s in out_streams:
                if M_per_stream > 0:
                    G_out = 100.0 * Metal_per_stream / M_per_stream
                else:
                    G_out = 0.0

                # record stream result
                stream_results.append(
                    StreamResult(
                        id=s.id,
                        from_unit=s.from_unit,
                        to_unit=s.to_unit,
                        flowrate=M_per_stream,
                        grade=G_out,
                    )
                )

                # accumulate state at destination unit
                prev_mass = unit_mass.get(s.to_unit, 0.0)
                prev_metal = unit_metal.get(s.to_unit, 0.0)
                unit_mass[s.to_unit] = prev_mass + M_per_stream
                unit_metal[s.to_unit] = prev_metal + Metal_per_stream

                if s.to_unit not in processed:
                    queue.append(s.to_unit)

    # ---- overall recovery based on recovered metal in sink units ----
    if total_feed_metal > 0:
        overall_recovery = product_metal / total_feed_metal
    else:
        overall_recovery = 0.0

    if not messages:
        messages.append(
            "Mass balance simulation completed (simple educational model)."
        )

    return SimulationResult(
        streams=stream_results,
        overall_recovery=overall_recovery,
        messages=messages,
    )