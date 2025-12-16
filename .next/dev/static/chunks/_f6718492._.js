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
        if (!s.from) {
            errors.push(`Stream ${s.id} has no source unit.`);
        }
        if (!s.to) {
            errors.push(`Stream ${s.id} has no target unit.`);
        }
    });
    // 5) پیدا کردن Unitهای جداافتاده (هیچ Stream ورودی/خروجی ندارند)
    const connectedUnitIds = new Set();
    model.streams.forEach((s)=>{
        if (s.from) connectedUnitIds.add(s.from);
        if (s.to) connectedUnitIds.add(s.to);
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
    if ($[0] !== "530fa0c0f045d0aabc6acaa067855aa02f9e6be7104e5b49960ea0ed387ef327") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "530fa0c0f045d0aabc6acaa067855aa02f9e6be7104e5b49960ea0ed387ef327";
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
                                        (result.overallRecovery * 100).toFixed(1),
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
                            columnNumber: 259
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
                                            columnNumber: 491
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left",
                                            children: "From"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 538
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-left",
                                            children: "To"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 583
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-right",
                                            children: "Flowrate (t/h)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 626
                                        }, this),
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                            className: "px-2 py-1 text-right",
                                            children: "Grade (%)"
                                        }, void 0, false, {
                                            fileName: "[project]/src/components/ResultsPanel.tsx",
                                            lineNumber: 54,
                                            columnNumber: 682
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                    lineNumber: 54,
                                    columnNumber: 487
                                }, this)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 440
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                children: result.streams.map(_ResultsPanelResultStreamsMap)
                            }, void 0, false, {
                                fileName: "[project]/src/components/ResultsPanel.tsx",
                                lineNumber: 54,
                                columnNumber: 746
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/ResultsPanel.tsx",
                        lineNumber: 54,
                        columnNumber: 406
                    }, this)
                }, void 0, false, {
                    fileName: "[project]/src/components/ResultsPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 355
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
                children: s.from
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 83
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1",
                children: s.to
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 122
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 text-right",
                children: s.flowrate.toFixed(2)
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 159
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "px-2 py-1 text-right",
                children: s.grade.toFixed(2)
            }, void 0, false, {
                fileName: "[project]/src/components/ResultsPanel.tsx",
                lineNumber: 73,
                columnNumber: 224
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
            from: edge.source,
            to: edge.target ?? ""
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
"[project]/src/utils/mockSimulate.ts [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/utils/mockSimulate.ts
__turbopack_context__.s([
    "mockSimulate",
    ()=>mockSimulate
]);
function mockSimulate(model) {
    const nStreams = model.streams.length || 1;
    // جرم کل را بین تمام streamها تقسیم می‌کنیم (فقط برای نمایش)
    const baseFlow = model.feed.throughput / nStreams;
    const streams = model.streams.map((s, index)=>{
        const factor = 0.8 + index / nStreams * 0.4; // فقط برای تنوع درصدها
        const flowrate = baseFlow * factor;
        const grade = model.feed.grade * (1 + index * 0.1); // کمی grade را تغییر می‌دهیم
        return {
            id: s.id,
            from: s.from,
            to: s.to,
            flowrate,
            grade
        };
    });
    // overall recovery را فعلاً ثابت می‌گذاریم (در نسخه واقعی از Backend می‌آد)
    const overallRecovery = 0.8;
    const messages = [];
    if (model.streams.length === 0) {
        messages.push("No streams defined – please connect units on the canvas.");
    }
    return {
        streams,
        overallRecovery,
        messages
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

// src/components/BlockLibraryPanel.tsx
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
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(13);
    if ($[0] !== "7ba13d7d26f2af2032f62be2755c2f098aed88db93147f8e1816766c83257744") {
        for(let $i = 0; $i < 13; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "7ba13d7d26f2af2032f62be2755c2f098aed88db93147f8e1816766c83257744";
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
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
            className: "font-semibold text-sm",
            children: "Block Library"
        }, void 0, false, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 46,
            columnNumber: 10
        }, this);
        $[3] = t1;
    } else {
        t1 = $[3];
    }
    const t2 = selectedMetal === "Cu" ? "Copper" : "Zinc";
    let t3;
    if ($[4] !== t2) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex items-center justify-between mb-2",
            children: [
                t1,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-xs rounded-full bg-slate-100 px-2 py-0.5",
                    children: t2
                }, void 0, false, {
                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                    lineNumber: 54,
                    columnNumber: 70
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 54,
            columnNumber: 10
        }, this);
        $[4] = t2;
        $[5] = t3;
    } else {
        t3 = $[5];
    }
    let t4;
    if ($[6] !== unitsByCategory) {
        t4 = CATEGORIES.map({
            "BlockLibraryPanel[CATEGORIES.map()]": (cat)=>{
                const units = unitsByCategory[cat];
                if (!units.length) {
                    return null;
                }
                return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide",
                            children: cat
                        }, void 0, false, {
                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                            lineNumber: 68,
                            columnNumber: 31
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex flex-col gap-1",
                            children: units.map({
                                "BlockLibraryPanel[CATEGORIES.map() > units.map()]": (unit_0)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: true,
                                        onDragStart: {
                                            "BlockLibraryPanel[CATEGORIES.map() > units.map() > <div>.onDragStart]": (e)=>handleDragStart(e, unit_0)
                                        }["BlockLibraryPanel[CATEGORIES.map() > units.map() > <div>.onDragStart]"],
                                        className: "flex items-center gap-3 rounded-md border px-2 py-2 text-xs cursor-move bg-white hover:bg-slate-50 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-10 w-10 flex items-center justify-center rounded-md bg-slate-100 overflow-hidden",
                                                children: unit_0.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: `/icons/${unit_0.icon}.png`,
                                                    alt: unit_0.name,
                                                    width: 40,
                                                    height: 40,
                                                    style: {
                                                        objectFit: "contain"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                    lineNumber: 71,
                                                    columnNumber: 328
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-semibold",
                                                    children: unit_0.metal
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                    lineNumber: 73,
                                                    columnNumber: 27
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                lineNumber: 71,
                                                columnNumber: 213
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-xs",
                                                        children: unit_0.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 130
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-500",
                                                        children: [
                                                            "Rec: ",
                                                            unit_0.defaultParameters.recovery,
                                                            " • Split:",
                                                            " ",
                                                            unit_0.defaultParameters.split_ratio
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                        lineNumber: 73,
                                                        columnNumber: 188
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                lineNumber: 73,
                                                columnNumber: 99
                                            }, this)
                                        ]
                                    }, unit_0.id, true, {
                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                        lineNumber: 69,
                                        columnNumber: 78
                                    }, this)
                            }["BlockLibraryPanel[CATEGORIES.map() > units.map()]"])
                        }, void 0, false, {
                            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                            lineNumber: 68,
                            columnNumber: 125
                        }, this)
                    ]
                }, cat, true, {
                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                    lineNumber: 68,
                    columnNumber: 16
                }, this);
            }
        }["BlockLibraryPanel[CATEGORIES.map()]"]);
        $[6] = unitsByCategory;
        $[7] = t4;
    } else {
        t4 = $[7];
    }
    let t5;
    if ($[8] !== t4) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-3 overflow-auto",
            children: t4
        }, void 0, false, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 84,
            columnNumber: 10
        }, this);
        $[8] = t4;
        $[9] = t5;
    } else {
        t5 = $[9];
    }
    let t6;
    if ($[10] !== t3 || $[11] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "w-64 border-r p-4 bg-white flex flex-col gap-3",
            children: [
                t3,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/BlockLibraryPanel.tsx",
            lineNumber: 92,
            columnNumber: 10
        }, this);
        $[10] = t3;
        $[11] = t5;
        $[12] = t6;
    } else {
        t6 = $[12];
    }
    return t6;
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
"[project]/src/components/ProcessNode.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/ProcessNode.tsx
__turbopack_context__.s([
    "ProcessNode",
    ()=>ProcessNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
"use client";
;
;
;
function ProcessNode(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(18);
    if ($[0] !== "8e857ccc0ee0c4331f5ad1897bfa20c753af1205fdb08096951a36d6ea6b6b79") {
        for(let $i = 0; $i < 18; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "8e857ccc0ee0c4331f5ad1897bfa20c753af1205fdb08096951a36d6ea6b6b79";
    }
    const { data } = t0;
    let t1;
    let t2;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "target",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Top,
            className: "w-2 h-2 !bg-slate-500"
        }, void 0, false, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 21,
            columnNumber: 10
        }, this);
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Handle"], {
            type: "source",
            position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Position"].Bottom,
            className: "w-2 h-2 !bg-slate-500"
        }, void 0, false, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 22,
            columnNumber: 10
        }, this);
        $[1] = t1;
        $[2] = t2;
    } else {
        t1 = $[1];
        t2 = $[2];
    }
    let t3;
    if ($[3] !== data.icon || $[4] !== data.label || $[5] !== data.metal) {
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "h-8 w-8 flex items-center justify-center rounded-md bg-slate-100 overflow-hidden mr-1",
            children: data.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                src: `/icons/${data.icon}.png`,
                alt: data.label,
                width: 32,
                height: 32,
                style: {
                    objectFit: "contain"
                }
            }, void 0, false, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 31,
                columnNumber: 126
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "text-[10px] font-semibold",
                children: data.metal
            }, void 0, false, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 33,
                columnNumber: 15
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 31,
            columnNumber: 10
        }, this);
        $[3] = data.icon;
        $[4] = data.label;
        $[5] = data.metal;
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    let t4;
    if ($[7] !== data.label) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "font-medium leading-tight",
            children: data.label
        }, void 0, false, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 43,
            columnNumber: 10
        }, this);
        $[7] = data.label;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    let t5;
    if ($[9] !== data.parameters.recovery || $[10] !== data.parameters.split_ratio) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-[10px] text-slate-600",
            children: [
                "Rec: ",
                data.parameters.recovery,
                " • Split:",
                " ",
                data.parameters.split_ratio
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 51,
            columnNumber: 10
        }, this);
        $[9] = data.parameters.recovery;
        $[10] = data.parameters.split_ratio;
        $[11] = t5;
    } else {
        t5 = $[11];
    }
    let t6;
    if ($[12] !== t4 || $[13] !== t5) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col",
            children: [
                t4,
                t5
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 60,
            columnNumber: 10
        }, this);
        $[12] = t4;
        $[13] = t5;
        $[14] = t6;
    } else {
        t6 = $[14];
    }
    let t7;
    if ($[15] !== t3 || $[16] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "relative rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm flex items-center gap-2 text-xs min-w-[160px]",
            children: [
                t1,
                t2,
                t3,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/ProcessNode.tsx",
            lineNumber: 69,
            columnNumber: 10
        }, this);
        $[15] = t3;
        $[16] = t6;
        $[17] = t7;
    } else {
        t7 = $[17];
    }
    return t7;
}
_c = ProcessNode;
var _c;
__turbopack_context__.k.register(_c, "ProcessNode");
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
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProcessNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProcessNode.tsx [app-client] (ecmascript)");
"use client";
;
;
;
;
;
// 🔹 اینجا nodeTypes را تعریف می‌کنیم
const nodeTypes = {
    processNode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProcessNode$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ProcessNode"]
};
function FlowsheetCanvas(t0) {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(15);
    if ($[0] !== "6498a1c59b1b3f42b486c71773b5b4a1817ab99f9911120ee439fa2c8cfb70fc") {
        for(let $i = 0; $i < 15; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "6498a1c59b1b3f42b486c71773b5b4a1817ab99f9911120ee439fa2c8cfb70fc";
    }
    const { nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick } = t0;
    let t1;
    if ($[1] !== onNodeClick) {
        t1 = ({
            "FlowsheetCanvas[<ReactFlow>.onNodeClick]": (_, node)=>onNodeClick(node)
        })["FlowsheetCanvas[<ReactFlow>.onNodeClick]"];
        $[1] = onNodeClick;
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    let t2;
    let t3;
    let t4;
    if ($[3] === Symbol.for("react.memo_cache_sentinel")) {
        t2 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Background"], {
            gap: 16,
            size: 1
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 57,
            columnNumber: 10
        }, this);
        t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["MiniMap"], {
            pannable: true,
            zoomable: true,
            nodeStrokeWidth: 1
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 58,
            columnNumber: 10
        }, this);
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 59,
            columnNumber: 10
        }, this);
        $[3] = t2;
        $[4] = t3;
        $[5] = t4;
    } else {
        t2 = $[3];
        t3 = $[4];
        t4 = $[5];
    }
    let t5;
    if ($[6] !== edges || $[7] !== nodes || $[8] !== onConnect || $[9] !== onDragOver || $[10] !== onDrop || $[11] !== onEdgesChange || $[12] !== onNodesChange || $[13] !== t1) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "w-full h-full",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
                nodes: nodes,
                edges: edges,
                onNodesChange: onNodesChange,
                onEdgesChange: onEdgesChange,
                onConnect: onConnect,
                onDrop: onDrop,
                onDragOver: onDragOver,
                onNodeClick: t1,
                nodeTypes: nodeTypes,
                fitView: true,
                children: [
                    t2,
                    t3,
                    t4
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                lineNumber: 70,
                columnNumber: 41
            }, this)
        }, void 0, false, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 70,
            columnNumber: 10
        }, this);
        $[6] = edges;
        $[7] = nodes;
        $[8] = onConnect;
        $[9] = onDragOver;
        $[10] = onDrop;
        $[11] = onEdgesChange;
        $[12] = onNodesChange;
        $[13] = t1;
        $[14] = t5;
    } else {
        t5 = $[14];
    }
    return t5;
}
_c = FlowsheetCanvas;
var _c;
__turbopack_context__.k.register(_c, "FlowsheetCanvas");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
"[project]/src/components/PropertiesPanel.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/PropertiesPanel.tsx
__turbopack_context__.s([
    "PropertiesPanel",
    ()=>PropertiesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature();
"use client";
;
;
function PropertiesPanel(t0) {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(36);
    if ($[0] !== "867ae5b3b6f142797801d43e0b12bf753b27f88d128f59717c128c5d979f26c0") {
        for(let $i = 0; $i < 36; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "867ae5b3b6f142797801d43e0b12bf753b27f88d128f59717c128c5d979f26c0";
    }
    const { selectedNode, onUpdateParams } = t0;
    const [recovery, setRecovery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    const [split, setSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(1);
    let t1;
    let t2;
    if ($[1] !== selectedNode) {
        t1 = ({
            "PropertiesPanel[useEffect()]": ()=>{
                if (selectedNode) {
                    setRecovery(selectedNode.data.parameters.recovery);
                    setSplit(selectedNode.data.parameters.split_ratio);
                }
            }
        })["PropertiesPanel[useEffect()]"];
        t2 = [
            selectedNode
        ];
        $[1] = selectedNode;
        $[2] = t1;
        $[3] = t2;
    } else {
        t1 = $[2];
        t2 = $[3];
    }
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])(t1, t2);
    if (!selectedNode) {
        let t3;
        if ($[4] === Symbol.for("react.memo_cache_sentinel")) {
            t3 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "w-72 p-4 bg-white border-l text-sm text-slate-500",
                children: "Select a unit on the canvas to edit its parameters."
            }, void 0, false, {
                fileName: "[project]/src/components/PropertiesPanel.tsx",
                lineNumber: 51,
                columnNumber: 12
            }, this);
            $[4] = t3;
        } else {
            t3 = $[4];
        }
        return t3;
    }
    let t3;
    if ($[5] !== onUpdateParams || $[6] !== recovery || $[7] !== selectedNode.id || $[8] !== split) {
        t3 = ({
            "PropertiesPanel[handleApply]": ()=>{
                onUpdateParams(selectedNode.id, {
                    recovery,
                    split_ratio: split
                });
            }
        })["PropertiesPanel[handleApply]"];
        $[5] = onUpdateParams;
        $[6] = recovery;
        $[7] = selectedNode.id;
        $[8] = split;
        $[9] = t3;
    } else {
        t3 = $[9];
    }
    const handleApply = t3;
    let t4;
    if ($[10] === Symbol.for("react.memo_cache_sentinel")) {
        t4 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-500 mb-1",
            children: "Selected Unit"
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 79,
            columnNumber: 10
        }, this);
        $[10] = t4;
    } else {
        t4 = $[10];
    }
    let t5;
    if ($[11] !== selectedNode.data.label) {
        t5 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "font-semibold",
            children: selectedNode.data.label
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 86,
            columnNumber: 10
        }, this);
        $[11] = selectedNode.data.label;
        $[12] = t5;
    } else {
        t5 = $[12];
    }
    let t6;
    if ($[13] !== selectedNode.data.metal || $[14] !== selectedNode.data.unitId) {
        t6 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-400",
            children: [
                "ID: ",
                selectedNode.data.unitId,
                " • Metal: ",
                selectedNode.data.metal
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 94,
            columnNumber: 10
        }, this);
        $[13] = selectedNode.data.metal;
        $[14] = selectedNode.data.unitId;
        $[15] = t6;
    } else {
        t6 = $[15];
    }
    let t7;
    if ($[16] !== t5 || $[17] !== t6) {
        t7 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t4,
                t5,
                t6
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 103,
            columnNumber: 10
        }, this);
        $[16] = t5;
        $[17] = t6;
        $[18] = t7;
    } else {
        t7 = $[18];
    }
    let t8;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t8 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-slate-500",
            children: "Recovery (0–1, fraction)"
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 112,
            columnNumber: 10
        }, this);
        $[19] = t8;
    } else {
        t8 = $[19];
    }
    let t9;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = ({
            "PropertiesPanel[<input>.onChange]": (e)=>setRecovery(parseFloat(e.target.value) || 0)
        })["PropertiesPanel[<input>.onChange]"];
        $[20] = t9;
    } else {
        t9 = $[20];
    }
    let t10;
    if ($[21] !== recovery) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t8,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    step: "0.01",
                    min: 0,
                    max: 1,
                    value: recovery,
                    onChange: t9,
                    className: "border rounded px-2 py-1 text-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/PropertiesPanel.tsx",
                    lineNumber: 128,
                    columnNumber: 54
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 128,
            columnNumber: 11
        }, this);
        $[21] = recovery;
        $[22] = t10;
    } else {
        t10 = $[22];
    }
    let t11;
    if ($[23] === Symbol.for("react.memo_cache_sentinel")) {
        t11 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-xs text-slate-500",
            children: "Split ratio to concentrate (0–1)"
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 136,
            columnNumber: 11
        }, this);
        $[23] = t11;
    } else {
        t11 = $[23];
    }
    let t12;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t12 = ({
            "PropertiesPanel[<input>.onChange]": (e_0)=>setSplit(parseFloat(e_0.target.value) || 0)
        })["PropertiesPanel[<input>.onChange]"];
        $[24] = t12;
    } else {
        t12 = $[24];
    }
    let t13;
    if ($[25] !== split) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "flex flex-col gap-1",
            children: [
                t11,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    step: "0.01",
                    min: 0,
                    max: 1,
                    value: split,
                    onChange: t12,
                    className: "border rounded px-2 py-1 text-sm"
                }, void 0, false, {
                    fileName: "[project]/src/components/PropertiesPanel.tsx",
                    lineNumber: 152,
                    columnNumber: 55
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 152,
            columnNumber: 11
        }, this);
        $[25] = split;
        $[26] = t13;
    } else {
        t13 = $[26];
    }
    let t14;
    if ($[27] !== t10 || $[28] !== t13) {
        t14 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-col gap-2",
            children: [
                t10,
                t13
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 160,
            columnNumber: 11
        }, this);
        $[27] = t10;
        $[28] = t13;
        $[29] = t14;
    } else {
        t14 = $[29];
    }
    let t15;
    if ($[30] !== handleApply) {
        t15 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: handleApply,
            className: "mt-2 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700",
            children: "Apply Changes"
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 169,
            columnNumber: 11
        }, this);
        $[30] = handleApply;
        $[31] = t15;
    } else {
        t15 = $[31];
    }
    let t16;
    if ($[32] !== t14 || $[33] !== t15 || $[34] !== t7) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "w-72 p-4 bg-white border-l flex flex-col gap-3 text-sm",
            children: [
                t7,
                t14,
                t15
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 177,
            columnNumber: 11
        }, this);
        $[32] = t14;
        $[33] = t15;
        $[34] = t7;
        $[35] = t16;
    } else {
        t16 = $[35];
    }
    return t16;
}
_s(PropertiesPanel, "kS7T7IjoWsYeq9gEE6e8kfcZW0o=");
_c = PropertiesPanel;
var _c;
__turbopack_context__.k.register(_c, "PropertiesPanel");
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
"[project]/app/flowsheet-tool/page.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlowsheetToolPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/compiler-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validateFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildFlowsheetModel.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockSimulate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockSimulate.ts [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlockLibraryPanel.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlowsheetCanvas.tsx [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PropertiesPanel.tsx [app-client] (ecmascript)");
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
;
function FlowsheetToolInner() {
    _s();
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(68);
    if ($[0] !== "08e50751f6d5173683f0290827bf4945ae5ee9fc4f8a2febc50c0f6648a22c7d") {
        for(let $i = 0; $i < 68; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "08e50751f6d5173683f0290827bf4945ae5ee9fc4f8a2febc50c0f6648a22c7d";
    }
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetal, setSelectedMetal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("Cu");
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = [];
        $[1] = t0;
    } else {
        t0 = $[1];
    }
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"])(t0);
    let t1;
    if ($[2] === Symbol.for("react.memo_cache_sentinel")) {
        t1 = [];
        $[2] = t1;
    } else {
        t1 = $[2];
    }
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"])(t1);
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    let t2;
    if ($[3] !== nodes || $[4] !== selectedNodeId) {
        t2 = nodes.find({
            "FlowsheetToolInner[nodes.find()]": (n)=>n.id === selectedNodeId
        }["FlowsheetToolInner[nodes.find()]"]) ?? null;
        $[3] = nodes;
        $[4] = selectedNodeId;
        $[5] = t2;
    } else {
        t2 = $[5];
    }
    const selectedNode = t2;
    let t3;
    if ($[6] === Symbol.for("react.memo_cache_sentinel")) {
        t3 = {
            throughput: 100,
            grade: 1
        };
        $[6] = t3;
    } else {
        t3 = $[6];
    }
    const [feed, setFeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(t3);
    let t4;
    if ($[7] !== setEdges) {
        t4 = ({
            "FlowsheetToolInner[onConnect]": (connection)=>{
                setEdges({
                    "FlowsheetToolInner[onConnect > setEdges()]": (eds)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["addEdge"])({
                            ...connection,
                            animated: true
                        }, eds)
                }["FlowsheetToolInner[onConnect > setEdges()]"]);
            }
        })["FlowsheetToolInner[onConnect]"];
        $[7] = setEdges;
        $[8] = t4;
    } else {
        t4 = $[8];
    }
    const onConnect = t4;
    const onDragOver = _FlowsheetToolInnerOnDragOver;
    let t5;
    if ($[9] !== setNodes) {
        t5 = ({
            "FlowsheetToolInner[onDrop]": (event_0)=>{
                event_0.preventDefault();
                const raw = event_0.dataTransfer.getData("application/json");
                if (!raw) {
                    return;
                }
                let payload;
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
                if (!newNode) {
                    return;
                }
                setNodes({
                    "FlowsheetToolInner[onDrop > setNodes()]": (nds)=>nds.concat(newNode)
                }["FlowsheetToolInner[onDrop > setNodes()]"]);
            }
        })["FlowsheetToolInner[onDrop]"];
        $[9] = setNodes;
        $[10] = t5;
    } else {
        t5 = $[10];
    }
    const onDrop = t5;
    let t6;
    if ($[11] === Symbol.for("react.memo_cache_sentinel")) {
        t6 = ({
            "FlowsheetToolInner[handleNodeClick]": (node)=>{
                setSelectedNodeId(node.id);
            }
        })["FlowsheetToolInner[handleNodeClick]"];
        $[11] = t6;
    } else {
        t6 = $[11];
    }
    const handleNodeClick = t6;
    let t7;
    if ($[12] !== setNodes) {
        t7 = ({
            "FlowsheetToolInner[handleUpdateParams]": (nodeId, params)=>{
                setNodes({
                    "FlowsheetToolInner[handleUpdateParams > setNodes()]": (nds_0)=>nds_0.map({
                            "FlowsheetToolInner[handleUpdateParams > setNodes() > nds_0.map()]": (node_0)=>node_0.id === nodeId ? {
                                    ...node_0,
                                    data: {
                                        ...node_0.data,
                                        parameters: {
                                            recovery: params.recovery,
                                            split_ratio: params.split_ratio
                                        }
                                    }
                                } : node_0
                        }["FlowsheetToolInner[handleUpdateParams > setNodes() > nds_0.map()]"])
                }["FlowsheetToolInner[handleUpdateParams > setNodes()]"]);
            }
        })["FlowsheetToolInner[handleUpdateParams]"];
        $[12] = setNodes;
        $[13] = t7;
    } else {
        t7 = $[13];
    }
    const handleUpdateParams = t7;
    let t8;
    if ($[14] !== edges || $[15] !== feed || $[16] !== nodes || $[17] !== selectedMetal) {
        t8 = ({
            "FlowsheetToolInner[handleRunSimulation]": ()=>{
                const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["buildFlowsheetModel"])({
                    metal: selectedMetal,
                    feed,
                    nodes,
                    edges
                });
                console.log("FlowsheetModel (will be sent to backend):", model);
                const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["validateFlowsheetModel"])(model);
                if (errors.length > 0) {
                    setSimulationResult({
                        streams: [],
                        overallRecovery: 0,
                        messages: errors
                    });
                    return;
                }
                setIsSimulating(true);
                setTimeout({
                    "FlowsheetToolInner[handleRunSimulation > setTimeout()]": ()=>{
                        const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockSimulate$2e$ts__$5b$app$2d$client$5d$__$28$ecmascript$29$__["mockSimulate"])(model);
                        setSimulationResult(result);
                        setIsSimulating(false);
                    }
                }["FlowsheetToolInner[handleRunSimulation > setTimeout()]"], 500);
            }
        })["FlowsheetToolInner[handleRunSimulation]"];
        $[14] = edges;
        $[15] = feed;
        $[16] = nodes;
        $[17] = selectedMetal;
        $[18] = t8;
    } else {
        t8 = $[18];
    }
    const handleRunSimulation = t8;
    let t9;
    if ($[19] === Symbol.for("react.memo_cache_sentinel")) {
        t9 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
            className: "text-2xl font-semibold",
            children: [
                "Flowsheet Tool",
                " ",
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-sm text-slate-500",
                    children: "(Copper / Zinc)"
                }, void 0, false, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 201,
                    columnNumber: 68
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 201,
            columnNumber: 10
        }, this);
        $[19] = t9;
    } else {
        t9 = $[19];
    }
    let t10;
    let t11;
    if ($[20] === Symbol.for("react.memo_cache_sentinel")) {
        t10 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: "text-slate-500",
            children: "Metal:"
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 209,
            columnNumber: 11
        }, this);
        t11 = ({
            "FlowsheetToolInner[<button>.onClick]": ()=>setSelectedMetal("Cu")
        })["FlowsheetToolInner[<button>.onClick]"];
        $[20] = t10;
        $[21] = t11;
    } else {
        t10 = $[20];
        t11 = $[21];
    }
    const t12 = `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Cu" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`;
    let t13;
    if ($[22] !== t12) {
        t13 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t11,
            className: t12,
            children: "Cu"
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 222,
            columnNumber: 11
        }, this);
        $[22] = t12;
        $[23] = t13;
    } else {
        t13 = $[23];
    }
    let t14;
    if ($[24] === Symbol.for("react.memo_cache_sentinel")) {
        t14 = ({
            "FlowsheetToolInner[<button>.onClick]": ()=>setSelectedMetal("Zn")
        })["FlowsheetToolInner[<button>.onClick]"];
        $[24] = t14;
    } else {
        t14 = $[24];
    }
    const t15 = `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Zn" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`;
    let t16;
    if ($[25] !== t15) {
        t16 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
            onClick: t14,
            className: t15,
            children: "Zn"
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 240,
            columnNumber: 11
        }, this);
        $[25] = t15;
        $[26] = t16;
    } else {
        t16 = $[26];
    }
    let t17;
    if ($[27] !== t13 || $[28] !== t16) {
        t17 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
            className: "flex items-center justify-between px-6 py-4 border-b bg-white",
            children: [
                t9,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "flex items-center gap-2 text-sm",
                    children: [
                        t10,
                        t13,
                        t16
                    ]
                }, void 0, true, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 248,
                    columnNumber: 97
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 248,
            columnNumber: 11
        }, this);
        $[27] = t13;
        $[28] = t16;
        $[29] = t17;
    } else {
        t17 = $[29];
    }
    let t18;
    if ($[30] !== selectedMetal) {
        t18 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["BlockLibraryPanel"], {
            selectedMetal: selectedMetal
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 257,
            columnNumber: 11
        }, this);
        $[30] = selectedMetal;
        $[31] = t18;
    } else {
        t18 = $[31];
    }
    let t19;
    if ($[32] !== edges || $[33] !== nodes || $[34] !== onConnect || $[35] !== onDrop || $[36] !== onEdgesChange || $[37] !== onNodesChange) {
        t19 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
            className: "flex-1 border-r bg-slate-50",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["FlowsheetCanvas"], {
                nodes: nodes,
                edges: edges,
                onNodesChange: onNodesChange,
                onEdgesChange: onEdgesChange,
                onConnect: onConnect,
                onDrop: onDrop,
                onDragOver: onDragOver,
                onNodeClick: handleNodeClick
            }, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 265,
                columnNumber: 60
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 265,
            columnNumber: 11
        }, this);
        $[32] = edges;
        $[33] = nodes;
        $[34] = onConnect;
        $[35] = onDrop;
        $[36] = onEdgesChange;
        $[37] = onNodesChange;
        $[38] = t19;
    } else {
        t19 = $[38];
    }
    let t20;
    if ($[39] !== handleUpdateParams || $[40] !== selectedNode) {
        t20 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["PropertiesPanel"], {
            selectedNode: selectedNode,
            onUpdateParams: handleUpdateParams
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 278,
            columnNumber: 11
        }, this);
        $[39] = handleUpdateParams;
        $[40] = selectedNode;
        $[41] = t20;
    } else {
        t20 = $[41];
    }
    let t21;
    if ($[42] !== t18 || $[43] !== t19 || $[44] !== t20) {
        t21 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "flex flex-1",
            children: [
                t18,
                t19,
                t20
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 287,
            columnNumber: 11
        }, this);
        $[42] = t18;
        $[43] = t19;
        $[44] = t20;
        $[45] = t21;
    } else {
        t21 = $[45];
    }
    let t22;
    if ($[46] === Symbol.for("react.memo_cache_sentinel")) {
        t22 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-500",
            children: "Feed throughput (t/h)"
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 297,
            columnNumber: 11
        }, this);
        $[46] = t22;
    } else {
        t22 = $[46];
    }
    let t23;
    if ($[47] === Symbol.for("react.memo_cache_sentinel")) {
        t23 = ({
            "FlowsheetToolInner[<input>.onChange]": (e)=>setFeed({
                    "FlowsheetToolInner[<input>.onChange > setFeed()]": (f)=>({
                            ...f,
                            throughput: parseFloat(e.target.value) || 0
                        })
                }["FlowsheetToolInner[<input>.onChange > setFeed()]"])
        })["FlowsheetToolInner[<input>.onChange]"];
        $[47] = t23;
    } else {
        t23 = $[47];
    }
    let t24;
    if ($[48] !== feed.throughput) {
        t24 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t22,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    className: "border rounded px-2 py-1 text-xs w-24",
                    value: feed.throughput,
                    onChange: t23
                }, void 0, false, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 318,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 318,
            columnNumber: 11
        }, this);
        $[48] = feed.throughput;
        $[49] = t24;
    } else {
        t24 = $[49];
    }
    let t25;
    if ($[50] === Symbol.for("react.memo_cache_sentinel")) {
        t25 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "text-xs text-slate-500",
            children: "Feed grade (%)"
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 326,
            columnNumber: 11
        }, this);
        $[50] = t25;
    } else {
        t25 = $[50];
    }
    let t26;
    if ($[51] === Symbol.for("react.memo_cache_sentinel")) {
        t26 = ({
            "FlowsheetToolInner[<input>.onChange]": (e_0)=>setFeed({
                    "FlowsheetToolInner[<input>.onChange > setFeed()]": (f_0)=>({
                            ...f_0,
                            grade: parseFloat(e_0.target.value) || 0
                        })
                }["FlowsheetToolInner[<input>.onChange > setFeed()]"])
        })["FlowsheetToolInner[<input>.onChange]"];
        $[51] = t26;
    } else {
        t26 = $[51];
    }
    let t27;
    if ($[52] !== feed.grade) {
        t27 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            children: [
                t25,
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "number",
                    className: "border rounded px-2 py-1 text-xs w-24",
                    value: feed.grade,
                    onChange: t26
                }, void 0, false, {
                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                    lineNumber: 347,
                    columnNumber: 21
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 347,
            columnNumber: 11
        }, this);
        $[52] = feed.grade;
        $[53] = t27;
    } else {
        t27 = $[53];
    }
    let t28;
    if ($[54] !== t24 || $[55] !== t27) {
        t28 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
            className: "px-4 py-3 border-b flex items-center justify-between gap-4 text-sm",
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center gap-4",
                children: [
                    t24,
                    t27
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 355,
                columnNumber: 95
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 355,
            columnNumber: 11
        }, this);
        $[54] = t24;
        $[55] = t27;
        $[56] = t28;
    } else {
        t28 = $[56];
    }
    let t29;
    if ($[57] !== handleRunSimulation || $[58] !== isSimulating || $[59] !== simulationResult) {
        t29 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ResultsPanel"], {
            result: simulationResult,
            isSimulating: isSimulating,
            onRunSimulation: handleRunSimulation
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 364,
            columnNumber: 11
        }, this);
        $[57] = handleRunSimulation;
        $[58] = isSimulating;
        $[59] = simulationResult;
        $[60] = t29;
    } else {
        t29 = $[60];
    }
    let t30;
    if ($[61] !== t28 || $[62] !== t29) {
        t30 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
            className: "border-t bg-white",
            children: [
                t28,
                t29
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 374,
            columnNumber: 11
        }, this);
        $[61] = t28;
        $[62] = t29;
        $[63] = t30;
    } else {
        t30 = $[63];
    }
    let t31;
    if ($[64] !== t17 || $[65] !== t21 || $[66] !== t30) {
        t31 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "min-h-screen flex flex-col",
            children: [
                t17,
                t21,
                t30
            ]
        }, void 0, true, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 383,
            columnNumber: 11
        }, this);
        $[64] = t17;
        $[65] = t21;
        $[66] = t30;
        $[67] = t31;
    } else {
        t31 = $[67];
    }
    return t31;
}
_s(FlowsheetToolInner, "4HKvZR6stKI0JOz5TOFxK+7jlJU=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useNodesState"],
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEdgesState"]
    ];
});
_c = FlowsheetToolInner;
function _FlowsheetToolInnerOnDragOver(event) {
    event.preventDefault();
    event.dataTransfer.dropEffect = "move";
}
function FlowsheetToolPage() {
    const $ = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$compiler$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["c"])(2);
    if ($[0] !== "08e50751f6d5173683f0290827bf4945ae5ee9fc4f8a2febc50c0f6648a22c7d") {
        for(let $i = 0; $i < 2; $i += 1){
            $[$i] = Symbol.for("react.memo_cache_sentinel");
        }
        $[0] = "08e50751f6d5173683f0290827bf4945ae5ee9fc4f8a2febc50c0f6648a22c7d";
    }
    let t0;
    if ($[1] === Symbol.for("react.memo_cache_sentinel")) {
        t0 = /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$client$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
            children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowsheetToolInner, {}, void 0, false, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 407,
                columnNumber: 29
            }, this)
        }, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 407,
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

//# sourceMappingURL=_f6718492._.js.map