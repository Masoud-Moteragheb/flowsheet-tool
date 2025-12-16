(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/utils/validateFlowsheetModel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/validateFlowsheetModel.ts
__turbopack_context__.s([
    "validateFlowsheetModel",
    ()=>validateFlowsheetModel
]);
function validateFlowsheetModel(model) {
    const errors = [];
    // 1) حداقل یک واحد
    if (model.units.length === 0) {
        errors.push("No process units have been added to the flowsheet.");
    }
    // 2) حداقل یک جریان
    if (model.streams.length === 0) {
        errors.push("No streams have been defined between units.");
    }
    // 3) Feed منطقی
    if (model.feed.throughput <= 0) {
        errors.push("Feed throughput must be greater than zero.");
    }
    if (model.feed.grade < 0) {
        errors.push("Feed grade cannot be negative.");
    }
    // 4) چک کردن Streamهایی که مبدا/مقصد ندارند
    model.streams.forEach((s)=>{
        if (!s.from_unit) {
            errors.push(`Stream ${s.id} has no source unit.`);
        }
        if (!s.to_unit) {
            errors.push(`Stream ${s.id} has no target unit.`);
        }
    });
    // 5) پیدا کردن Unitهای جداافتاده (هیچ Stream ورودی/خروجی ندارند)
    const connectedUnitIds = new Set();
    model.streams.forEach((s)=>{
        if (s.from_unit) connectedUnitIds.add(s.from_unit);
        if (s.to_unit) connectedUnitIds.add(s.to_unit);
    });
    model.units.forEach((u)=>{
        if (!connectedUnitIds.has(u.id)) {
            errors.push(`Unit ${u.id} is isolated (no incoming or outgoing streams).`);
        }
    });
    return errors;
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/buildFlowsheetModel.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/buildFlowsheetModel.ts
__turbopack_context__.s([
    "buildFlowsheetModel",
    ()=>buildFlowsheetModel
]);
function buildFlowsheetModel({ metal, feed, nodes, edges }) {
    const units = nodes.map((node)=>({
            id: node.id,
            type: node.data.unitId,
            parameters: {
                recovery: node.data.parameters.recovery,
                split_ratio: node.data.parameters.split_ratio
            }
        }));
    const streams = edges.map((edge, index)=>({
            id: `S${index + 1}`,
            from_unit: edge.source,
            to_unit: edge.target ?? ""
        }));
    return {
        metal,
        feed: {
            throughput: feed.throughput,
            grade: feed.grade
        },
        units,
        streams
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/data/units.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/data/units.ts
__turbopack_context__.s([
    "allUnits",
    ()=>allUnits
]);
const allUnits = [
    // ----- Copper (Cu) -----
    {
        id: "CU_FEED",
        name: "Copper Feed",
        metal: "Cu",
        category: "Feed & Tailings",
        icon: "feed",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "CU_CRUSHER",
        name: "Cu Crusher",
        metal: "Cu",
        category: "Comminution",
        icon: "crusher",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "CU_MILL",
        name: "Cu Mill",
        metal: "Cu",
        category: "Comminution",
        icon: "mill",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "CU_FLOT_ROUGHER",
        name: "Cu Rougher Flotation",
        metal: "Cu",
        category: "Flotation",
        icon: "rougher",
        defaultParameters: {
            recovery: 0.8,
            split_ratio: 0.3
        }
    },
    {
        id: "CU_FLOT_CLEANER",
        name: "Cu Cleaner Flotation",
        metal: "Cu",
        category: "Flotation",
        icon: "cleaner",
        defaultParameters: {
            recovery: 0.95,
            split_ratio: 0.1
        }
    },
    {
        id: "CU_CONC_THICKENER",
        name: "Cu Concentrate Thickener",
        metal: "Cu",
        category: "Dewatering",
        icon: "thickener",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "CU_CONC_FILTER",
        name: "Cu Concentrate Filter",
        metal: "Cu",
        category: "Dewatering",
        icon: "filter",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "CU_TAILS_THICKENER",
        name: "Cu Tailings Thickener",
        metal: "Cu",
        category: "Feed & Tailings",
        icon: "tailings",
        defaultParameters: {
            recovery: 0.0,
            split_ratio: 1.0
        }
    },
    // ----- Zinc (Zn) -----
    {
        id: "ZN_FEED",
        name: "Zinc Feed",
        metal: "Zn",
        category: "Feed & Tailings",
        icon: "feed",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "ZN_CRUSHER",
        name: "Zn Crusher",
        metal: "Zn",
        category: "Comminution",
        icon: "crusher",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "ZN_MILL",
        name: "Zn Mill",
        metal: "Zn",
        category: "Comminution",
        icon: "mill",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "ZN_FLOT_ROUGHER",
        name: "Zn Rougher Flotation",
        metal: "Zn",
        category: "Flotation",
        icon: "rougher",
        defaultParameters: {
            recovery: 0.75,
            split_ratio: 0.25
        }
    },
    {
        id: "ZN_FLOT_CLEANER",
        name: "Zn Cleaner Flotation",
        metal: "Zn",
        category: "Flotation",
        icon: "cleaner",
        defaultParameters: {
            recovery: 0.9,
            split_ratio: 0.1
        }
    },
    {
        id: "ZN_CONC_THICKENER",
        name: "Zn Concentrate Thickener",
        metal: "Zn",
        category: "Dewatering",
        icon: "thickener",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "ZN_CONC_FILTER",
        name: "Zn Concentrate Filter",
        metal: "Zn",
        category: "Dewatering",
        icon: "filter",
        defaultParameters: {
            recovery: 1.0,
            split_ratio: 1.0
        }
    },
    {
        id: "ZN_TAILS_THICKENER",
        name: "Zn Tailings Thickener",
        metal: "Zn",
        category: "Feed & Tailings",
        icon: "tailings",
        defaultParameters: {
            recovery: 0.0,
            split_ratio: 1.0
        }
    }
];
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/BlockLibraryPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockLibraryPanel",
    ()=>BlockLibraryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/units.ts [app-client] (ecmascript)");
"use client";
;
;
;
const CATEGORIES = [
    "Feed & Tailings",
    "Comminution",
    "Flotation",
    "Dewatering"
];
function BlockLibraryPanel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(8);
    if ($[0] !== "23ba8e0e6c1509374c5ed1c2859c5a04ede66f38d48a512bfe294061c1e056f3") {
        for(let $i = 0; $i < 8; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "23ba8e0e6c1509374c5ed1c2859c5a04ede66f38d48a512bfe294061c1e056f3";
    }
    const { selectedMetal } = t0;
    let map;
    if ($[1] !== selectedMetal) {
        const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allUnits"].filter({
            "BlockLibraryPanel[allUnits.filter()]": (u)=>u.metal === selectedMetal
        }["BlockLibraryPanel[allUnits.filter()]"]);
        map = {
            "Feed & Tailings": [],
            Comminution: [],
            Flotation: [],
            Dewatering: []
        };
        filtered.forEach({
            "BlockLibraryPanel[filtered.forEach()]": (u_0)=>map[u_0.category].push(u_0)
        }["BlockLibraryPanel[filtered.forEach()]"]);
        $[1] = selectedMetal;
        $[2] = map;
    } else {
        map = $[2];
    }
    const unitsByCategory = map;
    const handleDragStart = _BlockLibraryPanelHandleDragStart;
    let t1;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-3 py-3 border-b font-semibold text-sm",
            children: "Block Library"
        }, void 0, false, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 45,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    let t2;
    if ($[4] !== unitsByCategory) {
        t2 = CATEGORIES.map({
            "BlockLibraryPanel[CATEGORIES.map()]": (category)=>{
                const units = unitsByCategory[category];
                if (!units.length) {
                    return null;
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "mb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wide",
                            children: category
                        }, void 0, false, {
                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                            lineNumber: 58,
                            columnNumber: 36
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col space-y-1",
                            children: units.map({
                                "BlockLibraryPanel[CATEGORIES.map() > units.map()]": (unit_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: true,
                                        onDragStart: {
                                            "BlockLibraryPanel[CATEGORIES.map() > units.map() > <div>.onDragStart]": (e)=>handleDragStart(e, unit_0)
                                        }["BlockLibraryPanel[CATEGORIES.map() > units.map() > <div>.onDragStart]"],
                                        title: `${unit_0.name}\nRec: ${unit_0.defaultParameters.recovery} • Split: ${unit_0.defaultParameters.split_ratio}`,
                                        className: "w-full flex items-center justify-start cursor-move rounded px-1 py-1 hover:bg-slate-100 transition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `/icons/${unit_0.icon}.png`,
                                            alt: unit_0.name,
                                            className: "object-contain",
                                            style: {
                                                width: 60,
                                                height: 60
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                            lineNumber: 61,
                                            columnNumber: 319
                                        }, this)
                                    }, unit_0.id, false, {
                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                        lineNumber: 59,
                                        columnNumber: 78
                                    }, this)
                            }["BlockLibraryPanel[CATEGORIES.map() > units.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                            lineNumber: 58,
                            columnNumber: 139
                        }, this)
                    ]
                }, category, true, {
                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                    lineNumber: 58,
                    columnNumber: 16
                }, this);
            }
        }["BlockLibraryPanel[CATEGORIES.map()]"]);
        $[4] = unitsByCategory;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    let t3;
    if ($[6] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "w-44 border-r bg-white flex flex-col text-xs",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex-1 overflow-auto px-3 py-3 space-y-4",
                    children: t2
                }, void 0, false, {
                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                    lineNumber: 75,
                    columnNumber: 78
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 75,
            columnNumber: 10
        }, this);
        $[6] = t2;
        $[7] = t3;
    } else {
        t3 = $[7];
    }
    return t3;
}
_c = BlockLibraryPanel;
function _BlockLibraryPanelHandleDragStart(event, unit) {
    event.dataTransfer.setData("application/json", JSON.stringify({
        type: unit.id,
        parameters: unit.defaultParameters
    }));
    event.dataTransfer.effectAllowed = "move";
}
var _c;
__turbopack_context__.k.register(_c, "BlockLibraryPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/FlowsheetCanvas.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/FlowsheetCanvas.tsx
__turbopack_context__.s([
    "FlowsheetCanvas",
    ()=>FlowsheetCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
// 👇 کامپوننت نود سفارشی (فقط یک کادر + آیکون + Rec/Split + دو Handle)
function UnitNode(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(23);
    if ($[0] !== "d41d6b75e89aee6147bec321a3ee9c1b8d5a27104b1b468e181be4457b6041a1") {
        for(let $i = 0; $i < 23; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d41d6b75e89aee6147bec321a3ee9c1b8d5a27104b1b468e181be4457b6041a1";
    }
    const { data } = t0;
    const { label, icon, metal, parameters } = data;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            minWidth: 220,
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 1px 2px rgba(15,23,42,0.08)"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    let t3;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "target",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
            style: {
                background: "#0f172a",
                width: 8,
                height: 8
            }
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 68,
            columnNumber: 10
        }, this);
        t3 = {
            width: 32,
            height: 32,
            borderRadius: 8,
            overflow: "hidden",
            background: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
        };
        $[2] = t2;
        $[3] = t3;
    } else {
        t2 = $[2];
        t3 = $[3];
    }
    let t4;
    if ($[4] !== icon || $[5] !== label || $[6] !== metal) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t3,
            children: icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: `/icons/${icon}.png`,
                alt: label,
                style: {
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectFit: "contain"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 92,
                columnNumber: 34
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#0f172a"
                },
                children: metal
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 96,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[4] = icon;
        $[5] = label;
        $[6] = metal;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    let t6;
    if ($[8] === Symbol.for("react.memo_cache_sentinel")) {
        t5 = {
            display: "flex",
            flexDirection: "column",
            fontSize: 12
        };
        t6 = {
            fontWeight: 600,
            marginBottom: 2
        };
        $[8] = t5;
        $[9] = t6;
    } else {
        t5 = $[8];
        t6 = $[9];
    }
    let t7;
    if ($[10] !== label) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: t6,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 128,
            columnNumber: 10
        }, this);
        $[10] = label;
        $[11] = t7;
    } else {
        t7 = $[11];
    }
    let t8;
    if ($[12] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = {
            fontSize: 11,
            color: "#64748b"
        };
        $[12] = t8;
    } else {
        t8 = $[12];
    }
    let t9;
    if ($[13] !== parameters.recovery || $[14] !== parameters.split_ratio) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: t8,
            children: [
                "Rec: ",
                parameters.recovery,
                " • Split: ",
                parameters.split_ratio
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 146,
            columnNumber: 10
        }, this);
        $[13] = parameters.recovery;
        $[14] = parameters.split_ratio;
        $[15] = t9;
    } else {
        t9 = $[15];
    }
    let t10;
    if ($[16] !== t7 || $[17] !== t9) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t5,
            children: [
                t7,
                t9
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 155,
            columnNumber: 11
        }, this);
        $[16] = t7;
        $[17] = t9;
        $[18] = t10;
    } else {
        t10 = $[18];
    }
    let t11;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "source",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
            style: {
                background: "#0f172a",
                width: 8,
                height: 8
            }
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 164,
            columnNumber: 11
        }, this);
        $[19] = t11;
    } else {
        t11 = $[19];
    }
    let t12;
    if ($[20] !== t10 || $[21] !== t4) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "unit-node",
            style: t1,
            children: [
                t2,
                t4,
                t10,
                t11
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 175,
            columnNumber: 11
        }, this);
        $[20] = t10;
        $[21] = t4;
        $[22] = t12;
    } else {
        t12 = $[22];
    }
    return t12;
}
_c = UnitNode;
const nodeTypes = {
    unit: UnitNode
};
function FlowsheetCanvas(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(21);
    if ($[0] !== "d41d6b75e89aee6147bec321a3ee9c1b8d5a27104b1b468e181be4457b6041a1") {
        for(let $i = 0; $i < 21; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "d41d6b75e89aee6147bec321a3ee9c1b8d5a27104b1b468e181be4457b6041a1";
    }
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodeDoubleClick } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = {
            width: "100%",
            height: "100%"
        };
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    let t2;
    if ($[2] !== onNodeClick) {
        t2 = ({
            "FlowsheetCanvas[<ReactFlow>.onNodeClick]": (_, node)=>onNodeClick && onNodeClick(node)
        })["FlowsheetCanvas[<ReactFlow>.onNodeClick]"];
        $[2] = onNodeClick;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    if ($[4] !== onNodeDoubleClick) {
        t3 = ({
            "FlowsheetCanvas[<ReactFlow>.onNodeDoubleClick]": (__0, node_0)=>onNodeDoubleClick && onNodeDoubleClick(node_0)
        })["FlowsheetCanvas[<ReactFlow>.onNodeDoubleClick]"];
        $[4] = onNodeDoubleClick;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    let t5;
    let t6;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
            gap: 16,
            size: 1,
            color: "#e2e8f0"
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 240,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 241,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {}, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 242,
            columnNumber: 10
        }, this);
        $[6] = t4;
        $[7] = t5;
        $[8] = t6;
    } else {
        t4 = $[6];
        t5 = $[7];
        t6 = $[8];
    }
    let t7;
    if ($[9] !== edges || $[10] !== nodes || $[11] !== onConnect || $[12] !== onEdgesChange || $[13] !== onNodesChange || $[14] !== t2 || $[15] !== t3) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactFlow"], {
            nodes: nodes,
            edges: edges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onConnect: onConnect,
            nodeTypes: nodeTypes,
            fitView: true,
            onNodeClick: t2,
            onNodeDoubleClick: t3,
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 253,
            columnNumber: 10
        }, this);
        $[9] = edges;
        $[10] = nodes;
        $[11] = onConnect;
        $[12] = onEdgesChange;
        $[13] = onNodesChange;
        $[14] = t2;
        $[15] = t3;
        $[16] = t7;
    } else {
        t7 = $[16];
    }
    let t8;
    if ($[17] !== onDragOver || $[18] !== onDrop || $[19] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t1,
            onDrop: onDrop,
            onDragOver: onDragOver,
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 267,
            columnNumber: 10
        }, this);
        $[17] = onDragOver;
        $[18] = onDrop;
        $[19] = t7;
        $[20] = t8;
    } else {
        t8 = $[20];
    }
    return t8;
}
_c1 = FlowsheetCanvas;
var _c, _c1;
__turbopack_context__.k.register(_c, "UnitNode");
__turbopack_context__.k.register(_c1, "FlowsheetCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/utils/createNode.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/createNode.ts
__turbopack_context__.s([
    "createNodeFromUnit",
    ()=>createNodeFromUnit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/units.ts [app-client] (ecmascript)");
;
function createNodeFromUnit(unitId, position) {
    const unit = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allUnits"].find((u)=>u.id === unitId);
    if (!unit) return null;
    const id = `${unit.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
        id,
        type: "processNode",
        position,
        data: {
            unitId: unit.id,
            label: unit.name,
            metal: unit.metal,
            icon: unit.icon,
            parameters: {
                recovery: unit.defaultParameters.recovery,
                split_ratio: unit.defaultParameters.split_ratio
            }
        },
        style: {
            borderRadius: 8,
            padding: 8,
            borderWidth: 1,
            borderColor: "#CBD5F5",
            backgroundColor: "#FFFFFF",
            fontSize: 11
        }
    };
}
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/ResultsPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/ResultsPanel.tsx
__turbopack_context__.s([
    "ResultsPanel",
    ()=>ResultsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
"use client";
;
;
function ResultsPanel(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "89a45f13f4d6f5fd503990822d7d611df2e2ce3ea94429703cedaadcc3e37201") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "89a45f13f4d6f5fd503990822d7d611df2e2ce3ea94429703cedaadcc3e37201";
    }
    const { result, isSimulating, onRunSimulation } = t0;
    let t1;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-medium",
            children: "Simulation Results"
        }, void 0, false, {
            fileName: "[project]/src/components/ResultsPanel.tsx",
            lineNumber: 26,
            columnNumber: 10
        }, this);
        $[1] = t1;
    } else {
        t1 = $[1];
    }
    const t2 = `px-3 py-1.5 rounded-md text-xs font-medium ${isSimulating ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`;
    const t3 = isSimulating ? "Simulating..." : "Run Simulation";
    let t4;
    if ($[2] !== isSimulating || $[3] !== onRunSimulation || $[4] !== t2 || $[5] !== t3) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between gap-4",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                    onClick: onRunSimulation,
                    disabled: isSimulating,
                    className: t2,
                    children: t3
                }, void 0, false, {
                    fileName: "[project]/src/components/ResultsPanel.tsx",
                    lineNumber: 35,
                    columnNumber: 71
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ResultsPanel.tsx",
            lineNumber: 35,
            columnNumber: 10
        }, this);
        $[2] = isSimulating;
        $[3] = onRunSimulation;
        $[4] = t2;
        $[5] = t3;
        $[6] = t4;
    } else {
        t4 = $[6];
    }
    let t5;
    if ($[7] !== result) {
        t5 = !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-500",
            children: [
                "No simulation has been run yet. Build a flowsheet and click",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "font-semibold",
                    children: "Run Simulation"
                }, void 0, false, {
                    fileName: "[project]/src/components/ResultsPanel.tsx",
                    lineNumber: 46,
                    columnNumber: 125
                }, this),
                "."
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ResultsPanel.tsx",
            lineNumber: 46,
            columnNumber: 21
        }, this);
        $[7] = result;
        $[8] = t5;
    } else {
        t5 = $[8];
    }
    let t6;
    if ($[9] !== result) {
        t6 = result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-4 text-xs",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "text-slate-500",
                                    children: "Overall recovery:"
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 54,
                                    columnNumber: 76
                                }, this),
                                " ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "font-semibold",
                                    children: [
                                        (result.overall_recovery * 100).toFixed(1),
                                        " %"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 54,
                                    columnNumber: 138
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ResultsPanel.tsx",
                            lineNumber: 54,
                            columnNumber: 71
                        }, this),
                        result.messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-red-600",
                            children: result.messages.map(_ResultsPanelResultMessagesMap)
                        }, void 0, false, {
                            fileName: "[project]/src/components/ResultsPanel.tsx",
                            lineNumber: 54,
                            columnNumber: 260
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/components/ResultsPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 22
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "border rounded-md overflow-hidden",
                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                        className: "w-full text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                className: "bg-slate-100 text-slate-600",
                                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left",
                                            children: "Stream"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 492
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left",
                                            children: "From"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 539
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left",
                                            children: "To"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 584
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-right",
                                            children: "Flowrate (t/h)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 627
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-right",
                                            children: "Grade (%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 683
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 54,
                                    columnNumber: 488
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 441
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: result.streams.map(_ResultsPanelResultStreamsMap)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 747
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 54,
                        columnNumber: 407
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ResultsPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 356
                }, this)
            ]
        }, void 0, true);
        $[9] = result;
        $[10] = t6;
    } else {
        t6 = $[10];
    }
    let t7;
    if ($[11] !== t4 || $[12] !== t5 || $[13] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "border-t bg-white text-sm px-4 py-3 flex flex-col gap-3",
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ResultsPanel.tsx",
            lineNumber: 62,
            columnNumber: 10
        }, this);
        $[11] = t4;
        $[12] = t5;
        $[13] = t6;
        $[14] = t7;
    } else {
        t7 = $[14];
    }
    return t7;
}
_c = ResultsPanel;
function _ResultsPanelResultStreamsMap(s) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
        className: "border-t",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1",
                children: s.id
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 46
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1",
                children: s.from_unit
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 83
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1",
                children: s.to_unit
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 127
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 text-right",
                children: s.flowrate.toFixed(2)
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 169
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 text-right",
                children: s.grade.toFixed(2)
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 234
            }, this)
        ]
    }, s.id, true, {
        fileName: "[project]/src/components/ResultsPanel.tsx",
        lineNumber: 73,
        columnNumber: 10
    }, this);
}
function _ResultsPanelResultMessagesMap(m, i) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
        className: "mr-2",
        children: [
            "• ",
            m
        ]
    }, i, true, {
        fileName: "[project]/src/components/ResultsPanel.tsx",
        lineNumber: 76,
        columnNumber: 10
    }, this);
}
var _c;
__turbopack_context__.k.register(_c, "ResultsPanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/app/flowsheet-tool/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlowsheetToolPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validateFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlockLibraryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlowsheetCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/createNode.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsPanel.tsx [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
;
;
;
;
;
;
;
function FlowsheetToolInner() {
    _s();
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetal, setSelectedMetal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Cu");
    // ✅ state نودها و Edgeها
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    // ✅ فقط برای انتخاب (اگر بعداً لازم شد)
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ state خوراک (Feed)
    const [feed, setFeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        throughput: 100,
        grade: 1.0
    });
    // ✅ state برای پاپ‌آپ ویرایش
    const [editNode, setEditNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editRecovery, setEditRecovery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1");
    const [editSplit, setEditSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1");
    // اتصال نودها
    const onConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[onConnect]": (connection)=>{
            setEdges({
                "FlowsheetToolInner.useCallback[onConnect]": (eds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEdge"])({
                        ...connection,
                        animated: true
                    }, eds)
            }["FlowsheetToolInner.useCallback[onConnect]"]);
        }
    }["FlowsheetToolInner.useCallback[onConnect]"], [
        setEdges
    ]);
    // برای Drag & Drop
    const onDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[onDragOver]": (event)=>{
            event.preventDefault();
            event.dataTransfer.dropEffect = "move";
        }
    }["FlowsheetToolInner.useCallback[onDragOver]"], []);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[onDrop]": (event_0)=>{
            event_0.preventDefault();
            const raw = event_0.dataTransfer.getData("application/json");
            if (!raw) return;
            let payload = null;
            try {
                payload = JSON.parse(raw);
            } catch  {
                return;
            }
            const unitId = payload.type;
            const bounds = event_0.target.getBoundingClientRect();
            const position = {
                x: event_0.clientX - bounds.left,
                y: event_0.clientY - bounds.top
            };
            const newNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNodeFromUnit"])(unitId, position);
            if (!newNode) return;
            setNodes({
                "FlowsheetToolInner.useCallback[onDrop]": (nds)=>nds.concat(newNode)
            }["FlowsheetToolInner.useCallback[onDrop]"]);
        }
    }["FlowsheetToolInner.useCallback[onDrop]"], [
        setNodes
    ]);
    const handleNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleNodeClick]": (node)=>{
            setSelectedNodeId(node.id);
        }
    }["FlowsheetToolInner.useCallback[handleNodeClick]"], []);
    // 🔹 دابل‌کلیک روی نود → باز شدن پاپ‌آپ
    const handleNodeDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleNodeDoubleClick]": (node_0)=>{
            const params = node_0.data?.parameters ?? {
                recovery: 1,
                split_ratio: 1
            };
            setEditNode(node_0);
            setEditRecovery(String(params.recovery));
            setEditSplit(String(params.split_ratio));
        }
    }["FlowsheetToolInner.useCallback[handleNodeDoubleClick]"], []);
    const closeEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[closeEditDialog]": ()=>{
            setEditNode(null);
        }
    }["FlowsheetToolInner.useCallback[closeEditDialog]"], []);
    const handleSaveEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleSaveEditDialog]": ()=>{
            if (!editNode) return;
            let rec = parseFloat(editRecovery);
            let split = parseFloat(editSplit);
            if (Number.isNaN(rec)) rec = 1;
            if (Number.isNaN(split)) split = 1;
            // محدود کردن بین 0 و 1
            rec = Math.min(Math.max(rec, 0), 1);
            split = Math.min(Math.max(split, 0), 1);
            const nodeId = editNode.id;
            setNodes({
                "FlowsheetToolInner.useCallback[handleSaveEditDialog]": (nds_0)=>nds_0.map({
                        "FlowsheetToolInner.useCallback[handleSaveEditDialog]": (node_1)=>node_1.id === nodeId ? {
                                ...node_1,
                                data: {
                                    ...node_1.data,
                                    parameters: {
                                        recovery: rec,
                                        split_ratio: split
                                    }
                                }
                            } : node_1
                    }["FlowsheetToolInner.useCallback[handleSaveEditDialog]"])
            }["FlowsheetToolInner.useCallback[handleSaveEditDialog]"]);
            setEditNode(null);
        }
    }["FlowsheetToolInner.useCallback[handleSaveEditDialog]"], [
        editNode,
        editRecovery,
        editSplit,
        setNodes
    ]);
    // ✅ اجرای Simulation (ارتباط با Backend)
    const handleRunSimulation = async ()=>{
        const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFlowsheetModel"])({
            metal: selectedMetal,
            feed,
            nodes,
            edges
        });
        console.log("FlowsheetModel to send:", model);
        // 🔍 Validation در فرانت‌اند
        const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateFlowsheetModel"])(model);
        if (errors.length > 0) {
            setSimulationResult({
                streams: [],
                overall_recovery: 0,
                messages: errors
            });
            return;
        }
        setIsSimulating(true);
        try {
            const response = await fetch("http://127.0.0.1:8000/simulate", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(model)
            });
            if (!response.ok) {
                const text = await response.text();
                console.error("Simulation API error:", response.status, text);
                setSimulationResult({
                    streams: [],
                    overall_recovery: 0,
                    messages: [
                        `Simulation API error: ${response.status}`,
                        "Check if the FastAPI server is running on port 8000."
                    ]
                });
            } else {
                const data = await response.json();
                console.log("SimulationResult from backend:", data);
                setSimulationResult(data);
            }
        } catch (err) {
            console.error("Simulation request failed:", err);
            setSimulationResult({
                streams: [],
                overall_recovery: 0,
                messages: [
                    "Could not connect to the simulation server.",
                    "Make sure FastAPI is running on http://127.0.0.1:8000."
                ]
            });
        } finally{
            setIsSimulating(false);
        }
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between px-6 py-4 border-b bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs tracking-wide text-slate-500",
                                children: "EDUCATIONAL FLOWSHEET SIMULATOR"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 177,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold",
                                children: [
                                    "Flowsheet Tool",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "(Copper / Zinc)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 182,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 180,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 176,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: "Metal:"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 187,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Cu"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Cu" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Cu"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 188,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Zn"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Zn" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Zn"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 191,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 186,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 175,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockLibraryPanel"], {
                        selectedMetal: selectedMetal
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 200,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex-1 bg-slate-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowsheetCanvas"], {
                            nodes: nodes,
                            edges: edges,
                            onNodesChange: onNodesChange,
                            onEdgesChange: onEdgesChange,
                            onConnect: onConnect,
                            onDrop: onDrop,
                            onDragOver: onDragOver,
                            onNodeClick: handleNodeClick,
                            onNodeDoubleClick: handleNodeDoubleClick
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 204,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 203,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 198,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b flex items-center justify-between gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500",
                                                children: "Feed throughput (t/h)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 213,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "border rounded px-2 py-1 text-xs w-24",
                                                value: feed.throughput,
                                                onChange: (e)=>setFeed((f)=>({
                                                            ...f,
                                                            throughput: parseFloat(e.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 214,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 212,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500",
                                                children: "Feed grade (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 220,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "border rounded px-2 py-1 text-xs w-24",
                                                value: feed.grade,
                                                onChange: (e_0)=>setFeed((f_0)=>({
                                                            ...f_0,
                                                            grade: parseFloat(e_0.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 221,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 219,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 211,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRunSimulation,
                                disabled: isSimulating,
                                className: `px-3 py-1.5 rounded-md text-xs font-medium ${isSimulating ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`,
                                children: isSimulating ? "Simulating..." : "Run Simulation"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 210,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsPanel"], {
                        result: simulationResult,
                        isSimulating: isSimulating,
                        onRunSimulation: handleRunSimulation
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 233,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 209,
                columnNumber: 7
            }, this),
            editNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg w-full max-w-sm p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold mb-3",
                            children: "Edit Unit Parameters"
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 239,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-slate-500 mb-2",
                            children: editNode.data?.label
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 240,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs text-slate-600 mb-1",
                                            children: "Recovery (0–1, fraction)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 246,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editRecovery,
                                            onChange: (e_1)=>setEditRecovery(e_1.target.value),
                                            className: "w-full border rounded px-2 py-1 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 249,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 245,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs text-slate-600 mb-1",
                                            children: "Split ratio to concentrate (0–1)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 252,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editSplit,
                                            onChange: (e_2)=>setEditSplit(e_2.target.value),
                                            className: "w-full border rounded px-2 py-1 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 255,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 251,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 244,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeEditDialog,
                                    className: "px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 260,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveEditDialog,
                                    className: "px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 263,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 259,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 238,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 237,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 173,
        columnNumber: 10
    }, this);
}
_s(FlowsheetToolInner, "AMR1B0qykXMOLGcBmf6mSC90zOA=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"]
    ];
});
_c = FlowsheetToolInner;
function FlowsheetToolPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "2c1509f92fa4e73331da8113e3d40e6e32f9a4130722e911ed2cb1bbef6c470d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "2c1509f92fa4e73331da8113e3d40e6e32f9a4130722e911ed2cb1bbef6c470d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowsheetToolInner, {}, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 281,
                columnNumber: 29
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 281,
            columnNumber: 10
        }, this);
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    return t0;
}
_c1 = FlowsheetToolPage;
var _c, _c1;
__turbopack_context__.k.register(_c, "FlowsheetToolInner");
__turbopack_context__.k.register(_c1, "FlowsheetToolPage");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=_9884cfa3._.js.map