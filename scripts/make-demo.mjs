// Turns the built site (dist/) into an offline demo that opens by double-clicking
// index.html: root-absolute links ("/work/x/") become relative ("../work/x/index.html").
// Usage: npm run demo  -> creates demo-offline/
import { cp, readdir, readFile, rm, writeFile } from "node:fs/promises";
import { join, relative, sep } from "node:path";

const src = "dist";
const out = "demo-offline";

await rm(out, { recursive: true, force: true });
await cp(src, out, { recursive: true });

async function* htmlFiles(dir) {
  for (const entry of await readdir(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) yield* htmlFiles(p);
    else if (entry.name.endsWith(".html")) yield p;
  }
}

for await (const file of htmlFiles(out)) {
  const depth = relative(out, file).split(sep).length - 1;
  const prefix = depth ? "../".repeat(depth) : "./";
  const html = (await readFile(file, "utf8")).replace(
    /(href|src)="\/(?!\/)([^"#?]*)([^"]*)"/g,
    (_, attr, path, rest) => {
      const target = path === "" || path.endsWith("/") ? `${path}index.html` : path;
      return `${attr}="${prefix}${target}${rest}"`;
    },
  );
  await writeFile(file, html);
}

console.log(`Offline demo ready: ${out}/index.html`);
