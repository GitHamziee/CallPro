const { defineConfig } = require("prisma");

module.exports = defineConfig({
  datasources: {
    db: {
      provider: "postgresql",
      url: process.env.DATABASE_URL || "",
    },
  },
});
