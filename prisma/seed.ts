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
  const adminEmail = "admin@callpro.com";
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
    console.log("Admin user created: admin@callpro.com / Admin123!");
  } else {
    console.log("Admin user already exists");
  }

  // Seed packages
  const packages = [
    {
      name: "Starter",
      description: "Perfect for small teams getting started with professional call center services.",
      price: 149900, // $1,499.00
      features: [
        "Up to 5 agents",
        "Basic call routing",
        "Email support",
        "Standard analytics",
        "Business hours coverage",
      ],
      sortOrder: 1,
    },
    {
      name: "Growth",
      description: "Ideal for growing businesses that need advanced features and scalability.",
      price: 349900, // $3,499.00
      features: [
        "Up to 25 agents",
        "Advanced call routing & IVR",
        "Priority support",
        "Real-time analytics",
        "24/7 coverage",
        "CRM integration",
        "Call recording",
      ],
      sortOrder: 2,
    },
    {
      name: "Enterprise",
      description: "Custom solutions for large organizations with complex requirements.",
      price: 0, // Contact for pricing
      features: [
        "Unlimited agents",
        "Custom IVR flows",
        "Dedicated account manager",
        "Custom analytics & reporting",
        "24/7 premium coverage",
        "Full API access",
        "SLA guarantee",
        "White-label option",
      ],
      sortOrder: 3,
    },
  ];

  for (const pkg of packages) {
    const existing = await prisma.package.findUnique({
      where: { name: pkg.name },
    });

    if (!existing) {
      await prisma.package.create({ data: pkg });
      console.log(`Package created: ${pkg.name}`);
    } else {
      console.log(`Package already exists: ${pkg.name}`);
    }
  }

  console.log("Seeding complete!");

  await prisma.$disconnect();
  await pool.end();
}

main().catch((e) => {
  console.error("Seed error:", e);
  process.exit(1);
});
