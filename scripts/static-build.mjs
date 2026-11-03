import { spawnSync } from "node:child_process";
import { existsSync, renameSync, rmSync } from "node:fs";

const from = "app/api";
const hold = ".api-hold";

if (!existsSync(from) && existsSync(hold)) {
  renameSync(hold, from);
}

if (!existsSync(from)) {
  console.error("app/api is missing");
  process.exit(1);
}

renameSync(from, hold);
let status = 1;
try {
  rmSync(".next", { recursive: true, force: true });
  const result = spawnSync("npx next build", {
    stdio: "inherit",
    shell: true,
    env: { ...process.env, STATIC_EXPORT: "1" },
  });
  status = result.status ?? 1;
} finally {
  if (existsSync(hold) && !existsSync(from)) {
    renameSync(hold, from);
  }
}

process.exit(status);
