import { defineConfig } from "prisma";

// Prisma 7+ requires connection strings in the config file rather than schema.
// We read DATABASE_URL directly from process.env for simplicity.

export default defineConfig({
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
  },
});
