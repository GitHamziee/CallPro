import { readdirSync, statSync, readFileSync, writeFileSync } from "fs";
import { join, extname } from "path";

const ROOT = "C:/Users/HamzaRafique/callcenter-site";
const EXCLUDE = ["node_modules", ".next", ".git", "rename-colors.mjs", "replace-colors.ps1"];

// Order matters: longer shade numbers first to avoid partial matches
const REPLACEMENTS = [
  ["blue-950", "brand-950"],
  ["blue-900", "brand-900"],
  ["blue-800", "brand-800"],
  ["blue-700", "brand-700"],
  ["blue-600", "brand-600"],
  ["blue-500", "brand-500"],
  ["blue-400", "brand-400"],
  ["blue-300", "brand-300"],
  ["blue-200", "brand-200"],
  ["blue-100", "brand-100"],
  // blue-50 but NOT blue-500 etc — use word-boundary via regex
  // handled separately below
  ["cyan-500", "accent-500"],
  ["cyan-400", "accent-400"],
  ["cyan-300", "accent-300"],
  ["cyan-200", "accent-200"],
];

function walk(dir) {
  const entries = readdirSync(dir);
  const files = [];
  for (const entry of entries) {
    if (EXCLUDE.includes(entry)) continue;
    const full = join(dir, entry);
    const stat = statSync(full);
    if (stat.isDirectory()) files.push(...walk(full));
    else if ([".tsx", ".ts", ".css"].includes(extname(full))) files.push(full);
  }
  return files;
}

let changed = 0;
for (const file of walk(ROOT)) {
  let content = readFileSync(file, "utf8");
  const original = content;

  for (const [from, to] of REPLACEMENTS) {
    content = content.replaceAll(from, to);
  }
  // blue-50 but not blue-500..blue-950 (ends right after the digits)
  content = content.replace(/blue-50(?!\d)/g, "brand-50");

  if (content !== original) {
    writeFileSync(file, content, "utf8");
    console.log("Updated:", file.replace(ROOT, ""));
    changed++;
  }
}
console.log(`\nDone — ${changed} files updated.`);
