import {
  checkCode,
  dropPending,
  issueCode,
  normalizeEmail,
  validEmail,
  validName,
} from "@/lib/register";
import { sendCodeMail } from "@/lib/send-code";

type Body = {
  step?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
  code?: string;
};

export async function POST(request: Request) {
  let body: Body;
  try {
    body = (await request.json()) as Body;
  } catch {
    return Response.json({ ok: false, error: "fields" }, { status: 400 });
  }

  const email = normalizeEmail(String(body.email ?? ""));
  if (!validEmail(email)) {
    return Response.json({ ok: false, error: "fields" }, { status: 400 });
  }

  if (body.step === "send") {
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();
    if (!validName(firstName) || !validName(lastName)) {
      return Response.json({ ok: false, error: "fields" }, { status: 400 });
    }

    const issued = await issueCode({ firstName, lastName, email });
    if (!issued.ok) {
      return Response.json({ ok: false, error: issued.error }, { status: 429 });
    }

    try {
      const mailed = await sendCodeMail(email, issued.code);
      if (!mailed) {
        await dropPending(email);
        return Response.json({ ok: false, error: "mail" }, { status: 503 });
      }
    } catch {
      await dropPending(email);
      return Response.json({ ok: false, error: "mail" }, { status: 503 });
    }

    return Response.json({ ok: true });
  }

  if (body.step === "verify") {
    const code = String(body.code ?? "").trim();
    if (!/^\d{6}$/.test(code)) {
      return Response.json({ ok: false, error: "code" }, { status: 400 });
    }
    const checked = await checkCode(email, code);
    if (!checked.ok) {
      return Response.json({ ok: false, error: checked.error }, { status: 400 });
    }
    return Response.json({ ok: true });
  }

  return Response.json({ ok: false, error: "fields" }, { status: 400 });
}
