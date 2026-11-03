"use client";

import { useActionState } from "react";
import { submitApplication, type ApplyState } from "@/server/actions";
import { Button } from "@/components/Button";
import { content } from "@/content";

const initialState: ApplyState = { status: "idle" };

const fieldClass =
  "w-full rounded-[20px] border border-sage/35 bg-field px-4 py-3.5 text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ApplyForm() {
  const [state, action, pending] = useActionState(
    submitApplication,
    initialState,
  );

  if (state.status === "success") {
    return (
      <p className="max-w-[40ch] font-serif text-2xl leading-snug text-ink md:text-3xl">
        {content.apply.success}
      </p>
    );
  }

  return (
    <form action={action} className="flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm text-muted">
        {content.apply.nameLabel}
        <input
          name="name"
          type="text"
          autoComplete="name"
          required
          maxLength={80}
          placeholder={content.apply.namePlaceholder}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
        {content.apply.telegramLabel}
        <input
          name="telegram"
          type="text"
          autoComplete="username"
          required
          maxLength={80}
          placeholder={content.apply.telegramPlaceholder}
          className={fieldClass}
        />
      </label>
      {state.status === "error" ? (
        <p className="text-sm text-accent" role="alert">
          {state.message}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? content.apply.submitting : content.apply.submit}
      </Button>
    </form>
  );
}
