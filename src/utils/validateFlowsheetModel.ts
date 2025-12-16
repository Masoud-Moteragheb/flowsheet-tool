// src/utils/validateFlowsheetModel.ts
import type { FlowsheetModel } from "@/types/flowsheet";

export function validateFlowsheetModel(model: FlowsheetModel): string[] {
  const errors: string[] = [];

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
  model.streams.forEach((s) => {
    if (!s.from_unit) {
      errors.push(`Stream ${s.id} has no source unit.`);
    }
    if (!s.to_unit) {
      errors.push(`Stream ${s.id} has no target unit.`);
    }
  });

  // 5) پیدا کردن Unitهای جداافتاده (هیچ Stream ورودی/خروجی ندارند)
  const connectedUnitIds = new Set<string>();
  model.streams.forEach((s) => {
    if (s.from_unit) connectedUnitIds.add(s.from_unit);
    if (s.to_unit) connectedUnitIds.add(s.to_unit);
  });

  model.units.forEach((u) => {
    if (!connectedUnitIds.has(u.id)) {
      errors.push(
        `Unit ${u.id} is isolated (no incoming or outgoing streams).`
      );
    }
  });

  return errors;
}
