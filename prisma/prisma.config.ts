import { defineConfig } from "prisma";
import { readFileSync } from "fs";
import { resolve } from "path";

// Load .env.local for DATABASE_URL (Prisma CLI doesn't auto-load .env.local)
function loadEnv() {
  try {
    const envPath = resolve(__dirname, "..", ".env.local");
    const content = readFileSync(envPath, "utf-8");
    for (const line of content.split("\n")) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith("#")) continue;
      const eqIdx = trimmed.indexOf("=");
      if (eqIdx === -1) continue;
      const key = trimmed.slice(0, eqIdx).trim();
      const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
      if (!process.env[key]) process.env[key] = val;
    }
  } catch {
    // .env.local not found — fall back to existing env vars
  }
}

loadEnv();

export default defineConfig({
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
  },
});
