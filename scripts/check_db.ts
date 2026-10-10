import { prisma } from "@/lib/prisma";

async function main() {
  console.log("User count:", await prisma.user.count());
  console.log("Account count:", await prisma.account.count());
  console.log("Session count:", await prisma.session.count());
  const sessions = await prisma.session.findMany({ take: 5 });
  console.log("Sessions:", JSON.stringify(sessions, null, 2));
  const accounts = await prisma.account.findMany({ take: 5 });
  console.log("Accounts:", JSON.stringify(accounts, null, 2));
  await prisma.$disconnect();
}

main().catch((e) => { console.error(e); process.exit(1); });