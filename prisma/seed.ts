import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import { resolve } from "path";

// Load .env.local
dotenv.config({ path: resolve(__dirname, "..", ".env.local") });

async function main() {
  const pool = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: { rejectUnauthorized: false },
  });
  const adapter = new PrismaPg(pool);
  const prisma = new PrismaClient({ adapter });

  console.log("Seeding database...");

  // Create admin user
  const adminEmail = "admin@r4referral.com";
  const existingAdmin = await prisma.user.findUnique({
    where: { email: adminEmail },
  });

  if (!existingAdmin) {
    const hashedPassword = await bcrypt.hash("Admin123!", 12);
    await prisma.user.create({
      data: {
        name: "Admin",
        email: adminEmail,
        password: hashedPassword,
        role: "ADMIN",
      },
    });
    console.log("Admin user created: admin@r4referral.com / Admin123!");
  } else {
    console.log("Admin user already exists");
  }

  // Seed packages
  const packages = [
    {
      name: "Pay Per Lead",
      description:
        "Only pay for the leads you receive. $375 one-time setup, then $100 per lead. Lifetime access.",
      price: 37500, // $375.00 setup fee
      durationDays: null, // lifetime — no expiry
      features: [
        "$375 one-time setup fee",
        "$100 per qualified lead",
        "Lifetime access — no expiry",
        "Pay as you go",
        "Lead details shown after payment",
        "Cancel anytime",
      ],
      sortOrder: 1,
    },
    {
      name: "Bi-Annual",
      description:
        "High volume leads with performance-based pricing. 12–15 leads over 6 months.",
      price: 69900, // $699.00
      durationDays: 180, // 6 months
      features: [
        "$699 for 6-month term",
        "12–15 qualified leads included",
        "15% commission per closing",
        "Lead info available immediately",
        "Re-activate after 6 months",
        "Priority support",
      ],
      sortOrder: 2,
    },
    {
      name: "Mega Bundle",
      description:
        "Maximum value with 10 guaranteed leads at 40% off. Best price per lead.",
      price: 82500, // $825.00
      durationDays: null, // no time expiry — expires after 10 leads
      features: [
        "$825 one-time payment",
        "10 guaranteed leads",
        "40% off standard pricing",
        "Lead info available immediately",
        "Plan expires after 10 leads",
        "Best value per lead",
      ],
      sortOrder: 3,
    },
  ];

  // Deactivate old packages that are no longer in the seed list
  const packageNames = packages.map((p) => p.name);
  await prisma.package.updateMany({
    where: { name: { notIn: packageNames } },
    data: { isActive: false },
  });

  for (const pkg of packages) {
    await prisma.package.upsert({
      where: { name: pkg.name },
      update: { ...pkg },
      create: { ...pkg },
    });
    console.log(`Package upserted: ${pkg.name}`);
  }

  console.log("Seeding complete!");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
