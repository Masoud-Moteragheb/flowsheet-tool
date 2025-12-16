module.exports = [
"[project]/src/utils/validateFlowsheetModel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/utils/buildFlowsheetModel.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/data/units.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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
}),
"[project]/src/components/BlockLibraryPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "BlockLibraryPanel",
    ()=>BlockLibraryPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/units.ts [app-ssr] (ecmascript)");
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
function BlockLibraryPanel({ selectedMetal }) {
    const unitsByCategory = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useMemo"])(()=>{
        const filtered = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUnits"].filter((u)=>u.metal === selectedMetal);
        const map = {
            "Feed & Tailings": [],
            Comminution: [],
            Flotation: [],
            Dewatering: []
        };
        filtered.forEach((u)=>map[u.category].push(u));
        return map;
    }, [
        selectedMetal
    ]);
    const handleDragStart = (event, unit)=>{
        event.dataTransfer.setData("application/json", JSON.stringify({
            type: unit.id,
            parameters: unit.defaultParameters
        }));
        event.dataTransfer.effectAllowed = "move";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-44 border-r bg-white flex flex-col text-xs",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "px-3 py-3 border-b font-semibold text-sm",
                children: "Block Library"
            }, void 0, false, {
                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex-1 overflow-auto px-3 py-3 space-y-4",
                children: CATEGORIES.map((category)=>{
                    const units = unitsByCategory[category];
                    if (!units.length) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "mb-1 text-[11px] font-semibold text-slate-600 uppercase tracking-wide",
                                children: category
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                lineNumber: 58,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col space-y-1",
                                children: units.map((unit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: true,
                                        onDragStart: (e)=>handleDragStart(e, unit),
                                        title: `${unit.name}\nRec: ${unit.defaultParameters.recovery} • Split: ${unit.defaultParameters.split_ratio}`,
                                        className: "w-full flex items-center justify-start cursor-move rounded px-1 py-1 hover:bg-slate-100 transition",
                                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                            src: `/icons/${unit.icon}.png`,
                                            alt: unit.name,
                                            className: "object-contain",
                                            style: {
                                                width: 60,
                                                height: 60
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                            lineNumber: 71,
                                            columnNumber: 21
                                        }, this)
                                    }, unit.id, false, {
                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                        lineNumber: 64,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this)
                        ]
                    }, category, true, {
                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                        lineNumber: 57,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                lineNumber: 51,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/FlowsheetCanvas.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/FlowsheetCanvas.tsx
__turbopack_context__.s([
    "FlowsheetCanvas",
    ()=>FlowsheetCanvas
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
// 👇 کامپوننت نود سفارشی (فقط یک کادر + آیکون + Rec/Split + دو Handle)
function UnitNode({ data }) {
    const { label, icon, metal, parameters } = data;
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "unit-node",
        style: {
            minWidth: 220,
            padding: "8px 12px",
            borderRadius: 12,
            border: "1px solid #cbd5e1",
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow: "0 1px 2px rgba(15,23,42,0.08)"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Top,
                style: {
                    background: "#0f172a",
                    width: 8,
                    height: 8
                }
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 61,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    width: 32,
                    height: 32,
                    borderRadius: 8,
                    overflow: "hidden",
                    background: "#e2e8f0",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0
                },
                children: icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: `/icons/${icon}.png`,
                    alt: label,
                    style: {
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 82,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    style: {
                        fontSize: 10,
                        fontWeight: 600,
                        color: "#0f172a"
                    },
                    children: metal
                }, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 92,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 68,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flexDirection: "column",
                    fontSize: 12
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontWeight: 600,
                            marginBottom: 2
                        },
                        children: label
                    }, void 0, false, {
                        fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                        lineNumber: 106,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        style: {
                            fontSize: 11,
                            color: "#64748b"
                        },
                        children: [
                            "Rec: ",
                            parameters.recovery,
                            " • Split: ",
                            parameters.split_ratio
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                        lineNumber: 107,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 105,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Bottom,
                style: {
                    background: "#0f172a",
                    width: 8,
                    height: 8
                }
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 113,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/FlowsheetCanvas.tsx",
        lineNumber: 46,
        columnNumber: 5
    }, this);
}
const nodeTypes = {
    unit: UnitNode
};
function FlowsheetCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodeDoubleClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        style: {
            width: "100%",
            height: "100%"
        },
        onDrop: onDrop,
        onDragOver: onDragOver,
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactFlow"], {
            nodes: nodes,
            edges: edges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onConnect: onConnect,
            nodeTypes: nodeTypes,
            fitView: true,
            onNodeClick: (_, node)=>onNodeClick && onNodeClick(node),
            onNodeDoubleClick: (_, node)=>onNodeDoubleClick && onNodeDoubleClick(node),
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Background"], {
                    gap: 16,
                    size: 1,
                    color: "#e2e8f0"
                }, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 158,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 159,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniMap"], {}, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 160,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 143,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FlowsheetCanvas.tsx",
        lineNumber: 138,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/utils/createNode.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/createNode.ts
__turbopack_context__.s([
    "createNodeFromUnit",
    ()=>createNodeFromUnit
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/units.ts [app-ssr] (ecmascript)");
;
function createNodeFromUnit(unitId, position) {
    const unit = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["allUnits"].find((u)=>u.id === unitId);
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
}),
"[project]/src/components/ResultsPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/ResultsPanel.tsx
__turbopack_context__.s([
    "ResultsPanel",
    ()=>ResultsPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
"use client";
;
function ResultsPanel({ result, isSimulating, onRunSimulation }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
        className: "border-t bg-white text-sm px-4 py-3 flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between gap-4",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-medium",
                        children: "Simulation Results"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 20,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        onClick: onRunSimulation,
                        disabled: isSimulating,
                        className: `px-3 py-1.5 rounded-md text-xs font-medium ${isSimulating ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`,
                        children: isSimulating ? "Simulating..." : "Run Simulation"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 21,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 19,
                columnNumber: 7
            }, this),
            !result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "text-xs text-slate-500",
                children: [
                    "No simulation has been run yet. Build a flowsheet and click",
                    " ",
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-semibold",
                        children: "Run Simulation"
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 37,
                        columnNumber: 11
                    }, this),
                    "."
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 35,
                columnNumber: 9
            }, this),
            result && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Fragment"], {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-4 text-xs",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-slate-500",
                                        children: "Overall recovery:"
                                    }, void 0, false, {
                                        fileName: "[project]/src/components/ResultsPanel.tsx",
                                        lineNumber: 45,
                                        columnNumber: 15
                                    }, this),
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "font-semibold",
                                        children: [
                                            (result.overall_recovery * 100).toFixed(1),
                                            " %"
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultsPanel.tsx",
                                        lineNumber: 46,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 44,
                                columnNumber: 13
                            }, this),
                            result.messages.length > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-red-600",
                                children: result.messages.map((m, i)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "mr-2",
                                        children: [
                                            "• ",
                                            m
                                        ]
                                    }, i, true, {
                                        fileName: "[project]/src/components/ResultsPanel.tsx",
                                        lineNumber: 53,
                                        columnNumber: 19
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 51,
                                columnNumber: 15
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 43,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "border rounded-md overflow-hidden",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "w-full text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    className: "bg-slate-100 text-slate-600",
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1 text-left",
                                                children: "Stream"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                                lineNumber: 65,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1 text-left",
                                                children: "From"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                                lineNumber: 66,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1 text-left",
                                                children: "To"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                                lineNumber: 67,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1 text-right",
                                                children: "Flowrate (t/h)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                                lineNumber: 68,
                                                columnNumber: 19
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "px-2 py-1 text-right",
                                                children: "Grade (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                                lineNumber: 69,
                                                columnNumber: 19
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/components/ResultsPanel.tsx",
                                        lineNumber: 64,
                                        columnNumber: 17
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 63,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: result.streams.map((s)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            className: "border-t",
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1",
                                                    children: s.id
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1",
                                                    children: s.from_unit
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1",
                                                    children: s.to_unit
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 77,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1 text-right",
                                                    children: s.flowrate.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 78,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1 text-right",
                                                    children: s.grade.toFixed(2)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 81,
                                                    columnNumber: 21
                                                }, this)
                                            ]
                                        }, s.id, true, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 74,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 72,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/components/ResultsPanel.tsx",
                            lineNumber: 62,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 61,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ResultsPanel.tsx",
        lineNumber: 18,
        columnNumber: 5
    }, this);
}
}),
"[project]/app/flowsheet-tool/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlowsheetToolPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validateFlowsheetModel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildFlowsheetModel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlockLibraryPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlowsheetCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/createNode.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsPanel.tsx [app-ssr] (ecmascript)");
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
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetal, setSelectedMetal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Cu");
    // ✅ state نودها و Edgeها
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    // ✅ فقط برای انتخاب (اگر بعداً لازم شد)
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    // ✅ state خوراک (Feed)
    const [feed, setFeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        throughput: 100,
        grade: 1.0
    });
    // ✅ state برای پاپ‌آپ ویرایش
    const [editNode, setEditNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editRecovery, setEditRecovery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1");
    const [editSplit, setEditSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("1");
    // اتصال نودها
    const onConnect = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((connection)=>{
        setEdges((eds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["addEdge"])({
                ...connection,
                animated: true
            }, eds));
    }, [
        setEdges
    ]);
    // برای Drag & Drop
    const onDragOver = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        event.preventDefault();
        event.dataTransfer.dropEffect = "move";
    }, []);
    const onDrop = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((event)=>{
        event.preventDefault();
        const raw = event.dataTransfer.getData("application/json");
        if (!raw) return;
        let payload = null;
        try {
            payload = JSON.parse(raw);
        } catch  {
            return;
        }
        const unitId = payload.type;
        const bounds = event.target.getBoundingClientRect();
        const position = {
            x: event.clientX - bounds.left,
            y: event.clientY - bounds.top
        };
        const newNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["createNodeFromUnit"])(unitId, position);
        if (!newNode) return;
        setNodes((nds)=>nds.concat(newNode));
    }, [
        setNodes
    ]);
    const handleNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        setSelectedNodeId(node.id);
    }, []);
    // 🔹 دابل‌کلیک روی نود → باز شدن پاپ‌آپ
    const handleNodeDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((node)=>{
        const params = node.data?.parameters ?? {
            recovery: 1,
            split_ratio: 1
        };
        setEditNode(node);
        setEditRecovery(String(params.recovery));
        setEditSplit(String(params.split_ratio));
    }, []);
    const closeEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        setEditNode(null);
    }, []);
    const handleSaveEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])(()=>{
        if (!editNode) return;
        let rec = parseFloat(editRecovery);
        let split = parseFloat(editSplit);
        if (Number.isNaN(rec)) rec = 1;
        if (Number.isNaN(split)) split = 1;
        // محدود کردن بین 0 و 1
        rec = Math.min(Math.max(rec, 0), 1);
        split = Math.min(Math.max(split, 0), 1);
        const nodeId = editNode.id;
        setNodes((nds)=>nds.map((node)=>node.id === nodeId ? {
                    ...node,
                    data: {
                        ...node.data,
                        parameters: {
                            recovery: rec,
                            split_ratio: split
                        }
                    }
                } : node));
        setEditNode(null);
    }, [
        editNode,
        editRecovery,
        editSplit,
        setNodes
    ]);
    // ✅ اجرای Simulation (ارتباط با Backend)
    const handleRunSimulation = async ()=>{
        const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildFlowsheetModel"])({
            metal: selectedMetal,
            feed,
            nodes,
            edges
        });
        console.log("FlowsheetModel to send:", model);
        // 🔍 Validation در فرانت‌اند
        const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateFlowsheetModel"])(model);
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
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between px-6 py-4 border-b bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex flex-col",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs tracking-wide text-slate-500",
                                children: "EDUCATIONAL FLOWSHEET SIMULATOR"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 217,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                className: "text-2xl font-semibold",
                                children: [
                                    "Flowsheet Tool",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "text-sm text-slate-500",
                                        children: "(Copper / Zinc)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 222,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 220,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 216,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "flex items-center gap-2 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-slate-500",
                                children: "Metal:"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 227,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Cu"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Cu" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Cu"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 228,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Zn"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Zn" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Zn"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 238,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 226,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 215,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockLibraryPanel"], {
                        selectedMetal: selectedMetal
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 254,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex-1 bg-slate-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowsheetCanvas"], {
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
                            lineNumber: 258,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 252,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b flex items-center justify-between gap-4 text-sm",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex items-center gap-4",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500",
                                                children: "Feed throughput (t/h)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 277,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "border rounded px-2 py-1 text-xs w-24",
                                                value: feed.throughput,
                                                onChange: (e)=>setFeed((f)=>({
                                                            ...f,
                                                            throughput: parseFloat(e.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 278,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 276,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "text-xs text-slate-500",
                                                children: "Feed grade (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 291,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                className: "border rounded px-2 py-1 text-xs w-24",
                                                value: feed.grade,
                                                onChange: (e)=>setFeed((f)=>({
                                                            ...f,
                                                            grade: parseFloat(e.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 292,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 290,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 275,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleRunSimulation,
                                disabled: isSimulating,
                                className: `px-3 py-1.5 rounded-md text-xs font-medium ${isSimulating ? "bg-slate-300 text-slate-600 cursor-not-allowed" : "bg-emerald-600 text-white hover:bg-emerald-700"}`,
                                children: isSimulating ? "Simulating..." : "Run Simulation"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 306,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 274,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResultsPanel"], {
                        result: simulationResult,
                        isSimulating: isSimulating,
                        onRunSimulation: handleRunSimulation
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 319,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 273,
                columnNumber: 7
            }, this),
            editNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "fixed inset-0 bg-black/40 flex items-center justify-center z-50",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "bg-white rounded-lg shadow-lg w-full max-w-sm p-4",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            className: "text-sm font-semibold mb-3",
                            children: "Edit Unit Parameters"
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 330,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs text-slate-500 mb-2",
                            children: editNode.data?.label
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 331,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "space-y-3 mb-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs text-slate-600 mb-1",
                                            children: "Recovery (0–1, fraction)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 337,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editRecovery,
                                            onChange: (e)=>setEditRecovery(e.target.value),
                                            className: "w-full border rounded px-2 py-1 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 340,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 336,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            className: "block text-xs text-slate-600 mb-1",
                                            children: "Split ratio to concentrate (0–1)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 351,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editSplit,
                                            onChange: (e)=>setEditSplit(e.target.value),
                                            className: "w-full border rounded px-2 py-1 text-xs"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 354,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 350,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 335,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex justify-end gap-2 text-xs",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeEditDialog,
                                    className: "px-3 py-1 rounded border border-slate-300 text-slate-700 hover:bg-slate-100",
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 367,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveEditDialog,
                                    className: "px-3 py-1 rounded bg-emerald-600 text-white hover:bg-emerald-700",
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 373,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 366,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 329,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 328,
                columnNumber: 9
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 213,
        columnNumber: 5
    }, this);
}
function FlowsheetToolPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowsheetToolInner, {}, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 390,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 389,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_4cafe594._.js.map