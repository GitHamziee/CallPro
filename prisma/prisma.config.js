const { defineConfig } = require("prisma");
const { readFileSync } = require("fs");
const { resolve } = require("path");

// Load .env.local since Prisma CLI doesn't auto-load it
try {
  const envPath = resolve(__dirname, "..", ".env.local");
  const envContent = readFileSync(envPath, "utf-8");
  for (const line of envContent.split("\n")) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eqIdx = trimmed.indexOf("=");
    if (eqIdx === -1) continue;
    const key = trimmed.slice(0, eqIdx).trim();
    const val = trimmed.slice(eqIdx + 1).trim().replace(/^["']|["']$/g, "");
    if (!process.env[key]) process.env[key] = val;
  }
} catch {}

module.exports = defineConfig({
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
  },
});
