"use server";

import { content } from "@/content";

export type ApplyState =
  | { status: "idle" }
  | { status: "success" }
  | { status: "error"; message: string };

export async function submitApplication(
  _prev: ApplyState,
  formData: FormData,
): Promise<ApplyState> {
  const name = String(formData.get("name") ?? "").trim();
  const telegram = String(formData.get("telegram") ?? "").trim();

  if (!name || !telegram) {
    return { status: "error", message: content.apply.error };
  }

  // TODO: replace with real handler
  console.log("[apply]", { name, telegram });

  return { status: "success" };
}
