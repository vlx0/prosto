"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { content } from "@/content";

const fieldClass =
  "w-full rounded-[20px] border border-sage/35 bg-field px-4 py-3.5 text-base text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function ApplyForm() {
  const [error, setError] = useState(false);

  function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const name = String(data.get("name") ?? "").trim();
    const telegram = String(data.get("telegram") ?? "").trim();

    if (!name || !telegram) {
      setError(true);
      return;
    }

    const text = content.apply.draft
      .replace("{name}", name)
      .replace("{telegram}", telegram);
    window.location.href = `${content.footer.contactHref}?text=${encodeURIComponent(text)}`;
  }

  return (
    <form onSubmit={onSubmit} className="flex w-full max-w-md flex-col gap-4">
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
      {error ? (
        <p className="text-sm text-accent" role="alert">
          {content.apply.error}
        </p>
      ) : null}
      <Button type="submit">{content.apply.submit}</Button>
    </form>
  );
}
