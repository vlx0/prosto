"use client";

import { useState, type FormEvent } from "react";
import { Button } from "@/components/Button";
import { content } from "@/content";
import { sitePath } from "@/lib/site-path";

const fieldClass =
  "w-full rounded-[20px] border border-sage/35 bg-field px-4 py-3.5 text-base text-ink placeholder:text-muted/70 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

type Step = "login" | "details" | "code" | "done";
type ErrorKey = "fields" | "mail" | "code" | "wait" | "unknown";

const errorText: Record<ErrorKey, string> = {
  fields: content.apply.fieldsError,
  mail: content.apply.mailError,
  code: content.apply.codeError,
  wait: content.apply.waitError,
  unknown: content.apply.unknownError,
};

const linkClass =
  "text-ink underline decoration-sage/50 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent";

export function ApplyForm({
  variant,
  onRegistering,
}: {
  variant: "login" | "apply";
  onRegistering?: (registering: boolean) => void;
}) {
  const [step, setStep] = useState<Step>(variant === "login" ? "login" : "details");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [email, setEmail] = useState("");
  const [codeFrom, setCodeFrom] = useState<"login" | "details">(
    variant === "login" ? "login" : "details",
  );

  async function request(payload: Record<string, string>) {
    const response = await fetch(sitePath("/api/register"), {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify(payload),
    });
    return (await response.json()) as { ok?: boolean; error?: string };
  }

  async function onDetails(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const firstName = String(data.get("firstName") ?? "").trim();
    const lastName = String(data.get("lastName") ?? "").trim();
    const nextEmail = String(data.get("email") ?? "").trim();
    if (!firstName || !lastName || !nextEmail) {
      setError(content.apply.fieldsError);
      return;
    }

    setPending(true);
    setError(null);
    try {
      const result = await request({
        step: "send",
        firstName,
        lastName,
        email: nextEmail,
      });
      if (!result.ok) {
        const key = result.error;
        setError(key && key in errorText ? errorText[key as ErrorKey] : content.apply.mailError);
        return;
      }
      setEmail(nextEmail);
      setCodeFrom("details");
      setStep("code");
    } catch {
      setError(content.apply.mailError);
    } finally {
      setPending(false);
    }
  }

  async function onCode(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const code = String(data.get("code") ?? "").trim();
    setPending(true);
    setError(null);
    try {
      const result = await request({ step: "verify", email, code });
      if (!result.ok) {
        setError(content.apply.codeError);
        return;
      }
      setStep("done");
    } catch {
      setError(content.apply.mailError);
    } finally {
      setPending(false);
    }
  }

  if (step === "done") {
    return (
      <p className="max-w-[36ch] font-serif text-2xl leading-snug text-ink">
        {content.apply.verified}
      </p>
    );
  }

  if (step === "code") {
    return (
      <form key="code" onSubmit={onCode} className="flex w-full max-w-md flex-col gap-4">
        <p className="max-w-[36ch] text-base leading-[1.7] text-muted">{content.apply.sent}</p>
        <label className="flex flex-col gap-2 text-sm text-muted">
          {content.apply.codeLabel}
          <input
            name="code"
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            required
            minLength={6}
            maxLength={6}
            pattern="[0-9]{6}"
            placeholder={content.apply.codePlaceholder}
            className={fieldClass}
          />
        </label>
        {error ? (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {pending ? content.apply.confirming : content.apply.confirm}
        </Button>
        <button
          type="button"
          onClick={() => {
            setStep(codeFrom);
            setError(null);
            onRegistering?.(codeFrom === "details" && variant === "login");
          }}
          className="self-start text-sm text-muted underline decoration-sage/50 underline-offset-4 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
        >
          {content.apply.changeEmail}
        </button>
      </form>
    );
  }

  if (step === "login") {
    return (
      <form
        key="login"
        onSubmit={async (event) => {
          event.preventDefault();
          const data = new FormData(event.currentTarget);
          const nextEmail = String(data.get("email") ?? "").trim();
          if (!nextEmail) {
            setError(content.apply.loginFieldsError);
            return;
          }
          setPending(true);
          setError(null);
          try {
            const result = await request({ step: "login", email: nextEmail });
            if (!result.ok) {
              const key = result.error;
              setError(
                key && key in errorText ? errorText[key as ErrorKey] : content.apply.mailError,
              );
              return;
            }
            setEmail(nextEmail);
            setCodeFrom("login");
            setStep("code");
          } catch {
            setError(content.apply.mailError);
          } finally {
            setPending(false);
          }
        }}
        className="flex w-full max-w-md flex-col gap-4"
      >
        <label className="flex flex-col gap-2 text-sm text-muted">
          {content.apply.emailLabel}
          <input
            name="email"
            type="email"
            autoComplete="email"
            required
            maxLength={120}
            placeholder={content.apply.emailPlaceholder}
            className={fieldClass}
          />
        </label>
        {error ? (
          <p className="text-sm text-accent" role="alert">
            {error}
          </p>
        ) : null}
        <Button type="submit" disabled={pending}>
          {pending ? content.apply.sending : content.apply.sendCode}
        </Button>
        <p className="text-sm leading-[1.7] text-muted">
          {content.apply.noAccount}{" "}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep("details");
              onRegistering?.(true);
            }}
            className={linkClass}
          >
            {content.apply.registerLink}
          </button>
        </p>
      </form>
    );
  }

  return (
    <form key="details" onSubmit={onDetails} className="flex w-full max-w-md flex-col gap-4">
      <label className="flex flex-col gap-2 text-sm text-muted">
        {content.apply.firstNameLabel}
        <input
          name="firstName"
          type="text"
          autoComplete="given-name"
          required
          maxLength={40}
          placeholder={content.apply.firstNamePlaceholder}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
        {content.apply.lastNameLabel}
        <input
          name="lastName"
          type="text"
          autoComplete="family-name"
          required
          maxLength={40}
          placeholder={content.apply.lastNamePlaceholder}
          className={fieldClass}
        />
      </label>
      <label className="flex flex-col gap-2 text-sm text-muted">
        {content.apply.emailLabel}
        <input
          name="email"
          type="email"
          autoComplete="email"
          required
          maxLength={120}
          placeholder={content.apply.emailPlaceholder}
          className={fieldClass}
        />
      </label>
      {error ? (
        <p className="text-sm text-accent" role="alert">
          {error}
        </p>
      ) : null}
      <Button type="submit" disabled={pending}>
        {pending ? content.apply.sending : content.apply.sendCode}
      </Button>
      {variant === "login" ? (
        <p className="text-sm leading-[1.7] text-muted">
          {content.apply.hasAccount}{" "}
          <button
            type="button"
            onClick={() => {
              setError(null);
              setStep("login");
              onRegistering?.(false);
            }}
            className={linkClass}
          >
            {content.apply.loginLink}
          </button>
        </p>
      ) : null}
    </form>
  );
}
