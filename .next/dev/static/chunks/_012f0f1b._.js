(globalThis.TURBOPACK || (globalThis.TURBOPACK = [])).push([typeof document === "object" ? document.currentScript : undefined,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
;
// 🔹 نود سفارشی برای واحدهای فرآیندی (type: "unit")
function UnitNode(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(26);
    if ($[0] !== "ebf02046d94e68dbcd4508f5e7ee430769f61dd50358face4bd4abb77ef546e7") {
        for(let $i = 0; $i < 26; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ebf02046d94e68dbcd4508f5e7ee430769f61dd50358face4bd4abb77ef546e7";
    }
    const { data, selected } = t0;
    const label = data?.label ?? "";
    const icon = data?.icon;
    const metal = data?.metal;
    const recovery = typeof data?.parameters?.recovery === "number" ? data.parameters.recovery : 1;
    const splitRatio = typeof data?.parameters?.split_ratio === "number" ? data.parameters.split_ratio : 1;
    const borderColor = selected ? "#0f172a" : "#cbd5e1";
    const boxShadow = selected ? "0 0 0 2px rgba(15,23,42,0.25), 0 4px 8px rgba(15,23,42,0.15)" : "0 1px 2px rgba(15,23,42,0.08)";
    const t1 = `1px solid ${borderColor}`;
    let t2;
    if ($[1] !== boxShadow || $[2] !== t1) {
        t2 = {
            minWidth: 180,
            padding: "4px 10px",
            borderRadius: 10,
            border: t1,
            background: "#ffffff",
            display: "flex",
            alignItems: "center",
            gap: 8,
            boxShadow,
            position: "relative",
            cursor: "pointer"
        };
        $[1] = boxShadow;
        $[2] = t1;
        $[3] = t2;
    } else {
        t2 = $[3];
    }
    let t3;
    let t4;
    if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "target",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
            style: {
                background: "#0f172a",
                width: 8,
                height: 8
            }
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 66,
            columnNumber: 10
        }, this);
        t4 = {
            width: 24,
            height: 24,
            borderRadius: 8,
            overflow: "hidden",
            background: "#e2e8f0",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            flexShrink: 0
        };
        $[4] = t3;
        $[5] = t4;
    } else {
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] !== icon || $[7] !== label || $[8] !== metal) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t4,
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
                lineNumber: 90,
                columnNumber: 34
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                style: {
                    fontSize: 10,
                    fontWeight: 600,
                    color: "#0f172a"
                },
                children: metal ?? ""
            }, void 0, false, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 94,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 90,
            columnNumber: 10
        }, this);
        $[6] = icon;
        $[7] = label;
        $[8] = metal;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    let t7;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = {
            display: "flex",
            flexDirection: "column",
            fontSize: 12
        };
        t7 = {
            fontWeight: 600,
            marginBottom: 2
        };
        $[10] = t6;
        $[11] = t7;
    } else {
        t6 = $[10];
        t7 = $[11];
    }
    let t8;
    if ($[12] !== label) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: t7,
            children: label
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 126,
            columnNumber: 10
        }, this);
        $[12] = label;
        $[13] = t8;
    } else {
        t8 = $[13];
    }
    let t9;
    if ($[14] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = {
            fontSize: 11,
            color: "#64748b"
        };
        $[14] = t9;
    } else {
        t9 = $[14];
    }
    let t10;
    if ($[15] !== recovery || $[16] !== splitRatio) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            style: t9,
            children: [
                "Rec: ",
                recovery,
                " • Split: ",
                splitRatio
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 144,
            columnNumber: 11
        }, this);
        $[15] = recovery;
        $[16] = splitRatio;
        $[17] = t10;
    } else {
        t10 = $[17];
    }
    let t11;
    if ($[18] !== t10 || $[19] !== t8) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t6,
            children: [
                t8,
                t10
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 153,
            columnNumber: 11
        }, this);
        $[18] = t10;
        $[19] = t8;
        $[20] = t11;
    } else {
        t11 = $[20];
    }
    let t12;
    if ($[21] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "source",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
            style: {
                background: "#0f172a",
                width: 8,
                height: 8
            }
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 162,
            columnNumber: 11
        }, this);
        $[21] = t12;
    } else {
        t12 = $[21];
    }
    let t13;
    if ($[22] !== t11 || $[23] !== t2 || $[24] !== t5) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            style: t2,
            children: [
                t3,
                t5,
                t11,
                t12
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 173,
            columnNumber: 11
        }, this);
        $[22] = t11;
        $[23] = t2;
        $[24] = t5;
        $[25] = t13;
    } else {
        t13 = $[25];
    }
    return t13;
}
_c = UnitNode;
// مپ نوع نودها
const nodeTypes = {
    unit: UnitNode
};
function FlowsheetCanvas(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(20);
    if ($[0] !== "ebf02046d94e68dbcd4508f5e7ee430769f61dd50358face4bd4abb77ef546e7") {
        for(let $i = 0; $i < 20; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "ebf02046d94e68dbcd4508f5e7ee430769f61dd50358face4bd4abb77ef546e7";
    }
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick, onNodeDoubleClick } = t0;
    const t1 = nodes;
    let t2;
    if ($[1] !== onNodeClick) {
        t2 = ({
            "FlowsheetCanvas[<ReactFlow>.onNodeClick]": (_, node)=>onNodeClick(node)
        })["FlowsheetCanvas[<ReactFlow>.onNodeClick]"];
        $[1] = onNodeClick;
        $[2] = t2;
    } else {
        t2 = $[2];
    }
    let t3;
    if ($[3] !== onNodeDoubleClick) {
        t3 = onNodeDoubleClick ? (__0, node_0)=>onNodeDoubleClick(node_0) : undefined;
        $[3] = onNodeDoubleClick;
        $[4] = t3;
    } else {
        t3 = $[4];
    }
    let t4;
    let t5;
    let t6;
    if ($[5] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
            gap: 16,
            size: 1
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 230,
            columnNumber: 10
        }, this);
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {
            pannable: true,
            zoomable: true
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 231,
            columnNumber: 10
        }, this);
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 232,
            columnNumber: 10
        }, this);
        $[5] = t4;
        $[6] = t5;
        $[7] = t6;
    } else {
        t4 = $[5];
        t5 = $[6];
        t6 = $[7];
    }
    let t7;
    if ($[8] !== edges || $[9] !== onConnect || $[10] !== onEdgesChange || $[11] !== onNodesChange || $[12] !== t1 || $[13] !== t2 || $[14] !== t3) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
            nodes: t1,
            edges: edges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onConnect: onConnect,
            onNodeClick: t2,
            onNodeDoubleClick: t3,
            nodeTypes: nodeTypes,
            fitView: true,
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 243,
            columnNumber: 10
        }, this);
        $[8] = edges;
        $[9] = onConnect;
        $[10] = onEdgesChange;
        $[11] = onNodesChange;
        $[12] = t1;
        $[13] = t2;
        $[14] = t3;
        $[15] = t7;
    } else {
        t7 = $[15];
    }
    let t8;
    if ($[16] !== onDragOver || $[17] !== onDrop || $[18] !== t7) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full",
            onDrop: onDrop,
            onDragOver: onDragOver,
            children: t7
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 257,
            columnNumber: 10
        }, this);
        $[16] = onDragOver;
        $[17] = onDrop;
        $[18] = t7;
        $[19] = t8;
    } else {
        t8 = $[19];
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
    const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allUnits"].find((u)=>u.id === unitId);
    if (!def) return null;
    // یک id یکتا برای نود
    const nodeId = `${def.id}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;
    return {
        id: nodeId,
        type: "unit",
        position,
        data: {
            // این فیلدها در UnitNode استفاده می‌شوند
            label: def.name,
            metal: def.metal,
            icon: def.icon,
            unitId: def.id,
            parameters: {
                recovery: def.defaultParameters.recovery,
                split_ratio: def.defaultParameters.split_ratio
            }
        }
    };
}
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/data/units.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validateFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlockLibraryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlowsheetCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/createNode.ts [app-client] (ecmascript)");
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
;
function FlowsheetToolInner() {
    _s();
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetal, setSelectedMetal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Cu");
    // نودها و یال‌ها
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    // نود انتخاب‌شده (برای highlight اگر لازم شد)
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedNode = nodes.find((n)=>n.id === selectedNodeId) ?? null;
    // خوراک
    const [feed, setFeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        throughput: 100,
        grade: 1.0
    });
    // state پاپ‌آپ
    const [editNode, setEditNode] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [editRecovery, setEditRecovery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1");
    const [editSplit, setEditSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("1");
    const openEditDialogForNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[openEditDialogForNode]": (node)=>{
            setEditNode(node);
            const params = node.data.parameters ?? {
                recovery: 1,
                split_ratio: 1
            };
            setEditRecovery(String(params.recovery));
            setEditSplit(String(params.split_ratio));
        }
    }["FlowsheetToolInner.useCallback[openEditDialogForNode]"], []);
    const closeEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[closeEditDialog]": ()=>{
            setEditNode(null);
        }
    }["FlowsheetToolInner.useCallback[closeEditDialog]"], []);
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
    // Drag & Drop
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
            const unitId = String(payload.type);
            // 🔎 پیدا کردن تعریف یونیت از روی id
            const def = __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$data$2f$units$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["allUnits"].find({
                "FlowsheetToolInner.useCallback[onDrop].def": (u)=>u.id === unitId
            }["FlowsheetToolInner.useCallback[onDrop].def"]);
            if (!def) {
                console.warn("Unknown unit id dropped:", unitId);
                return;
            }
            const bounds = event_0.target.getBoundingClientRect();
            const position = {
                x: event_0.clientX - bounds.left,
                y: event_0.clientY - bounds.top
            };
            // 👇 تمام منطق اضافه کردن نود داخل setNodes
            setNodes({
                "FlowsheetToolInner.useCallback[onDrop]": (prevNodes)=>{
                    // ۱) تشخیص اینکه این یونیت، Feed است یا نه
                    const isFeedUnit = def.category === "Feed & Tailings" && (def.id.toLowerCase().includes("feed") || def.name.toLowerCase().includes("feed"));
                    if (isFeedUnit) {
                        // ۲) بررسی اینکه آیا قبلاً Feed روی صفحه داریم یا نه
                        const hasFeedAlready = prevNodes.some({
                            "FlowsheetToolInner.useCallback[onDrop].hasFeedAlready": (n_0)=>{
                                const d = n_0.data || {};
                                const existingUnitId = String(d.unitId ?? "").toLowerCase();
                                const existingLabel = String(d.label ?? "").toLowerCase();
                                return existingUnitId.includes("feed") || existingLabel.includes("feed");
                            }
                        }["FlowsheetToolInner.useCallback[onDrop].hasFeedAlready"]);
                        if (hasFeedAlready) {
                            alert("Only one Feed unit is allowed in the flowsheet.");
                            return prevNodes; // ❌ نود جدید اضافه نمی‌شود
                        }
                    }
                    // ۳) اگر Feed اضافی نبود یا یونیت معمولی است → نود جدید بساز
                    const newNode = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["createNodeFromUnit"])(unitId, position);
                    if (!newNode) return prevNodes;
                    return [
                        ...prevNodes,
                        newNode
                    ];
                }
            }["FlowsheetToolInner.useCallback[onDrop]"]);
        }
    }["FlowsheetToolInner.useCallback[onDrop]"], [
        setNodes
    ]);
    const handleNodeClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleNodeClick]": (node_0)=>{
            setSelectedNodeId(node_0.id);
        }
    }["FlowsheetToolInner.useCallback[handleNodeClick]"], []);
    // دابل‌کلیک → باز کردن پاپ‌آپ
    const handleNodeDoubleClick = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleNodeDoubleClick]": (node_1)=>{
            openEditDialogForNode(node_1);
        }
    }["FlowsheetToolInner.useCallback[handleNodeDoubleClick]"], [
        openEditDialogForNode
    ]);
    const handleUpdateParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleUpdateParams]": (nodeId, params_0)=>{
            setNodes({
                "FlowsheetToolInner.useCallback[handleUpdateParams]": (nds)=>nds.map({
                        "FlowsheetToolInner.useCallback[handleUpdateParams]": (node_2)=>node_2.id === nodeId ? {
                                ...node_2,
                                data: {
                                    ...node_2.data,
                                    parameters: {
                                        recovery: params_0.recovery,
                                        split_ratio: params_0.split_ratio
                                    }
                                }
                            } : node_2
                    }["FlowsheetToolInner.useCallback[handleUpdateParams]"])
            }["FlowsheetToolInner.useCallback[handleUpdateParams]"]);
        }
    }["FlowsheetToolInner.useCallback[handleUpdateParams]"], [
        setNodes
    ]);
    // ذخیره پاپ‌آپ
    const handleSaveEditDialog = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleSaveEditDialog]": ()=>{
            if (!editNode) return;
            const rec = parseFloat(editRecovery);
            const split = parseFloat(editSplit);
            if (Number.isNaN(rec) || Number.isNaN(split)) {
                alert("Please enter valid numeric values.");
                return;
            }
            handleUpdateParams(editNode.id, {
                recovery: rec,
                split_ratio: split
            });
            setEditNode(null);
        }
    }["FlowsheetToolInner.useCallback[handleSaveEditDialog]"], [
        editNode,
        editRecovery,
        editSplit,
        handleUpdateParams
    ]);
    // 🔹 دکمه Reset flowsheet – پاک کردن کل Flow از روی Canvas
    const handleResetFlowsheet = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "FlowsheetToolInner.useCallback[handleResetFlowsheet]": ()=>{
            setNodes([]);
            setEdges([]);
            setSelectedNodeId(null);
            setEditNode(null);
            setSimulationResult(null);
        }
    }["FlowsheetToolInner.useCallback[handleResetFlowsheet]"], [
        setNodes,
        setEdges
    ]);
    // اجرای شبیه‌سازی
    const handleRunSimulation = async ()=>{
        const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFlowsheetModel"])({
            metal: selectedMetal,
            feed,
            nodes,
            edges
        });
        console.log("FlowsheetModel to send:", model);
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
        style: {
            minHeight: "100vh",
            display: "flex",
            flexDirection: "column"
        },
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between px-6 py-3 border-b bg-white",
                style: {
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    padding: "12px 24px",
                    borderBottom: "1px solid #e5e7eb",
                    backgroundColor: "#ffffff"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "10px",
                                    textTransform: "uppercase",
                                    color: "#6b7280"
                                },
                                children: "Educational Flowsheet Simulator"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 235,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                style: {
                                    fontSize: "18px",
                                    fontWeight: 600,
                                    color: "#111827"
                                },
                                children: [
                                    "Flowsheet Tool",
                                    " ",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        style: {
                                            fontSize: "13px",
                                            color: "#6b7280"
                                        },
                                        children: "(Copper / Zinc)"
                                    }, void 0, false, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 248,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 242,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 234,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                style: {
                                    fontSize: "12px",
                                    color: "#6b7280",
                                    marginRight: 8
                                },
                                children: "Metal:"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 258,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Cu"),
                                style: {
                                    padding: "4px 10px",
                                    borderRadius: "9999px",
                                    border: selectedMetal === "Cu" ? "1px solid #111827" : "1px solid #d1d5db",
                                    backgroundColor: selectedMetal === "Cu" ? "#111827" : "transparent",
                                    color: selectedMetal === "Cu" ? "#ffffff" : "#111827",
                                    marginRight: 4,
                                    fontSize: "12px"
                                },
                                children: "Cu"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 265,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Zn"),
                                style: {
                                    padding: "4px 10px",
                                    borderRadius: "9999px",
                                    border: selectedMetal === "Zn" ? "1px solid #111827" : "1px solid #d1d5db",
                                    backgroundColor: selectedMetal === "Zn" ? "#111827" : "transparent",
                                    color: selectedMetal === "Zn" ? "#ffffff" : "#111827",
                                    fontSize: "12px"
                                },
                                children: "Zn"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 276,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 257,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 226,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    display: "flex",
                    flex: 1
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockLibraryPanel"], {
                        selectedMetal: selectedMetal
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 294,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        style: {
                            flex: 1,
                            backgroundColor: "#f1f5f9"
                        },
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
                            lineNumber: 300,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 296,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 290,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                style: {
                    borderTop: "1px solid #e5e7eb",
                    background: "#ffffff"
                },
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        style: {
                            padding: "8px 16px",
                            borderBottom: "1px solid #e5e7eb",
                            display: "flex",
                            alignItems: "center",
                            gap: 16,
                            fontSize: "12px"
                        },
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                style: {
                                    display: "flex",
                                    gap: 16
                                },
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#6b7280"
                                                },
                                                children: "Feed throughput (t/h)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 322,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                style: {
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: 4,
                                                    padding: "2px 6px",
                                                    fontSize: "12px",
                                                    width: 80
                                                },
                                                value: feed.throughput,
                                                onChange: (e)=>setFeed((f)=>({
                                                            ...f,
                                                            throughput: parseFloat(e.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 328,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 321,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                style: {
                                                    fontSize: "11px",
                                                    color: "#6b7280"
                                                },
                                                children: "Feed grade (%)"
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 340,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                type: "number",
                                                style: {
                                                    border: "1px solid #d1d5db",
                                                    borderRadius: 4,
                                                    padding: "2px 6px",
                                                    fontSize: "12px",
                                                    width: 80
                                                },
                                                value: feed.grade,
                                                onChange: (e_0)=>setFeed((f_0)=>({
                                                            ...f_0,
                                                            grade: parseFloat(e_0.target.value) || 0
                                                        }))
                                            }, void 0, false, {
                                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                                lineNumber: 346,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                                        lineNumber: 339,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 317,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: handleResetFlowsheet,
                                style: {
                                    padding: "4px 10px",
                                    borderRadius: 4,
                                    border: "1px solid #d1d5db",
                                    backgroundColor: "#ffffff",
                                    fontSize: "12px",
                                    cursor: "pointer"
                                },
                                children: "Reset flowsheet"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 360,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 309,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsPanel"], {
                        result: simulationResult,
                        isSimulating: isSimulating,
                        onRunSimulation: handleRunSimulation
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 372,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 305,
                columnNumber: 7
            }, this),
            editNode && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                style: {
                    position: "fixed",
                    inset: 0,
                    backgroundColor: "rgba(0,0,0,0.4)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    zIndex: 1000
                },
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    style: {
                        backgroundColor: "#ffffff",
                        borderRadius: 8,
                        boxShadow: "0 10px 25px rgba(15,23,42,0.25)",
                        width: "100%",
                        maxWidth: 360,
                        padding: 16
                    },
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            style: {
                                fontSize: "14px",
                                fontWeight: 600,
                                marginBottom: 8,
                                color: "#111827"
                            },
                            children: "Edit Unit Parameters"
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 393,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                fontSize: "12px",
                                color: "#6b7280",
                                marginBottom: 12
                            },
                            children: editNode.data?.label
                        }, void 0, false, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 402,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                marginBottom: 16
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    style: {
                                        marginBottom: 8
                                    },
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "block",
                                                fontSize: "11px",
                                                color: "#374151",
                                                marginBottom: 4
                                            },
                                            children: "Recovery (0–1, fraction)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 416,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editRecovery,
                                            onChange: (e_1)=>setEditRecovery(e_1.target.value),
                                            style: {
                                                width: "100%",
                                                border: "1px solid #d1d5db",
                                                borderRadius: 4,
                                                padding: "4px 6px",
                                                fontSize: "12px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 424,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 413,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                            style: {
                                                display: "block",
                                                fontSize: "11px",
                                                color: "#374151",
                                                marginBottom: 4
                                            },
                                            children: "Split ratio to concentrate (0–1)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 434,
                                            columnNumber: 17
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                            type: "number",
                                            step: "0.01",
                                            min: 0,
                                            max: 1,
                                            value: editSplit,
                                            onChange: (e_2)=>setEditSplit(e_2.target.value),
                                            style: {
                                                width: "100%",
                                                border: "1px solid #d1d5db",
                                                borderRadius: 4,
                                                padding: "4px 6px",
                                                fontSize: "12px"
                                            }
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 442,
                                            columnNumber: 17
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 433,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 410,
                            columnNumber: 13
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            style: {
                                display: "flex",
                                justifyContent: "flex-end",
                                gap: 8,
                                fontSize: "12px"
                            },
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: closeEditDialog,
                                    style: {
                                        padding: "4px 10px",
                                        borderRadius: 4,
                                        border: "1px solid #d1d5db",
                                        backgroundColor: "#ffffff",
                                        color: "#374151",
                                        cursor: "pointer"
                                    },
                                    children: "Cancel"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 458,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    onClick: handleSaveEditDialog,
                                    style: {
                                        padding: "4px 10px",
                                        borderRadius: 4,
                                        border: "none",
                                        backgroundColor: "#059669",
                                        color: "#ffffff",
                                        cursor: "pointer"
                                    },
                                    children: "Save"
                                }, void 0, false, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 468,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 452,
                            columnNumber: 13
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 385,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 376,
                columnNumber: 20
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 220,
        columnNumber: 10
    }, this);
}
_s(FlowsheetToolInner, "nlWWVBqvGswfFFt3bI/0xJakea0=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"]
    ];
});
_c = FlowsheetToolInner;
function FlowsheetToolPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "12eedf7770d75c566acafbfb259e93cf66bc243886ecb101806c20333fa1ce0c") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "12eedf7770d75c566acafbfb259e93cf66bc243886ecb101806c20333fa1ce0c";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowsheetToolInner, {}, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 493,
                columnNumber: 29
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 493,
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

//# sourceMappingURL=_012f0f1b._.js.map