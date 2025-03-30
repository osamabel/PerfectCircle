import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('your-secure-password', 10);
  
  const user = await prisma.user.upsert({
    where: { email: 'admin@example.com' },
    update: {},
    create: {
      email: 'admin@example.com',
      name: 'Admin',
      password: hashedPassword,
    },
  });
  
  console.log({ user });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

  // {
  //   user: {
  //     id: 'cm8v2li160000swngn7nn9kbn',
  //     email: 'admin@example.com',
  //     password: '$2b$10$ML3zvJsBE4I7FNuxqCvtReQIy1EgUmUXQTzJ5Z8Hx.slBYbVY3e8e',
  //     name: 'Admin',
  //     role: 'admin',
  //     createdAt: 2025-03-30T03:18:02.635Z,
  //     updatedAt: 2025-03-30T03:18:02.635Z
  //   }
  // }