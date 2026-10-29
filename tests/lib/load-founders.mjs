// Copies src/lib/founders to a temp dir with explicit .ts import extensions so Node can run it
// directly with built-in type stripping. Returns a function to import a module by relative path.
import fs from "node:fs";
import os from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../..");

export function loadFounders() {
  const src = path.join(root, "src/lib/founders");
  const dest = fs.mkdtempSync(path.join(os.tmpdir(), "founders-"));
  const copy = (from, to) => {
    for (const entry of fs.readdirSync(from, { withFileTypes: true })) {
      const a = path.join(from, entry.name);
      const b = path.join(to, entry.name);
      if (entry.isDirectory()) {
        fs.mkdirSync(b);
        copy(a, b);
      } else if (entry.name.endsWith(".ts")) {
        const text = fs
          .readFileSync(a, "utf8")
          .replace(/from "(\.{1,2}\/[^"]+?)"/g, (_, p) => `from "${p.endsWith(".ts") ? p : `${p}.ts`}"`)
          .replace(/import "server-only";\n/g, "");
        fs.writeFileSync(b, text);
      }
    }
  };
  copy(src, dest);
  return (rel) => import(pathToFileURL(path.join(dest, rel)).href);
}
