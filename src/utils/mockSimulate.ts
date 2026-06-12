// src/utils/mockSimulate.ts
import type { FlowsheetModel } from "@/types/flowsheet";
import type { SimulationResult, StreamResult } from "@/types/simulation";

/**
 * Mock simulation for frontend testing.
 * این تابع فقط یک شبیه‌سازی خیلی ساده و آموزشی انجام می‌دهد.
 */
export function mockSimulate(model: FlowsheetModel): SimulationResult {
  const nStreams = model.streams.length || 1;

  // جرم کل را بین تمام streamها تقسیم می‌کنیم (فقط برای نمایش)
  const baseFlow = model.feed.throughput / nStreams;

  const streams: StreamResult[] = model.streams.map((s, index) => {
    const factor = 0.8 + (index / nStreams) * 0.4; // فقط برای تنوع درصدها
    const flowrate = baseFlow * factor;
    const grade = model.feed.grade * (1 + index * 0.1); // کمی grade را تغییر می‌دهیم

    return {
      id: s.id,
      from_unit: s.from_unit,
      to_unit: s.to_unit,
      flowrate,
      grade,
    };
  });

  // overall recovery را فعلاً ثابت می‌گذاریم (در نسخه واقعی از Backend می‌آد)
  const overallRecovery = 0.8;

  const messages: string[] = [];
  if (model.streams.length === 0) {
    messages.push("No streams defined – please connect units on the canvas.");
  }

  return {
    streams,
    overall_recovery: overallRecovery,
    messages,
  };
}
