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
      name: "Standard",
      description:
        "Start with zero risk. $375 one-time setup for lifetime access, then $100 per accepted lead. Cancel anytime.",
      price: 37500, // $375.00 setup fee
      type: "PAY_PER_LEAD" as const,
      durationDays: null, // lifetime — no expiry
      features: [
        "$375 one-time setup (lifetime access)",
        "$100 per accepted lead",
        "Minimum 2 leads",
        "Human verified leads",
        "Live transfers",
        "Scheduled appointments",
        "Upto 3 Counties/Cities",
        "Premium portal access",
        "Free follow-up",
        "24/7 customer support",
        "Cancel anytime",
      ],
      sortOrder: 1,
    },
    {
      name: "Gold",
      description:
        "High volume leads with low upfront cost and a 15% referral fee on closings.",
      price: 69900, // $699.00
      durationDays: 120, // 4 months
      features: [
        "$699 for 4-month term",
        "12-15 leads included",
        "15% referral fee per closing",
        "Human verified leads",
        "Scheduled appointments",
        "Upto 3 Counties/Cities",
        "Exclusive leads",
        "Premium portal access",
        "Free follow-up",
        "Reimbursement offer",
        "24/7 customer support",
      ],
      sortOrder: 2,
    },
    {
      name: "Platinum",
      description:
        "Best value — 3-4 listings or buyer contracts with a dedicated Account Manager.",
      price: 99900, // $999.00
      durationDays: null, // no time expiry — expires after contract goals are met
      features: [
        "3-4 Listings or Buyer contracts",
        "Account Manager",
        "Human verified leads",
        "Live transfers",
        "Scheduled appointments",
        "Upto 3 Counties/Cities",
        "Premium portal access",
        "Free follow-up",
        "24/7 customer support",
      ],
      sortOrder: 3,
    },
  ];

  // Deactivate old packages that are no longer in the seed list (skip custom packages)
  const packageNames = packages.map((p) => p.name);
  await prisma.package.updateMany({
    where: { name: { notIn: packageNames }, isCustom: false },
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
