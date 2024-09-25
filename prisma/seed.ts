import { PrismaClient } from '@prisma/client';
import { UserSeed } from './seeds/seedUser';
import { Logger } from '@nestjs/common';

const prisma = new PrismaClient();
const logger = new Logger('Seed');

async function main() {
  await UserSeed();
  logger.log('seeds are applied');
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (error) => {
    logger.error(error);
    await prisma.$disconnect();
    process.exit(1);
  });
