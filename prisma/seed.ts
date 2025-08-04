import "dotenv/config";
import { PrismaClient } from "../src/generated/prisma/client.js";
const prisma = new PrismaClient();

const seed = async () => {
  await prisma.category.createMany({
    data: ["Leadership", "Managing", "Complexity"].map((name) => ({ name })),
  });
  await prisma.language.createMany({
    data: ["en", "it", "es"].map((name) => ({ name })),
  });
  await prisma.provider.createMany({
    data: ["Owner of the content: Skilla", "Linkedin", "Pack", "Mentor"].map(
      (name) => ({ name })
    ),
  });
  await prisma.role.createMany({
    data: ["Multi-select", "Mentor/Coach", "Mentee/Coachee"].map((name) => ({
      name,
    })),
  });
};

seed()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
