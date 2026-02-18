import { PrismaClient } from "@prisma/client";
import questions from "./seed/questions.seed.json";

const prisma = new PrismaClient();

async function main() {
  for (const node of questions) {
    await prisma.questionNode.upsert({
      where: { id: node.id },
      create: node,
      update: {
        level: node.level,
        label: node.label,
        prompt: node.prompt,
        parentId: node.parentId,
      },
    });
  }

  console.log(`Seeded ${questions.length} question nodes`);
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
