import { createHash, randomBytes, randomInt, timingSafeEqual } from "node:crypto";
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const CODE_TTL_MS = 10 * 60 * 1000;
const RESEND_MS = 60 * 1000;
const MAX_ATTEMPTS = 5;

type Pending = {
  firstName: string;
  lastName: string;
  email: string;
  codeHash: string;
  expires: number;
  attempts: number;
  sentAt: number;
};

type Account = {
  firstName: string;
  lastName: string;
  email: string;
  verifiedAt: string;
};

type Store = {
  secret: string;
  pending: Pending[];
  accounts: Account[];
};

const dir = path.join(process.cwd(), "data");
const file = path.join(dir, "register.json");

function hashCode(secret: string, email: string, code: string) {
  return createHash("sha256").update(`${secret}:${email}:${code}`).digest("hex");
}

function sameHash(left: string, right: string) {
  const a = Buffer.from(left, "hex");
  const b = Buffer.from(right, "hex");
  return a.length === b.length && timingSafeEqual(a, b);
}

async function readStore(): Promise<Store> {
  try {
    const raw = await readFile(file, "utf8");
    return JSON.parse(raw) as Store;
  } catch {
    return { secret: randomBytes(32).toString("hex"), pending: [], accounts: [] };
  }
}

async function writeStore(store: Store) {
  await mkdir(dir, { recursive: true });
  await writeFile(file, JSON.stringify(store), "utf8");
}

export function normalizeEmail(value: string) {
  return value.trim().toLowerCase();
}

export function validEmail(value: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value) && value.length <= 120;
}

export function validName(value: string) {
  const name = value.trim();
  return name.length >= 1 && name.length <= 40 && !/[\r\n]/.test(name);
}

export async function issueCode(input: {
  firstName: string;
  lastName: string;
  email: string;
}) {
  const store = await readStore();
  const now = Date.now();
  const current = store.pending.find((item) => item.email === input.email);
  if (current && now - current.sentAt < RESEND_MS) {
    return { ok: false as const, error: "wait" as const };
  }

  const code = randomInt(0, 1_000_000).toString().padStart(6, "0");
  const next: Pending = {
    firstName: input.firstName,
    lastName: input.lastName,
    email: input.email,
    codeHash: hashCode(store.secret, input.email, code),
    expires: now + CODE_TTL_MS,
    attempts: 0,
    sentAt: now,
  };
  store.pending = store.pending.filter((item) => item.email !== input.email);
  store.pending.push(next);
  await writeStore(store);
  return { ok: true as const, code };
}

export async function dropPending(email: string) {
  const store = await readStore();
  store.pending = store.pending.filter((item) => item.email !== email);
  await writeStore(store);
}

export async function checkCode(email: string, code: string) {
  const store = await readStore();
  const pending = store.pending.find((item) => item.email === email);
  if (!pending || pending.expires < Date.now()) {
    return { ok: false as const, error: "code" as const };
  }

  pending.attempts += 1;
  const matches = sameHash(pending.codeHash, hashCode(store.secret, email, code));
  if (!matches) {
    if (pending.attempts >= MAX_ATTEMPTS) {
      store.pending = store.pending.filter((item) => item.email !== email);
    }
    await writeStore(store);
    return { ok: false as const, error: "code" as const };
  }

  store.pending = store.pending.filter((item) => item.email !== email);
  const account: Account = {
    firstName: pending.firstName,
    lastName: pending.lastName,
    email,
    verifiedAt: new Date().toISOString(),
  };
  store.accounts = store.accounts.filter((item) => item.email !== email);
  store.accounts.push(account);
  await writeStore(store);
  return { ok: true as const };
}
