const { PrismaClient } = require("@prisma/client");

async function main() {
  const prisma = new PrismaClient();
  try {
    const tables = await prisma.$queryRawUnsafe(
      "SELECT name FROM sqlite_master WHERE type='table' ORDER BY name"
    );
    console.log("tables:", tables);

    const usersCount = await prisma.user.count();
    console.log("user.count:", usersCount);

    const results = await prisma.testResult.findMany({
      orderBy: { createdAt: "desc" },
      take: 10,
      select: {
        id: true,
        createdAt: true,
        mode: true,
        typeKey: true,
        typeName: true,
        userId: true,
        clientId: true,
      },
    });
    console.log("latest TestResult rows:");
    for (const r of results) {
      console.log(r);
    }
  } finally {
    await prisma.$disconnect();
  }
}

main().catch((e) => {
  console.error("ERROR:", e);
  process.exit(1);
});

