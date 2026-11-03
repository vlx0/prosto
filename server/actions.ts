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
  const firstName = String(formData.get("firstName") ?? "").trim();
  const lastName = String(formData.get("lastName") ?? "").trim();
  const email = String(formData.get("email") ?? "").trim();

  if (!firstName || !lastName || !email) {
    return { status: "error", message: content.apply.fieldsError };
  }

  console.log("[apply]", { firstName, lastName, email });

  return { status: "success" };
}
