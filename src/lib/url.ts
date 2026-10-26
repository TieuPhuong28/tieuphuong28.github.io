// Prefix a site path with the deploy base (e.g. "/repo-name/" on GitHub Pages).
// Full URLs (https://...) are returned unchanged.
export function url(path = "/"): string {
  if (/^(https?:|mailto:|#)/.test(path)) return path;
  const base = import.meta.env.BASE_URL.replace(/\/$/, "");
  return `${base}/${path.replace(/^\//, "")}`;
}
