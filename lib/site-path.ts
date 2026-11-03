const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export function sitePath(path: string) {
  if (!path.startsWith("/")) return path;

  const hashAt = path.indexOf("#");
  const hash = hashAt >= 0 ? path.slice(hashAt) : "";
  const pathname = hashAt >= 0 ? path.slice(0, hashAt) : path;
  const withSlash = pathname.endsWith("/") ? pathname : `${pathname}/`;

  return `${basePath}${withSlash}${hash}`;
}
