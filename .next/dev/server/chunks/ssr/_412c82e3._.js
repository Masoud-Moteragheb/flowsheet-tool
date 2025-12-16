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
                                            (result.overallRecovery * 100).toFixed(1),
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
                                                    children: s.from
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/ResultsPanel.tsx",
                                                    lineNumber: 76,
                                                    columnNumber: 21
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "px-2 py-1",
                                                    children: s.to
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
}),
"[project]/src/utils/mockSimulate.ts [app-ssr] (ecmascript)", ((__turbopack_context__) => {
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

// src/components/BlockLibraryPanel.tsx
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
        // این دیتا بعداً در T11 در Canvas استفاده می‌شود
        event.dataTransfer.setData("application/json", JSON.stringify({
            type: unit.id,
            parameters: unit.defaultParameters
        }));
        event.dataTransfer.effectAllowed = "move";
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-64 border-r p-4 bg-white flex flex-col gap-3",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex items-center justify-between mb-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        className: "font-semibold text-sm",
                        children: "Block Library"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "text-xs rounded-full bg-slate-100 px-2 py-0.5",
                        children: selectedMetal === "Cu" ? "Copper" : "Zinc"
                    }, void 0, false, {
                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                        lineNumber: 51,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                lineNumber: 49,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-3 overflow-auto",
                children: CATEGORIES.map((cat)=>{
                    const units = unitsByCategory[cat];
                    if (!units.length) return null;
                    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "text-xs font-semibold text-slate-500 mb-1 uppercase tracking-wide",
                                children: cat
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                lineNumber: 62,
                                columnNumber: 15
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "flex flex-col gap-1",
                                children: units.map((unit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        draggable: true,
                                        onDragStart: (e)=>handleDragStart(e, unit),
                                        className: "flex items-center gap-3 rounded-md border px-2 py-2 text-xs cursor-move bg-white hover:bg-slate-50 transition",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "h-10 w-10 flex items-center justify-center rounded-md bg-slate-100 overflow-hidden",
                                                children: unit.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                                                    src: `/icons/${unit.icon}.png`,
                                                    alt: unit.name,
                                                    width: 40,
                                                    height: 40,
                                                    style: {
                                                        objectFit: "contain"
                                                    }
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                    lineNumber: 75,
                                                    columnNumber: 25
                                                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                    className: "text-[10px] font-semibold",
                                                    children: unit.metal
                                                }, void 0, false, {
                                                    fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                    lineNumber: 83,
                                                    columnNumber: 25
                                                }, this)
                                            }, void 0, false, {
                                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                lineNumber: 73,
                                                columnNumber: 21
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                                className: "flex flex-col",
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "font-medium text-xs",
                                                        children: unit.name
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                        lineNumber: 88,
                                                        columnNumber: 23
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: "text-[10px] text-slate-500",
                                                        children: [
                                                            "Rec: ",
                                                            unit.defaultParameters.recovery,
                                                            " • Split:",
                                                            " ",
                                                            unit.defaultParameters.split_ratio
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                        lineNumber: 89,
                                                        columnNumber: 23
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                                lineNumber: 87,
                                                columnNumber: 21
                                            }, this)
                                        ]
                                    }, unit.id, true, {
                                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                        lineNumber: 67,
                                        columnNumber: 21
                                    }, this))
                            }, void 0, false, {
                                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                                lineNumber: 65,
                                columnNumber: 15
                            }, this)
                        ]
                    }, cat, true, {
                        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                        lineNumber: 61,
                        columnNumber: 13
                    }, this);
                })
            }, void 0, false, {
                fileName: "[project]/src/components/BlockLibraryPanel.tsx",
                lineNumber: 56,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/BlockLibraryPanel.tsx",
        lineNumber: 48,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/ProcessNode.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/ProcessNode.tsx
__turbopack_context__.s([
    "ProcessNode",
    ()=>ProcessNode
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
"use client";
;
;
function ProcessNode({ data }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "relative rounded-xl border border-slate-300 bg-white px-3 py-2 shadow-sm flex items-center gap-2 text-xs min-w-[160px]",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                type: "target",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Top,
                className: "w-2 h-2 !bg-slate-500"
            }, void 0, false, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 11,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Handle"], {
                type: "source",
                position: __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Position"].Bottom,
                className: "w-2 h-2 !bg-slate-500"
            }, void 0, false, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 18,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "h-8 w-8 flex items-center justify-center rounded-md bg-slate-100 overflow-hidden mr-1",
                children: data.icon ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("img", {
                    src: `/icons/${data.icon}.png`,
                    alt: data.label,
                    width: 32,
                    height: 32,
                    style: {
                        objectFit: "contain"
                    }
                }, void 0, false, {
                    fileName: "[project]/src/components/ProcessNode.tsx",
                    lineNumber: 27,
                    columnNumber: 11
                }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "text-[10px] font-semibold",
                    children: data.metal
                }, void 0, false, {
                    fileName: "[project]/src/components/ProcessNode.tsx",
                    lineNumber: 35,
                    columnNumber: 11
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 25,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "font-medium leading-tight",
                        children: data.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/ProcessNode.tsx",
                        lineNumber: 41,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
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
                        lineNumber: 42,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/ProcessNode.tsx",
                lineNumber: 40,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/ProcessNode.tsx",
        lineNumber: 9,
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
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript) <export ReactFlow as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/background/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/controls/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/minimap/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProcessNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ProcessNode.tsx [app-ssr] (ecmascript)");
"use client";
;
;
;
;
// 🔹 اینجا nodeTypes را تعریف می‌کنیم
const nodeTypes = {
    processNode: __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ProcessNode$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ProcessNode"]
};
function FlowsheetCanvas({ nodes, edges, onNodesChange, onEdgesChange, onConnect, onDrop, onDragOver, onNodeClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "w-full h-full",
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__$3c$export__ReactFlow__as__default$3e$__["default"], {
            nodes: nodes,
            edges: edges,
            onNodesChange: onNodesChange,
            onEdgesChange: onEdgesChange,
            onConnect: onConnect,
            onDrop: onDrop,
            onDragOver: onDragOver,
            onNodeClick: (_, node)=>onNodeClick(node),
            nodeTypes: nodeTypes,
            fitView: true,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$background$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Background"], {
                    gap: 16,
                    size: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 60,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$minimap$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["MiniMap"], {
                    pannable: true,
                    zoomable: true,
                    nodeStrokeWidth: 1
                }, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 61,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$controls$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["Controls"], {}, void 0, false, {
                    fileName: "[project]/src/components/FlowsheetCanvas.tsx",
                    lineNumber: 62,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/components/FlowsheetCanvas.tsx",
            lineNumber: 48,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/src/components/FlowsheetCanvas.tsx",
        lineNumber: 47,
        columnNumber: 5
    }, this);
}
}),
"[project]/src/components/PropertiesPanel.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

// src/components/PropertiesPanel.tsx
__turbopack_context__.s([
    "PropertiesPanel",
    ()=>PropertiesPanel
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
"use client";
;
;
function PropertiesPanel({ selectedNode, onUpdateParams }) {
    const [recovery, setRecovery] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    const [split, setSplit] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(1);
    // وقتی Node عوض می‌شود، فرم را با مقادیر جدید پر کن
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEffect"])(()=>{
        if (selectedNode) {
            setRecovery(selectedNode.data.parameters.recovery);
            setSplit(selectedNode.data.parameters.split_ratio);
        }
    }, [
        selectedNode
    ]);
    if (!selectedNode) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
            className: "w-72 p-4 bg-white border-l text-sm text-slate-500",
            children: "Select a unit on the canvas to edit its parameters."
        }, void 0, false, {
            fileName: "[project]/src/components/PropertiesPanel.tsx",
            lineNumber: 32,
            columnNumber: 7
        }, this);
    }
    const handleApply = ()=>{
        onUpdateParams(selectedNode.id, {
            recovery: recovery,
            split_ratio: split
        });
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
        className: "w-72 p-4 bg-white border-l flex flex-col gap-3 text-sm",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-500 mb-1",
                        children: "Selected Unit"
                    }, void 0, false, {
                        fileName: "[project]/src/components/PropertiesPanel.tsx",
                        lineNumber: 48,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "font-semibold",
                        children: selectedNode.data.label
                    }, void 0, false, {
                        fileName: "[project]/src/components/PropertiesPanel.tsx",
                        lineNumber: 49,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "text-xs text-slate-400",
                        children: [
                            "ID: ",
                            selectedNode.data.unitId,
                            " • Metal: ",
                            selectedNode.data.metal
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PropertiesPanel.tsx",
                        lineNumber: 50,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PropertiesPanel.tsx",
                lineNumber: 47,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-col gap-2",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: "Recovery (0–1, fraction)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PropertiesPanel.tsx",
                                lineNumber: 57,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.01",
                                min: 0,
                                max: 1,
                                value: recovery,
                                onChange: (e)=>setRecovery(parseFloat(e.target.value) || 0),
                                className: "border rounded px-2 py-1 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PropertiesPanel.tsx",
                                lineNumber: 60,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PropertiesPanel.tsx",
                        lineNumber: 56,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "flex flex-col gap-1",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "text-xs text-slate-500",
                                children: "Split ratio to concentrate (0–1)"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PropertiesPanel.tsx",
                                lineNumber: 72,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "number",
                                step: "0.01",
                                min: 0,
                                max: 1,
                                value: split,
                                onChange: (e)=>setSplit(parseFloat(e.target.value) || 0),
                                className: "border rounded px-2 py-1 text-sm"
                            }, void 0, false, {
                                fileName: "[project]/src/components/PropertiesPanel.tsx",
                                lineNumber: 75,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/components/PropertiesPanel.tsx",
                        lineNumber: 71,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/components/PropertiesPanel.tsx",
                lineNumber: 55,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                onClick: handleApply,
                className: "mt-2 px-3 py-1.5 rounded-md text-xs font-medium bg-blue-600 text-white hover:bg-blue-700",
                children: "Apply Changes"
            }, void 0, false, {
                fileName: "[project]/src/components/PropertiesPanel.tsx",
                lineNumber: 87,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/components/PropertiesPanel.tsx",
        lineNumber: 46,
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
"[project]/app/flowsheet-tool/page.tsx [app-ssr] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>FlowsheetToolPage
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react-jsx-dev-runtime.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/validateFlowsheetModel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/ResultsPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/buildFlowsheetModel.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockSimulate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/mockSimulate.ts [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/server/route-modules/app-page/vendored/ssr/react.js [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/@reactflow/core/dist/esm/index.mjs [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/BlockLibraryPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/FlowsheetCanvas.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/components/PropertiesPanel.tsx [app-ssr] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$createNode$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/utils/createNode.ts [app-ssr] (ecmascript)");
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
    const [simulationResult, setSimulationResult] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const [isSimulating, setIsSimulating] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(false);
    const [selectedMetal, setSelectedMetal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])("Cu");
    // ✅ state نودها و Edgeها
    const [nodes, setNodes, onNodesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useNodesState"])([]);
    const [edges, setEdges, onEdgesChange] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useEdgesState"])([]);
    // ✅ state نود انتخاب شده
    const [selectedNodeId, setSelectedNodeId] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])(null);
    const selectedNode = nodes.find((n)=>n.id === selectedNodeId) ?? null;
    // ✅ state خوراک (Feed)
    const [feed, setFeed] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useState"])({
        throughput: 100,
        grade: 1.0
    });
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
    const handleUpdateParams = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["useCallback"])((nodeId, params)=>{
        setNodes((nds)=>nds.map((node)=>node.id === nodeId ? {
                    ...node,
                    data: {
                        ...node.data,
                        parameters: {
                            recovery: params.recovery,
                            split_ratio: params.split_ratio
                        }
                    }
                } : node));
    }, [
        setNodes
    ]);
    // ⚠️ این همون تابع Preview هست که مدل Flowsheet را بر اساس state فعلی می‌سازد
    const handleRunSimulation = ()=>{
        const model = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$buildFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["buildFlowsheetModel"])({
            metal: selectedMetal,
            feed,
            nodes,
            edges
        });
        console.log("FlowsheetModel (will be sent to backend):", model);
        // 🔍 اول Validation
        const errors = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$validateFlowsheetModel$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["validateFlowsheetModel"])(model);
        if (errors.length > 0) {
            // اگر خطا هست، شبیه‌سازی را اجرا نکن
            setSimulationResult({
                streams: [],
                overallRecovery: 0,
                messages: errors
            });
            return;
        }
        // ✅ اگر خطا نبود، mockSimulate
        setIsSimulating(true);
        setTimeout(()=>{
            const result = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$utils$2f$mockSimulate$2e$ts__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["mockSimulate"])(model);
            setSimulationResult(result);
            setIsSimulating(false);
        }, 500);
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
        className: "min-h-screen flex flex-col",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                className: "flex items-center justify-between px-6 py-4 border-b bg-white",
                children: [
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
                                lineNumber: 156,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 154,
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
                                lineNumber: 160,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Cu"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Cu" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Cu"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 161,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                onClick: ()=>setSelectedMetal("Zn"),
                                className: `px-3 py-1 rounded-full border text-xs ${selectedMetal === "Zn" ? "bg-blue-600 text-white border-blue-600" : "bg-white text-slate-700 hover:bg-slate-100"}`,
                                children: "Zn"
                            }, void 0, false, {
                                fileName: "[project]/app/flowsheet-tool/page.tsx",
                                lineNumber: 171,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 159,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 153,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "flex flex-1",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$BlockLibraryPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["BlockLibraryPanel"], {
                        selectedMetal: selectedMetal
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 187,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "flex-1 border-r bg-slate-50",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$FlowsheetCanvas$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["FlowsheetCanvas"], {
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
                            lineNumber: 191,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 190,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$PropertiesPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["PropertiesPanel"], {
                        selectedNode: selectedNode,
                        onUpdateParams: handleUpdateParams
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 204,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 185,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                className: "border-t bg-white",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "px-4 py-3 border-b flex items-center justify-between gap-4 text-sm",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "flex items-center gap-4",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500",
                                            children: "Feed throughput (t/h)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 215,
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
                                            lineNumber: 216,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 214,
                                    columnNumber: 13
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                            className: "text-xs text-slate-500",
                                            children: "Feed grade (%)"
                                        }, void 0, false, {
                                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                                            lineNumber: 229,
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
                                            lineNumber: 230,
                                            columnNumber: 15
                                        }, this)
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/app/flowsheet-tool/page.tsx",
                                    lineNumber: 228,
                                    columnNumber: 13
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/app/flowsheet-tool/page.tsx",
                            lineNumber: 213,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 212,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$src$2f$components$2f$ResultsPanel$2e$tsx__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ResultsPanel"], {
                        result: simulationResult,
                        isSimulating: isSimulating,
                        onRunSimulation: handleRunSimulation
                    }, void 0, false, {
                        fileName: "[project]/app/flowsheet-tool/page.tsx",
                        lineNumber: 247,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/app/flowsheet-tool/page.tsx",
                lineNumber: 211,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 151,
        columnNumber: 5
    }, this);
}
function FlowsheetToolPage() {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f40$reactflow$2f$core$2f$dist$2f$esm$2f$index$2e$mjs__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["ReactFlowProvider"], {
        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$server$2f$route$2d$modules$2f$app$2d$page$2f$vendored$2f$ssr$2f$react$2d$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$ssr$5d$__$28$ecmascript$29$__["jsxDEV"])(FlowsheetToolInner, {}, void 0, false, {
            fileName: "[project]/app/flowsheet-tool/page.tsx",
            lineNumber: 261,
            columnNumber: 7
        }, this)
    }, void 0, false, {
        fileName: "[project]/app/flowsheet-tool/page.tsx",
        lineNumber: 260,
        columnNumber: 5
    }, this);
}
}),
];

//# sourceMappingURL=_412c82e3._.js.map